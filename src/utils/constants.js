export const ROLES = {
  BUYER: 'buyer',
  SELLER: 'seller',
  BROKER: 'broker',
  BUILDER: 'builder',
  ADMIN: 'super_admin',
}

export const ROLE_DASHBOARD_PATH = {
  [ROLES.BUYER]: '/dashboard/buyer',
  [ROLES.SELLER]: '/dashboard/seller',
  [ROLES.BROKER]: '/dashboard/broker',
  [ROLES.BUILDER]: '/dashboard/builder',
  [ROLES.ADMIN]: '/dashboard/admin',
}

export const getDashboardPath = (role) => ROLE_DASHBOARD_PATH[role] || ROLE_DASHBOARD_PATH[ROLES.BUYER]

export const PROPERTY_TYPES = {
  FLAT: 'Flat',
  VILLA: 'Villa',
  PLOT: 'Plot',
  COMMERCIAL: 'Commercial',
  OFFICE: 'Office',
  SHOP: 'Shop',
  PG: 'PG',
  RENT: 'Rent',
  HOSTEL: 'Hostel',
  AGRICULTURE: 'Agriculture',
  PAGRI: 'Pagri',
}

export const FURNISHING_TYPES = {
  FURNISHED: 'Fully Furnished',
  SEMI: 'Semi Furnished',
  UNFURNISHED: 'Unfurnished',
}

export const PROPERTY_STATUS = {
  AVAILABLE: 'available',
  SOLD: 'sold',
  RENTED: 'rented',
  UNDER_CONSTRUCTION: 'under_construction',
  READY_TO_MOVE: 'ready_to_move',
}

export const LISTING_TYPES = {
  OWNER: 'owner',
  BROKER: 'broker',
  BUILDER: 'builder',
}

export const AMENITIES = [
  'Swimming Pool',
  'Gym',
  'Park',
  'Club House',
  'Security',
  'Power Backup',
  'Lift',
  'Rain Water Harvesting',
  'Jogging Track',
  'Children Play Area',
  'Community Hall',
  'Indoor Games',
  'Tennis Court',
  'Badminton Court',
  'Yoga Center',
  'Spa',
  'Sauna',
  'Jacuzzi',
  'CCTV',
  'Intercom',
  'Visitor Parking',
  '24x7 Water',
  'Gas Pipeline',
  'Vaastu Compliant',
]

export const FACING_TYPES = [
  'East',
  'West',
  'North',
  'South',
  'North-East',
  'North-West',
  'South-East',
  'South-West',
]

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar', 'Chandigarh', 'Dadra and Nagar Haveli',
  'Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh',
  'Lakshadweep', 'Puducherry',
]

export const CITIES_BY_STATE = [
  {
    state: 'Maharashtra',
    cities: ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Navi Mumbai', 'Aurangabad', 'Nashik', 'Solapur', 'Kolhapur', 'Amravati'],
  },
  {
    state: 'Delhi NCR',
    cities: ['Delhi', 'Noida', 'Gurgaon', 'Faridabad', 'Ghaziabad'],
  },
  {
    state: 'Karnataka',
    cities: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
  },
  {
    state: 'Telangana',
    cities: ['Hyderabad', 'Warangal', 'Karimnagar'],
  },
  {
    state: 'Tamil Nadu',
    cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
  },
  {
    state: 'West Bengal',
    cities: ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'],
  },
  {
    state: 'Gujarat',
    cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar'],
  },
  {
    state: 'Rajasthan',
    cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer'],
  },
  {
    state: 'Uttar Pradesh',
    cities: ['Lucknow', 'Agra', 'Varanasi', 'Kanpur', 'Prayagraj', 'Meerut', 'Bareilly'],
  },
  {
    state: 'Punjab',
    cities: ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
  },
  {
    state: 'Madhya Pradesh',
    cities: ['Indore', 'Bhopal', 'Gwalior', 'Jabalpur', 'Ujjain'],
  },
  {
    state: 'Bihar',
    cities: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur'],
  },
  {
    state: 'Odisha',
    cities: ['Bhubaneswar', 'Cuttack', 'Rourkela'],
  },
  {
    state: 'Chhattisgarh',
    cities: ['Raipur', 'Bilaspur', 'Korba'],
  },
  {
    state: 'Jharkhand',
    cities: ['Ranchi', 'Jamshedpur', 'Dhanbad'],
  },
  {
    state: 'Kerala',
    cities: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur'],
  },
  {
    state: 'Haryana',
    cities: ['Panchkula', 'Ambala', 'Karnal', 'Hisar'],
  },
  {
    state: 'Uttarakhand',
    cities: ['Dehradun', 'Haridwar', 'Rishikesh', 'Haldwani'],
  },
]

export const ALL_CITIES = CITIES_BY_STATE.flatMap(s => s.cities)
export const BHK_TYPES = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK']

export const SUBSCRIPTION_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    features: ['3 Listings', 'Basic Support', 'Standard Visibility'],
    color: 'gray',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 999,
    features: ['10 Listings', 'Featured Badge', 'Priority Support', 'Analytics', 'WhatsApp Integration'],
    color: 'blue',
    popular: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: 2499,
    features: ['Unlimited Listings', 'Featured Badge', 'Premium Support', 'Advanced Analytics', 'API Access', 'Team Management', 'Verified Badge'],
    color: 'purple',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 9999,
    features: ['Everything in Business', 'Dedicated Manager', 'Custom Integration', 'White Label', 'Bulk Upload', 'Priority Listing', 'Ad Credits'],
    color: 'gold',
  },
]

export const FIREBASE_COLLECTIONS = {
  USERS: 'users',
  PROPERTIES: 'properties',
  CHATS: 'chats',
  MESSAGES: 'messages',
  VISITS: 'visits',
  REVIEWS: 'reviews',
  SUBSCRIPTIONS: 'subscriptions',
  TRANSACTIONS: 'transactions',
  NOTIFICATIONS: 'notifications',
  BANNERS: 'banners',
  BLOG: 'blog',
  LEADS: 'leads',
  CLIENTS: 'clients',
  REPORTS: 'reports',
  SAVED_PROPERTIES: 'saved_properties',
}

export const CURRENCY_SYMBOL = '₹'

export const PROPERTY_TAGS = {
  FEATURED: 'featured',
  URGENT: 'urgent',
  VERIFIED: 'verified',
  SOLD: 'sold',
  NEW: 'new',
  PREMIUM: 'premium',
  EXCLUSIVE: 'exclusive',
}
