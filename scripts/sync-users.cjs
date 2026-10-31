/*
 * One-time backfill: creates a Firestore `users` profile for every
 * Firebase Authentication user that is missing one.
 *
 * Usage:
 *   node scripts/sync-users.cjs <path-to-serviceAccountKey.json>
 *
 * Get the key from:
 *   Firebase Console > Project Settings > Service accounts > Generate new private key
 * (or set GOOGLE_APPLICATION_CREDENTIALS to the file path instead)
 */
const path = require('path')
const fs = require('fs')

const keyPath =
  process.argv[2] ||
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  path.join(process.cwd(), 'serviceAccountKey.json')

if (!fs.existsSync(keyPath)) {
  console.error(
    `\nService account key not found at: ${keyPath}\n\n` +
    'Download it from:\n' +
    '  Firebase Console > Project Settings > Service accounts > Generate new private key\n' +
    'Save it as serviceAccountKey.json in the project root (or pass the path as an argument):\n' +
    '  npm run sync-users -- "C:\\path\\to\\key.json"\n'
  )
  process.exit(1)
}

const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert(require(path.resolve(keyPath))),
})

const db = admin.firestore()
const ADMIN_EMAILS = ['admin@rstate.in', 'punjabfoodsrte@gmail.com']

async function run() {
  const authUsers = []
  let pageToken
  do {
    const result = await admin.auth().listUsers(1000, pageToken)
    authUsers.push(...result.users)
    pageToken = result.pageToken
  } while (pageToken)

  console.log(`Found ${authUsers.length} user(s) in Firebase Authentication.\n`)

  let created = 0
  for (const u of authUsers) {
    const ref = db.collection('users').doc(u.uid)
    const snap = await ref.get()
    if (snap.exists) {
      console.log(`  skip     ${u.email || u.uid}`)
      continue
    }
    await ref.set({
      uid: u.uid,
      email: u.email || '',
      displayName: u.displayName || '',
      phone: u.phoneNumber || '',
      photoURL: u.photoURL || '',
      role: ADMIN_EMAILS.includes(u.email) ? 'super_admin' : 'buyer',
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
    created++
    console.log(`  created  ${u.email || u.uid}`)
  }

  console.log(`\nDone. ${created} profile(s) created, ${authUsers.length - created} already existed.`)
  process.exit(0)
}

run().catch(err => {
  console.error('\nSync failed:', err.message)
  process.exit(1)
})
