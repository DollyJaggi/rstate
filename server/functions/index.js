const functions = require('firebase-functions')
const admin = require('firebase-admin')
const Razorpay = require('razorpay')
const cors = require('cors')({ origin: true })

admin.initializeApp()
const db = admin.firestore()
const rtdb = admin.database()

const razorpay = new Razorpay({
  key_id: functions.config().razorpay.key_id,
  key_secret: functions.config().razorpay.key_secret,
})

// ============ USER MANAGEMENT ============

exports.createUserProfile = functions.auth.user().onCreate(async (user) => {
  const userData = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    phone: user.phoneNumber || '',
    photoURL: user.photoURL || '',
    role: 'buyer',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    lastLogin: admin.firestore.FieldValue.serverTimestamp(),
    isVerified: false,
    isActive: true,
    subscription: 'basic',
    savedProperties: [],
    preferences: {},
  }
  await db.collection('users').doc(user.uid).set(userData)
})

exports.deleteUserData = functions.auth.user().onDelete(async (user) => {
  await db.collection('users').doc(user.uid).delete()
  const properties = await db.collection('properties').where('ownerId', '==', user.uid).get()
  const batch = db.batch()
  properties.forEach(doc => batch.delete(doc.ref))
  await batch.commit()
})

// List every Firebase Auth user and backfill any missing Firestore profiles.
exports.listAllUsers = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Login required')
  }

  const adminDoc = await db.collection('users').doc(context.auth.uid).get()
  if (adminDoc.data()?.role !== 'super_admin') {
    throw new functions.https.HttpsError('permission-denied', 'Admin access required')
  }

  const authUsers = []
  let pageToken
  do {
    const result = await admin.auth().listUsers(1000, pageToken)
    result.users.forEach(u => authUsers.push(u))
    pageToken = result.pageToken
  } while (pageToken)

  const adminEmails = ['admin@rstate.in', 'punjabfoodsrte@gmail.com']
  const batch = db.batch()

  const users = await Promise.all(authUsers.map(async (u) => {
    const ref = db.collection('users').doc(u.uid)
    const snap = await ref.get()

    if (!snap.exists) {
      batch.set(ref, {
        uid: u.uid,
        email: u.email || '',
        displayName: u.displayName || '',
        phone: u.phoneNumber || '',
        photoURL: u.photoURL || '',
        role: adminEmails.includes(u.email) ? 'super_admin' : 'buyer',
        createdAt: u.metadata.creationTime
          ? admin.firestore.Timestamp.fromDate(new Date(u.metadata.creationTime))
          : admin.firestore.FieldValue.serverTimestamp(),
        lastLogin: admin.firestore.FieldValue.serverTimestamp(),
        isVerified: u.emailVerified,
        isActive: !u.disabled,
        subscription: 'basic',
        preferences: {},
        savedProperties: [],
      })
    }

    return {
      uid: u.uid,
      email: u.email || '',
      displayName: u.displayName || '',
      phone: u.phoneNumber || '',
      photoURL: u.photoURL || '',
      emailVerified: u.emailVerified,
      disabled: u.disabled,
      creationTime: u.metadata.creationTime,
      lastSignInTime: u.metadata.lastSignInTime,
    }
  }))

  await batch.commit()
  return { count: users.length, users }
})

// ============ PROPERTY VERIFICATION ============

exports.verifyProperty = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required')

  const adminDoc = await db.collection('users').doc(context.auth.uid).get()
  if (adminDoc.data()?.role !== 'super_admin') {
    throw new functions.https.HttpsError('permission-denied', 'Admin access required')
  }

  const { propertyId, verified } = data
  await db.collection('properties').doc(propertyId).update({
    isVerified: verified,
    verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
    verifiedBy: context.auth.uid,
  })

  return { success: true, verified }
})

// ============ PAYMENT / SUBSCRIPTION ============

exports.createPaymentOrder = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required')

  const { amount, currency = 'INR' } = data
  const options = {
    amount: amount * 100,
    currency,
    receipt: `rcpt_${Date.now()}`,
    notes: { userId: context.auth.uid },
  }

  try {
    const order = await razorpay.orders.create(options)
    return { id: order.id, amount: order.amount, currency: order.currency }
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Payment creation failed')
  }
})

exports.verifyPayment = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required')

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = data
  const crypto = require('crypto')
  const generatedSignature = crypto
    .createHmac('sha256', functions.config().razorpay.key_secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex')

  if (generatedSignature !== razorpay_signature) {
    throw new functions.https.HttpsError('invalid-argument', 'Payment verification failed')
  }

  await db.collection('users').doc(context.auth.uid).update({
    subscription: planId || 'premium',
    subscriptionSince: admin.firestore.FieldValue.serverTimestamp(),
    subscriptionExpiry: admin.firestore.Timestamp.fromDate(
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    ),
  })

  await db.collection('transactions').add({
    userId: context.auth.uid,
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    planId,
    amount: data.amount,
    status: 'completed',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  })

  return { success: true }
})

// ============ NOTIFICATIONS ============

exports.sendPropertyNotification = functions.firestore
  .document('properties/{propertyId}')
  .onCreate(async (snap, context) => {
    const property = snap.data()

    const users = await db.collection('users')
      .where('preferences.city', '==', property.city)
      .where('preferences.notifications', '==', true)
      .get()

    const payload = {
      title: `New ${property.propertyType} in ${property.city}`,
      body: `${property.bedrooms || ''} BHK starting at ₹${(property.price / 100000).toFixed(1)}L`,
      propertyId: context.params.propertyId,
    }

    const notifications = []
    users.forEach(userDoc => {
      notifications.push({
        userId: userDoc.id,
        ...payload,
        read: false,
        timestamp: admin.database.ServerValue.TIMESTAMP,
      })
    })

    if (notifications.length > 0) {
      const batch = rtdb.ref('notifications').push()
      await batch.set(notifications)
    }
  })

// ============ DUPLICATE LISTING DETECTION ============

exports.detectDuplicateListing = functions.firestore
  .document('properties/{propertyId}')
  .onCreate(async (snap) => {
    const property = snap.data()

    const similar = await db.collection('properties')
      .where('city', '==', property.city)
      .where('locality', '==', property.locality)
      .where('price', '==', property.price)
      .where('bedrooms', '==', property.bedrooms)
      .get()

    if (similar.docs.length > 1) {
      const duplicates = similar.docs.map(d => d.id)
      await db.collection('reports').add({
        type: 'duplicate_listing',
        propertyIds: duplicates,
        detectedAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'pending',
      })
    }
  })

// ============ LEAD MANAGEMENT ============

exports.createLead = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required')

  const lead = {
    ...data,
    buyerId: context.auth.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    status: 'new',
    score: 0,
  }

  const docRef = await db.collection('leads').add(lead)

  await db.collection('properties').doc(data.propertyId).update({
    leads: admin.firestore.FieldValue.increment(1),
  })

  return { id: docRef.id }
})

// ============ SCHEDULE VISIT ============

exports.scheduleVisit = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required')

  const visit = {
    ...data,
    buyerId: context.auth.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    status: 'pending',
    reminderSent: false,
  }

  await db.collection('visits').add(visit)
  return { success: true, message: 'Visit scheduled' }
})

// ============ HEALTH CHECK ============

exports.healthCheck = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString(), service: 'rstate-api' })
  })
})
