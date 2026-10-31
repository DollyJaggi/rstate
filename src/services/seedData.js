import { collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { db, auth } from './firebase'
import { FIREBASE_COLLECTIONS, ROLES, PROPERTY_TYPES, FURNISHING_TYPES } from '../utils/constants'
import toast from 'react-hot-toast'

const seedProperties = [
  {
    title: '3 BHK Luxury Apartment in Sector 62',
    description: 'Spacious 3 BHK apartment with modern amenities in the heart of Noida. Close to metro station, schools, and hospitals. Features modular kitchen, wooden flooring, 24x7 security.',
    price: 8500000, propertyType: 'Flat', category: 'buy',
    bedrooms: 3, bathrooms: 2, area: 1450, furnishing: 'Fully Furnished', parking: 2,
    facing: 'East', floor: 8, totalFloors: 15, age: '3 years',
    city: 'Noida', locality: 'Sector 62', state: 'Uttar Pradesh', pincode: '201301',
    listingType: 'owner', ownerName: 'Rajesh Kumar', ownerPhone: '+919876543210',
    amenities: ['Swimming Pool', 'Gym', 'Park', 'Security', 'Power Backup', 'Lift', 'CCTV'],
    isFeatured: true, isVerified: true, isUrgent: false, views: 1234, saves: 56, leads: 12,
    latitude: 28.62, longitude: 77.39,
  },
  {
    title: '4 BHK Luxury Villa in Whitefield',
    description: 'Premium independent villa with garden, pool, and modern architecture in Bangalore prime locality.',
    price: 25000000, propertyType: 'Villa', category: 'buy',
    bedrooms: 4, bathrooms: 3, area: 3200, furnishing: 'Fully Furnished', parking: 2,
    facing: 'North-East', floor: 2, totalFloors: 2, age: 'New',
    city: 'Bangalore', locality: 'Whitefield', state: 'Karnataka', pincode: '560066',
    listingType: 'owner', ownerName: 'Priya Sharma', ownerPhone: '+919876543211',
    amenities: ['Swimming Pool', 'Gym', 'Park', 'Club House', 'Security', 'Rain Water Harvesting'],
    isFeatured: true, isVerified: true, isUrgent: false, views: 2100, saves: 89, leads: 23,
    latitude: 12.97, longitude: 77.74,
  },
  {
    title: '2 BHK Flat for Rent in Andheri West',
    description: 'Well maintained 2 BHK flat on rent. Near metro, markets, hospitals. Ideal for families.',
    price: 28000, propertyType: 'Rent', category: 'rent',
    bedrooms: 2, bathrooms: 1, area: 850, furnishing: 'Semi Furnished', parking: 1,
    facing: 'West', floor: 5, totalFloors: 12, age: '5 years',
    city: 'Mumbai', locality: 'Andheri West', state: 'Maharashtra', pincode: '400053',
    listingType: 'broker', ownerName: 'Amit Patel', ownerPhone: '+919876543212',
    amenities: ['Gym', 'Security', 'Lift', 'Power Backup'],
    isFeatured: false, isVerified: true, isUrgent: true, views: 890, saves: 34, leads: 8,
    latitude: 19.12, longitude: 72.85,
  },
  {
    title: 'Commercial Office Space in Connaught Place',
    description: 'Prime office space in Delhi commercial hub. Suitable for IT, consulting, or corporate.',
    price: 45000000, propertyType: 'Commercial', category: 'buy',
    bedrooms: 0, bathrooms: 2, area: 1800, furnishing: 'Fully Furnished', parking: 4,
    facing: 'North', floor: 3, totalFloors: 10, age: '8 years',
    city: 'Delhi', locality: 'Connaught Place', state: 'Delhi', pincode: '110001',
    listingType: 'broker', ownerName: 'Vikram Singh', ownerPhone: '+919876543213',
    amenities: ['Power Backup', 'Security', 'CCTV', 'Visitor Parking', 'Intercom'],
    isFeatured: true, isVerified: true, isUrgent: false, views: 567, saves: 23, leads: 5,
    latitude: 28.63, longitude: 77.22,
  },
  {
    title: 'Plot for Sale in Gachibowli',
    description: 'Corner plot in prime location. Ideal for building villa or commercial complex.',
    price: 35000000, propertyType: 'Plot', category: 'buy',
    bedrooms: 0, bathrooms: 0, area: 2400, furnishing: 'Unfurnished', parking: 0,
    facing: 'South-East', floor: 0, totalFloors: 0, age: 'NA',
    city: 'Hyderabad', locality: 'Gachibowli', state: 'Telangana', pincode: '500032',
    listingType: 'owner', ownerName: 'Srinivas Reddy', ownerPhone: '+919876543214',
    amenities: [],
    isFeatured: false, isVerified: true, isUrgent: false, views: 345, saves: 18, leads: 4,
    latitude: 17.44, longitude: 78.34,
  },
  {
    title: 'PG Accommodation in Koregaon Park',
    description: 'Fully furnished PG with meals included. Walking distance to IT park. WiFi and AC.',
    price: 12000, propertyType: 'PG', category: 'rent',
    bedrooms: 1, bathrooms: 1, area: 250, furnishing: 'Fully Furnished', parking: 0,
    facing: 'East', floor: 2, totalFloors: 4, age: '2 years',
    city: 'Pune', locality: 'Koregaon Park', state: 'Maharashtra', pincode: '411001',
    listingType: 'owner', ownerName: 'Sneha Joshi', ownerPhone: '+919876543215',
    amenities: ['WiFi', 'AC', 'Meals', 'Washing Machine', 'Security'],
    isFeatured: false, isVerified: false, isUrgent: true, views: 678, saves: 45, leads: 15,
    latitude: 18.54, longitude: 73.89,
  },
  {
    title: '1 BHK Budget Flat in Salt Lake',
    description: 'Affordable 1 BHK in Kolkata IT hub. Good for working professionals.',
    price: 4500000, propertyType: 'Flat', category: 'buy',
    bedrooms: 1, bathrooms: 1, area: 550, furnishing: 'Semi Furnished', parking: 1,
    facing: 'South', floor: 3, totalFloors: 8, age: '2 years',
    city: 'Kolkata', locality: 'Salt Lake City', state: 'West Bengal', pincode: '700091',
    listingType: 'owner', ownerName: 'Arun Das', ownerPhone: '+919876543216',
    amenities: ['Security', 'Lift', 'Power Backup', 'CCTV'],
    isFeatured: false, isVerified: true, isUrgent: false, views: 234, saves: 12, leads: 3,
    latitude: 22.58, longitude: 88.41,
  },
  {
    title: 'Premium Office Space in Hitech City',
    description: 'Modern co-working/office space in Hyderabad tech hub. Fully equipped.',
    price: 85000, propertyType: 'Office', category: 'rent',
    bedrooms: 0, bathrooms: 2, area: 1200, furnishing: 'Fully Furnished', parking: 3,
    facing: 'West', floor: 7, totalFloors: 15, age: '1 year',
    city: 'Hyderabad', locality: 'Hitech City', state: 'Telangana', pincode: '500081',
    listingType: 'builder', ownerName: 'DLF Properties', ownerPhone: '+919876543217',
    amenities: ['Power Backup', 'CCTV', 'Visitor Parking', 'Cafeteria', 'Conference Room', 'High-Speed WiFi'],
    isFeatured: true, isVerified: true, isUrgent: false, views: 456, saves: 28, leads: 9,
    latitude: 17.45, longitude: 78.38,
  },
  {
    title: 'Shop for Rent in Chandni Chowk',
    description: 'Prime retail shop in Delhis busiest market. High footfall area.',
    price: 45000, propertyType: 'Shop', category: 'rent',
    bedrooms: 0, bathrooms: 1, area: 400, furnishing: 'Unfurnished', parking: 0,
    facing: 'North', floor: 0, totalFloors: 3, age: '10+ years',
    city: 'Delhi', locality: 'Chandni Chowk', state: 'Delhi', pincode: '110006',
    listingType: 'broker', ownerName: 'Mohan Lal', ownerPhone: '+919876543218',
    amenities: ['Security', 'CCTV'],
    isFeatured: false, isVerified: false, isUrgent: true, views: 312, saves: 15, leads: 7,
    latitude: 28.65, longitude: 77.23,
  },
  {
    title: 'Hostel for Girls in Koramangala',
    description: 'Safe and secure girls hostel near Bangalore tech parks. AC rooms with meals.',
    price: 9000, propertyType: 'Hostel', category: 'rent',
    bedrooms: 1, bathrooms: 1, area: 180, furnishing: 'Fully Furnished', parking: 0,
    facing: 'East', floor: 1, totalFloors: 3, age: '3 years',
    city: 'Bangalore', locality: 'Koramangala', state: 'Karnataka', pincode: '560034',
    listingType: 'owner', ownerName: 'Lakshmi Devi', ownerPhone: '+919876543219',
    amenities: ['WiFi', 'AC', 'Meals', 'Washing Machine', 'Security', 'CCTV', 'Power Backup'],
    isFeatured: false, isVerified: true, isUrgent: false, views: 890, saves: 67, leads: 34,
    latitude: 12.93, longitude: 77.62,
  },
  {
    title: '5 BHK Penthouse in Bandra',
    description: 'Ultra-luxury penthouse with sea view in Mumbais most premium locality.',
    price: 120000000, propertyType: 'Flat', category: 'buy',
    bedrooms: 5, bathrooms: 4, area: 4500, furnishing: 'Fully Furnished', parking: 3,
    facing: 'West', floor: 25, totalFloors: 28, age: 'New',
    city: 'Mumbai', locality: 'Bandra West', state: 'Maharashtra', pincode: '400050',
    listingType: 'builder', ownerName: 'Lodha Group', ownerPhone: '+919876543220',
    amenities: ['Swimming Pool', 'Gym', 'Spa', 'Jacuzzi', 'Club House', '24x7 Security', 'Valet Parking', 'Sea View'],
    isFeatured: true, isVerified: true, isUrgent: false, views: 5432, saves: 234, leads: 45,
    latitude: 19.05, longitude: 72.83,
  },
  {
    title: 'Affordable 2 BHK in Vaishali',
    description: 'Budget friendly 2 BHK in Ghaziabad. Good connectivity to Delhi via metro.',
    price: 3200000, propertyType: 'Flat', category: 'buy',
    bedrooms: 2, bathrooms: 1, area: 750, furnishing: 'Unfurnished', parking: 1,
    facing: 'South', floor: 4, totalFloors: 7, age: '5 years',
    city: 'Ghaziabad', locality: 'Vaishali', state: 'Uttar Pradesh', pincode: '201010',
    listingType: 'owner', ownerName: 'Suresh Gupta', ownerPhone: '+919876543221',
    amenities: ['Park', 'Security', 'Lift'],
    isFeatured: false, isVerified: false, isUrgent: false, views: 156, saves: 8, leads: 2,
    latitude: 28.64, longitude: 77.34,
  },
  {
    title: '3 BHK in Anna Nagar',
    description: 'Well maintained 3 BHK in Chennais upscale locality. Close to schools and hospitals.',
    price: 9500000, propertyType: 'Flat', category: 'buy',
    bedrooms: 3, bathrooms: 2, area: 1350, furnishing: 'Fully Furnished', parking: 2,
    facing: 'East', floor: 6, totalFloors: 12, age: '4 years',
    city: 'Chennai', locality: 'Anna Nagar', state: 'Tamil Nadu', pincode: '600040',
    listingType: 'owner', ownerName: 'Venkatesh Iyer', ownerPhone: '+919876543222',
    amenities: ['Swimming Pool', 'Gym', 'Park', 'Security', 'Power Backup', 'Lift'],
    isFeatured: true, isVerified: true, isUrgent: false, views: 678, saves: 34, leads: 11,
    latitude: 13.08, longitude: 80.21,
  },
  {
    title: '2 BHK in Bapunagar for Rent',
    description: 'Simple 2 BHK in Ahmedabad. Good for small families. Close to main road.',
    price: 12000, propertyType: 'Rent', category: 'rent',
    bedrooms: 2, bathrooms: 1, area: 700, furnishing: 'Semi Furnished', parking: 1,
    facing: 'North', floor: 2, totalFloors: 4, age: '6 years',
    city: 'Ahmedabad', locality: 'Bapunagar', state: 'Gujarat', pincode: '380024',
    listingType: 'owner', ownerName: 'Kiran Patel', ownerPhone: '+919876543223',
    amenities: ['Security', 'Park'],
    isFeatured: false, isVerified: false, isUrgent: false, views: 234, saves: 12, leads: 5,
    latitude: 23.04, longitude: 72.62,
  },
  {
    title: 'Student PG in Manipal University Area',
    description: 'PG for students near Manipal University. Study-friendly environment with WiFi.',
    price: 7000, propertyType: 'PG', category: 'rent',
    bedrooms: 1, bathrooms: 1, area: 150, furnishing: 'Fully Furnished', parking: 0,
    facing: 'West', floor: 1, totalFloors: 2, age: '2 years',
    city: 'Jaipur', locality: 'Manipal', state: 'Rajasthan', pincode: '302001',
    listingType: 'owner', ownerName: 'Rohit Sharma', ownerPhone: '+919876543224',
    amenities: ['WiFi', 'AC', 'Meals', 'Study Room', 'Security'],
    isFeatured: false, isVerified: false, isUrgent: true, views: 345, saves: 23, leads: 12,
    latitude: 26.91, longitude: 75.79,
  },
]

const seedUsers = [
  { email: 'buyer@test.com', password: 'test123', displayName: 'Amit Buyer', role: ROLES.BUYER },
  { email: 'seller@test.com', password: 'test123', displayName: 'Ravi Seller', role: ROLES.SELLER },
  { email: 'broker@test.com', password: 'test123', displayName: 'Neha Broker', role: ROLES.BROKER },
  { email: 'builder@test.com', password: 'test123', displayName: 'Sunil Builder', role: ROLES.BUILDER },
  { email: 'admin@rstate.in', password: 'admin123', displayName: 'Super Admin', role: ROLES.ADMIN },
]

export async function seedAllData() {
  const results = { users: 0, properties: 0, errors: [] }

  toast.loading('Seeding database...', { id: 'seed' })

  // Seed users
  for (const u of seedUsers) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, u.email, u.password)
      await setDoc(doc(db, FIREBASE_COLLECTIONS.USERS, cred.user.uid), {
        uid: cred.user.uid,
        email: u.email,
        displayName: u.displayName,
        phone: '',
        photoURL: '',
        role: u.role,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        isVerified: u.role === ROLES.ADMIN,
        isActive: true,
        subscription: u.role === ROLES.ADMIN ? 'enterprise' : 'basic',
        preferences: { notifications: true },
        savedProperties: [],
      })
      results.users++
    } catch (e) {
      if (e.code !== 'auth/email-already-in-use') {
        results.errors.push(`User ${u.email}: ${e.message}`)
      } else {
        results.users++ // already exists
      }
    }
  }

  // Seed properties
  for (const p of seedProperties) {
    try {
      await addDoc(collection(db, FIREBASE_COLLECTIONS.PROPERTIES), {
        ...p,
        images: [],
        videos: [],
        brochures: [],
        isActive: true,
        ownerId: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      results.properties++
    } catch (e) {
      results.errors.push(`Property ${p.title}: ${e.message}`)
    }
  }

  if (results.errors.length === 0) {
    toast.success(`✅ Seeded ${results.users} users & ${results.properties} properties!`, { id: 'seed' })
  } else {
    toast.success(`Seeded ${results.users} users, ${results.properties} props (${results.errors.length} errors)`, { id: 'seed' })
  }

  return results
}

export async function seedPropertiesOnly() {
  toast.loading('Seeding properties...', { id: 'seed' })
  let count = 0
  for (const p of seedProperties) {
    try {
      await addDoc(collection(db, FIREBASE_COLLECTIONS.PROPERTIES), {
        ...p,
        images: [], videos: [], brochures: [], isActive: true, ownerId: '',
        createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
      })
      count++
    } catch (e) {
      console.error(e)
    }
  }
  toast.success(`✅ ${count} properties added to Firestore!`, { id: 'seed' })
  return count
}

export { seedProperties }
