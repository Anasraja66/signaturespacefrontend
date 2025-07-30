// utils/dummyData.js (or wherever your dummyProperties array is defined)

export const dummyProperties = [
  {
    id: 1,
    title: "Luxury Beachfront Villa",
    name: "Aqua Serenity",
    type: "daily",
    location: "Beach residency",
    rating: 4.8,
    reviewsCount: 34,
    price: 350,
    pricePerNight: "From $350",
    images: [
      require("../assets/beach-res.jpg"),
      require("../assets/header-image.jpg"),
      require("../assets/list-property-image.png"),
      require("../assets/logo.png")
    ],
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    essentials: ["WiFi", "Air Conditioning", "Heating", "Kitchen", "Washer", "Dryer"],
    included: [
      { icon: "Wifi", text: "Free Wi-Fi" },
      { icon: "Parking", text: "Free Parking" },
      { icon: "Concierge", text: "Concierge Service" },
      { icon: "Breakfast", text: "Breakfast Included" },
      { icon: "Cleaning", text: "Daily Cleaning" },
      { icon: "AirConditioning", text: "Air Conditioning" },
      { icon: "Pool", text: "Private Pool" }
    ],
    rooms: [
      { name: "Master Bedroom", description: "King-sized bed, en-suite bathroom, private balcony." },
      { name: "Guest Bedroom 1", description: "Queen-sized bed, garden view, spacious closet." },
      { name: "Guest Bedroom 2", description: "Two single beds, ideal for children, bright and airy." },
      { name: "Bedroom 4", description: "Cozy room with a double bed, perfect for one guest or study." }
    ],
    additionalRooms: [
      { name: "Living Room", description: "Spacious living area with ocean views and comfortable seating." },
      { name: "Kitchen", description: "Fully equipped with modern appliances and dining table." },
      { name: "Private Pool Area", description: "Expansive outdoor area with a private swimming pool and lounge chairs." },
      { name: "Home Cinema", description: "Dedicated cinema room with surround sound and comfortable recliners." },
      { name: "Gym", description: "Compact home gym with treadmill and weights." }
    ],
    description: "Experience unparalleled luxury at this exquisite beachfront villa. With panoramic ocean views, a private pool, and direct beach access, it's the perfect retreat for families or groups seeking an unforgettable vacation. Fully equipped with all modern amenities and tastefully decorated.",
    locationDetails: {
      lat: 25.2048,
      lng: 55.2708,
      address: "123 Ocean Drive, Beachfront Paradise",
      notes: "Located just steps from the private beach. Nearest supermarket is a 5-minute drive, and downtown is 20 minutes away."
    },
    reviews: [
      { id: 101, name: "Maria S.", rating: 5, comment: "Breathtaking views and incredible service. Will definitely return!", date: "2025-07-10" },
      { id: 102, name: "Tom K.", rating: 5, comment: "The private pool was amazing! Perfect family vacation.", date: "2025-06-28" },
      { id: 103, name: "Sophia L.", rating: 4, comment: "Beautiful villa, minor issue with Wi-Fi on one day but quickly resolved.", date: "2025-06-15" }
    ],
    hostAccepts: ["Pets (with prior approval)", "Children", "Events (small gatherings)"],
    agent: {
      id: 1,
      name: "Amelia Stephenson",
      image: require("../assets/agent.jpg"),
      rating: 4.9,
      propertiesSold: "50+ properties sold",
      phone: "+1 (555) 123-4567",
      email: "amelia.s@example.com",
      bio: "Amelia is a seasoned real estate agent with over 10 years of experience in luxury vacation rentals. Her dedication to client satisfaction is unparalleled.",
    },
    amenities: ["WiFi", "Pool", "Air Conditioning", "Beach Access", "Gym"],
    reviewCount: 34,
    details: "Villa • 8 guests • 4 bedrooms • 3 bathrooms",
    cancellationPolicy: "Full refund for cancellations made within 48 hours of booking, if the check-in date is at least 14 days away. 50% refund for cancellations made at least 7 days before check-in. No refunds for cancellations made within 7 days of check-in.",
    // ADD THIS NEW bookedDates ARRAY
    bookedDates: [
      { startDate: "2025-07-20", endDate: "2025-07-25" }, // Booked next week
      { startDate: "2025-08-01", endDate: "2025-08-03" }, // Early August weekend
      { startDate: "2025-08-15", endDate: "2025-08-20" }, // Mid-August holiday
      { startDate: "2025-09-05", endDate: "2025-09-05" }  // Single day booking in Sept
    ]
  },
  {
    id: 2,
    title: "Spacious Downtown Apartment",
    name: "Urban Retreat",
    type: "monthly",
    location: "Downtown",
    rating: 4.5,
    reviewsCount: 20,
    price: 1200,
    pricePerNight: "From $1200/month",
    images: [
      require("../assets/downtown.jpg"),
      require("../assets/Marina.jpg"),
      require("../assets/Lake tower.jpg")
    ],
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    essentials: ["WiFi", "Heating", "Kitchen", "Dishwasher"],
    included: [
      { icon: "Parking", text: "Underground Parking" },
      { icon: "Security", text: "24/7 Security" },
      { icon: "Gym", text: "Building Gym Access" },
      { icon: "WashingMachine", text: "In-unit Laundry" }
    ],
    rooms: [
      { name: "Master Bedroom", description: "Queen-sized bed with ample closet space and city views." },
      { name: "Second Bedroom", description: "Double bed, suitable for guests or home office setup." }
    ],
    additionalRooms: [
      { name: "Living Area", description: "Open-plan living and dining space with comfortable sofa." },
      { name: "Kitchen", description: "Modern kitchen with all necessary cooking utensils and breakfast bar." },
      { name: "Balcony", description: "Private balcony with seating, offering stunning cityscapes." }
    ],
    description: "A chic and spacious apartment located in the vibrant heart of Downtown. Ideal for long-term stays, it offers convenient access to business districts, shopping, and entertainment. Enjoy stunning cityscapes from your private balcony.",
    locationDetails: {
      lat: 25.276987,
      lng: 55.296249,
      address: "456 City View Tower, Downtown",
      notes: "Walking distance to metro station and major attractions. Several cafes and restaurants just around the corner."
    },
    reviews: [
      { id: 201, name: "Chris T.", rating: 5, comment: "Perfect for my business trip. Very clean and excellent location.", date: "2025-07-05" },
      { id: 202, name: "Anna P.", rating: 4, comment: "Comfortable stay, responsive host. Would book again.", date: "2025-06-20" }
    ],
    hostAccepts: ["Children"],
    agent: {
      id: 2,
      name: "Kacie Velasquez",
      image: require("../assets/agent.jpg"),
      rating: 4.7,
      propertiesSold: "35+ properties sold",
      phone: "+1 (555) 987-6543",
      email: "kacie.v@example.com",
      bio: "Kacie specializes in urban apartments and short-term leases. She's known for her quick responses and attention to detail.",
    },
    amenities: ["WiFi", "Heating", "Gym (building)", "Balcony"],
    reviewCount: 20,
    details: "Apartment • 4 guests • 2 bedrooms • 1 bathroom",
    cancellationPolicy: "For monthly rentals, 30 days notice required for full refund. Cancellations within 30 days are subject to a cancellation fee equivalent to one week's rent.",
    bookedDates: [] // This property has no dummy booked dates
  },
  {
    id: 3,
    title: "Spacious Downtown Apartment",
    name: "Urban Retreat",
    type: "monthly",
    location: "Downtown",
    rating: 4.5,
    reviewsCount: 20,
    price: 1200,
    pricePerNight: "From $1200/month",
    images: [
      require("../assets/downtown.jpg"),
      require("../assets/Marina.jpg"),
      require("../assets/Lake tower.jpg")
    ],
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    essentials: ["WiFi", "Heating", "Kitchen", "Dishwasher"],
    included: [
      { icon: "Parking", text: "Underground Parking" },
      { icon: "Security", text: "24/7 Security" },
      { icon: "Gym", text: "Building Gym Access" },
      { icon: "WashingMachine", text: "In-unit Laundry" }
    ],
    rooms: [
      { name: "Master Bedroom", description: "Queen-sized bed with ample closet space and city views." },
      { name: "Second Bedroom", description: "Double bed, suitable for guests or home office setup." }
    ],
    additionalRooms: [
      { name: "Living Area", description: "Open-plan living and dining space with comfortable sofa." },
      { name: "Kitchen", description: "Modern kitchen with all necessary cooking utensils and breakfast bar." },
      { name: "Balcony", description: "Private balcony with seating, offering stunning cityscapes." }
    ],
    description: "A chic and spacious apartment located in the vibrant heart of Downtown. Ideal for long-term stays, it offers convenient access to business districts, shopping, and entertainment. Enjoy stunning cityscapes from your private balcony.",
    locationDetails: {
      lat: 25.276987,
      lng: 55.296249,
      address: "456 City View Tower, Downtown",
      notes: "Walking distance to metro station and major attractions. Several cafes and restaurants just around the corner."
    },
    reviews: [
      { id: 201, name: "Chris T.", rating: 5, comment: "Perfect for my business trip. Very clean and excellent location.", date: "2025-07-05" },
      { id: 202, name: "Anna P.", rating: 4, comment: "Comfortable stay, responsive host. Would book again.", date: "2025-06-20" }
    ],
    hostAccepts: ["Children"],
    agent: {
      id: 2,
      name: "Kacie Velasquez",
      image: require("../assets/agent.jpg"),
      rating: 4.7,
      propertiesSold: "35+ properties sold",
      phone: "+1 (555) 987-6543",
      email: "kacie.v@example.com",
      bio: "Kacie specializes in urban apartments and short-term leases. She's known for her quick responses and attention to detail.",
    },
    amenities: ["WiFi", "Heating", "Gym (building)", "Balcony"],
    reviewCount: 20,
    details: "Apartment • 4 guests • 2 bedrooms • 1 bathroom",
    cancellationPolicy: "For monthly rentals, 30 days notice required for full refund. Cancellations within 30 days are subject to a cancellation fee equivalent to one week's rent.",
    bookedDates: [] // This property has no dummy booked dates
  },
];

export const areas = [
  {
    id: 1,
    title: "Marina",
    image: require("../assets/Marina.jpg"),
  },
  {
    id: 2,
    title: "Lake view",
    image: require("../assets/Lake tower.jpg"),
  },
  {
    id: 3,
    title: "Downtown",
    image: require("../assets/downtown.jpg"),
  },
  {
    id: 4,
    title: "Beach residency",
    image: require("../assets/beach-res.jpg"),
  },
  {
    id: 5,
    title: "Suburbs",
    image: require("../assets/header-image.jpg"),
  },
  {
    id: 6,
    title: "City Center",
    image: require("../assets/logo.png"),
  },
];

export const agents = [
  {
    id: 1,
    name: "Amelia Stephenson",
    image: require("../assets/agent.jpg"),
    rating: 4.9,
    propertiesSold: "50+ properties sold",
    phone: "+1 (555) 123-4567",
    email: "amelia.s@example.com",
    bio: "Amelia is a seasoned real estate agent with over 10 years of experience in luxury vacation rentals. Her dedication to client satisfaction is unparalleled.",
  },
  {
    id: 2,
    name: "Kacie Velasquez",
    image: require("../assets/agent.jpg"),
    rating: 4.7,
    propertiesSold: "35+ properties sold",
    phone: "+1 (555) 987-6543",
    email: "kacie.v@example.com",
    bio: "Kacie specializes in urban apartments and short-term leases. She's known for her quick responses and attention to detail.",
  },
  {
    id: 3,
    name: "Ethan Wright",
    image: require("../assets/agent.jpg"),
    rating: 4.8,
    propertiesSold: "40+ properties sold",
    phone: "+1 (555) 234-5678",
    email: "ethan.w@example.com",
    bio: "Ethan has a deep knowledge of waterfront properties and an extensive network, ensuring the best deals for his clients.",
  },
  {
    id: 4,
    name: "Olivia Chen",
    image: require("../assets/agent.jpg"),
    rating: 4.6,
    propertiesSold: "28+ properties sold",
    phone: "+1 (555) 876-5432",
    email: "olivia.c@example.com",
    bio: "Olivia is passionate about helping families find their perfect vacation home. Her friendly approach makes the process seamless.",
  },
  {
    id: 5,
    name: "Noah Patel",
    image: require("../assets/agent.jpg"),
    rating: 4.9,
    propertiesSold: "62+ properties sold",
    phone: "+1 (555) 345-6789",
    email: "noah.p@example.com",
    bio: "Noah is a top performer in the luxury rental market, consistently exceeding client expectations with his strategic approach.",
  },
];

export const reviews = [
  {
    id: 1,
    name: "Aisha Khan",
    image: require("../assets/agent.jpg"),
    rating: 5,
    verified: true,
    date: "July 15, 2025",
    review: "Absolutely fantastic experience! The villa was stunning and the service was impeccable. Highly recommend for a relaxing getaway.",
  },
  {
    id: 2,
    name: "David Lee",
    image: require("../assets/agent.jpg"),
    rating: 4,
    verified: true,
    date: "July 10, 2025",
    review: "Great city apartment! Clean, comfortable, and close to all amenities. Would definitely stay again for a monthly rental.",
  },
  {
    id: 3,
    name: "Sophia Rossi",
    image: require("../assets/agent.jpg"),
    rating: 5,
    verified: false,
    date: "July 08, 2025",
    review: "The beach residency was a dream come true. Perfect for families, with plenty of space and a beautiful view. Five stars!",
  },
  {
    id: 4,
    name: "Omar Sharif",
    image: require("../assets/agent.jpg"),
    rating: 4,
    verified: true,
    date: "July 01, 2025",
    review: "Good value for money. The property was as described and the booking process was smooth. Some minor issues, but overall positive.",
  },
  {
    id: 5,
    name: "Emily White",
    image: require("../assets/agent.jpg"),
    rating: 5,
    verified: true,
    date: "June 28, 2025",
    review: "Our monthly rental in Downtown was superb. The agent was very helpful and responsive. Made our long-term stay very comfortable.",
  },
  {
    id: 6,
    name: "Carlos Gomez",
    image: require("../assets/agent.jpg"),
    rating: 3,
    verified: false,
    date: "June 20, 2025",
    review: "The location was excellent, but the apartment could use some updates. It was clean, but felt a bit dated.",
  },
];

export const partners = [
  { name: "Bayut", logo: "logo.png" },
  { name: "Airbnb", logo: "logo.png" },
  { name: "Property Finder", logo: "logo.png" },
  { name: "Dubizzle", logo: "logo.png" },
  { name: "Vrbo", logo: "logo.png" },
  { name: "Homes & Villas by Marriott Bonvoy", logo: "logo.png" },
  { name: "Expedia", logo: "logo.png" },
]

export const trustedOperatorPoints = {
  propertyTypes: [
    "Single Apartments",
    "Single Luxury Villas",
    "Townhouses",
    "Villa Complexes & Gated Communities",
    "Boutique Buildings",
  ],
  portfolios: [
    "High-Rise Towers & Multi-Floor Portfolios",
    "Hotels & Resorts",
    "Prime Location Properties",
    "Real Estate Developers",
    "Institutional Investors & Funds",
  ],
  investors: [
    "Family Offices & Private Investors",
    "REITs ( Real Estate Investment Trusts)",
    "Vacation Home Investors",
  ],
}

export const services = [
  {
    icon: "Home",
    title: "Listing & Marketing",
    description:
      "Craft an eye-catching listing with our industry experts; we cover the listing fees, so you don't have to worry.",
  },
  {
    icon: "Palette",
    title: "Interior Design",
    description:
      "Increase your booking rate by 12% with our dedicated designers; customize interiors for higher returns.",
  },
  {
    icon: "Camera",
    title: "Professional Photography",
    description:
      "Elevate your property's appeal with professional photos, 360 virtual tours, and captivating video content.",
  },
  {
    icon: "Settings",
    title: "Initial Property Setup & Onboarding",
    description: "Get a rental income projection and DTCM-ready setup after the initial property visit.",
  },
  {
    icon: "Sparkles",
    title: "Property Maintenance",
    description:
      "Skilled technicians handle routine maintenance and repairs at discounted rates; no markups on invoices.",
  },
  {
    icon: "Bath", // Using Bath as a placeholder for a cleaning icon
    title: "Housekeeping",
    description: "Enjoy round-the-clock housekeeping services; we take care of everything so you can relax.",
  },
  {
    icon: "MessageCircle",
    title: "Inquiries & Bookings",
    description: "Streamlined booking experience, 7 days a week; our team handles inquiries and confirms reservations.",
  },
  {
    icon: "UserCheck",
    title: "Dedicated Owner Services",
    description: "Reach us anytime via phone or email if you have questions about your home.",
  },
  {
    icon: "DollarSign",
    title: "Pricing Optimization",
    description: "Maximize income with the latest tools; we track revenue and occupancy to optimize rates.",
  },
]

export const journeySteps = [
  {
    number: 1,
    title: "Property Check",
    description: "We inspect your property and ensure it meets our standards.",
  },
  {
    number: 2,
    title: "Revenue Insights",
    description: "Estimate potential earnings based on market trends.",
  },
  {
    number: 3,
    title: "Contract",
    description: "Sign the agreement and begin our partnership.",
  },
  {
    number: 4,
    title: "Design & Onboarding",
    description: "Boost your property's appeal with expert interior design and preparation.",
  },
  {
    number: 5,
    title: "Photos, Listing & Pricing",
    description: "List your property on top platforms with professional photos and optimized pricing.",
  },
  {
    number: 6,
    title: "Reservation",
    description: "Manage all guest bookings and ensure max. occupancy across all platforms.",
  },
  {
    number: 7,
    title: "Guest Support",
    description: "Ensure smooth check-ins and provide 24/7 guest assistance.",
  },
  {
    number: 8,
    title: "Portals & Payouts",
    description: "Track performance and receive monthly payouts with ease.",
  },
]

export const testimonials = [
  {
    text: "Assalamualikum.We had a great stay here at celestia actually this is not our first time to avail the rent here its second time coz the environment and ambiance of the..",
    rating: 5,
    author: "Mae Manila",
    date: "5/05/2025",
    avatar: "/property-management-assets/testimonial-avatar-1.png",
  },
  {
    text: "Very good company",
    rating: 5,
    author: "Ajay kumar yadav",
    date: "4/30/2025",
    avatar: "/property-management-assets/testimonial-avatar-2.png",
  },
  {
    text: "Excellent service and beautiful properties. Highly recommend!",
    rating: 5,
    author: "John Doe",
    date: "6/10/2025",
    avatar: "/placeholder.svg?height=50&width=50",
  },
]

export const faqs = [
  {
    question: "What are the requirements for renting your property?",
    answer:
      "To rent your property with us, it must meet certain quality and safety standards. We conduct a thorough property check to ensure it aligns with our premium offerings. Key requirements include a well-maintained interior, essential amenities, and compliance with local regulations.",
  },
  {
    question: "How do I list my property?",
    answer:
      "Listing your property is a straightforward process. First, fill out our 'List Your Property Details' form on this page. Our team will then contact you to schedule a property inspection. Once approved, we'll handle professional photography, listing creation, and marketing across top platforms.",
  },
  {
    question: "How much can I earn from my holiday home?",
    answer:
      "Your earning potential depends on various factors such as property type, location, amenities, and market demand. We provide a detailed revenue projection based on market trends and optimize pricing strategies to maximize your income and occupancy rates.",
  },
  {
    question: "How can I be assured that my property is safe and secure?",
    answer:
      "We prioritize the safety and security of your property. We implement strict guest vetting processes, conduct regular property checks, and have a dedicated team available 24/7 for any emergencies or issues that may arise during a guest's stay.",
  },
  {
    question: "What happens if something is damaged during a guest stay?",
    answer:
      "In the event of damage during a guest's stay, we have a clear protocol in place. We assess the damage, coordinate repairs, and handle the necessary claims or charges to ensure your property is restored to its original condition. Our team manages all aspects of this process.",
  },
  {
    question: "What happens if there is an electric, plumbing or maintenance issue?",
    answer:
      "Our dedicated property maintenance team is available to address any electric, plumbing, or general maintenance issues promptly. We have a network of skilled technicians who provide timely repairs at discounted rates, ensuring minimal disruption to your property and guests.",
  },
  {
    question: "How do you find guests for my holiday home?",
    answer:
      "We leverage extensive marketing channels and partnerships with leading booking platforms like Airbnb, Booking.com, Expedia, and more. Our expert marketing team creates compelling listings and employs targeted strategies to attract a wide range of guests, ensuring high occupancy.",
  },
  {
    question: "How Much Will I Have To Pay For Your Service?",
    answer:
      "Our service fees are competitive and transparent. We offer various management packages tailored to your needs, typically based on a percentage of the rental income. All fees are clearly outlined in our contract, with no hidden charges.",
  },
  {
    question: "What Will The Rental Price That I Charge For My Property Be?",
    answer:
      "We use advanced pricing optimization tools and market analysis to determine the optimal rental price for your property. Our goal is to maximize your income while ensuring competitive rates that attract guests and maintain high occupancy throughout the year.",
  },
  {
    question: "What are my (as Property owner) responsibilities?",
    answer:
      "As a property owner, your primary responsibilities include ensuring the property is well-maintained and ready for guests, providing accurate information about the property, and adhering to the terms of our management agreement. We handle most operational aspects, allowing you a hassle-free experience.",
  },
  {
    question: "What Are The Responsibilities Of Deluxe Holiday Homes™?",
    answer:
      "Deluxe Holiday Homes™ is responsible for comprehensive property management, including listing and marketing, guest communication, booking management, check-in/check-out, cleaning, maintenance coordination, and financial reporting. We aim to provide a seamless experience for both owners and guests.",
  },
  {
    question: "How will I know when my property is rented and when it's vacant?",
    answer:
      "Our state-of-the-art Owner's Portal provides real-time insights into your property's performance. You can easily track bookings, monitor vacancies, view financial statements, and access all relevant information about your property's status at any time.",
  },
]
