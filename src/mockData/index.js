// Mock data for the application
// This file contains static data that replaces API calls

// User profile mock data
export const userProfileMock = {
  id: 1,
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  profile_image: "/profile-placeholder.jpg",
  type: 1, // 1 for customer, 2 for doula
  profile_complete: 1,
  city: "New York",
  userDetail: {
    location: "Manhattan",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    experience: "5 years",
    languages: ["English", "Spanish"],
    specialties: ["Postpartum", "Newborn Care"]
  }
};

// Doula profile mock data
export const doulaProfileMock = {
  id: 2,
  first_name: "Jane",
  last_name: "Smith",
  email: "jane.smith@example.com",
  profile_image: "/profile-placeholder.jpg",
  type: 2, // 1 for customer, 2 for doula
  profile_complete: 1,
  city: "Los Angeles",
  userDetail: {
    location: "Beverly Hills",
    bio: "Professional doula with extensive experience in newborn care.",
    experience: "8 years",
    languages: ["English", "French"],
    specialties: ["Prenatal Support", "Breastfeeding Support"]
  },
  rating: 4.8,
  reviews: 24
};

// Services list mock data
export const servicesMock = {
  success: true,
  data: [
    { id: 1, name: "Prenatal Support", description: "Support during pregnancy" },
    { id: 2, name: "Labor Support", description: "Support during labor and delivery" },
    { id: 3, name: "Postpartum Support", description: "Support after childbirth" },
    { id: 4, name: "Newborn Care", description: "Specialized care for newborns" },
    { id: 5, name: "Breastfeeding Support", description: "Help with breastfeeding challenges" }
  ]
};

// Languages list mock data
export const languagesMock = {
  success: true,
  data: [
    { id: 1, name: "English" },
    { id: 2, name: "Spanish" },
    { id: 3, name: "French" },
    { id: 4, name: "Mandarin" },
    { id: 5, name: "Hindi" }
  ]
};

// Countries list mock data
export const countriesMock = {
  success: true,
  data: [
    { id: 1, name: "United States", code: "US" },
    { id: 2, name: "Canada", code: "CA" },
    { id: 3, name: "United Kingdom", code: "UK" },
    { id: 4, name: "Australia", code: "AU" },
    { id: 5, name: "Germany", code: "DE" }
  ]
};

// Age groups mock data
export const ageGroupsMock = {
  success: true,
  data: [
    { id: 1, name: "Newborn (0-3 months)" },
    { id: 2, name: "Infant (3-12 months)" },
    { id: 3, name: "Toddler (1-3 years)" },
    { id: 4, name: "Preschool (3-5 years)" }
  ]
};

// Doula search results mock data
export const doulaSearchMock = {
  success: true,
  data: [
    {
      id: 2,
      first_name: "Jane",
      last_name: "Smith",
      profile_image: "/profile-placeholder.jpg",
      city: "Los Angeles",
      userDetail: {
        location: "Beverly Hills",
        experience: "8 years"
      },
      rating: 4.8,
      reviews: 24
    },
    {
      id: 3,
      first_name: "Emily",
      last_name: "Johnson",
      profile_image: "/profile-placeholder.jpg",
      city: "Chicago",
      userDetail: {
        location: "Lincoln Park",
        experience: "6 years"
      },
      rating: 4.5,
      reviews: 18
    },
    {
      id: 4,
      first_name: "Sarah",
      last_name: "Williams",
      profile_image: "/profile-placeholder.jpg",
      city: "Boston",
      userDetail: {
        location: "Cambridge",
        experience: "10 years"
      },
      rating: 4.9,
      reviews: 32
    }
  ]
};

// Contracts mock data
export const contractsMock = {
  success: true,
  data: [
    {
      id: 1,
      title: "Postpartum Support",
      customer: {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        profile_image: "/profile-placeholder.jpg"
      },
      doula: {
        id: 2,
        first_name: "Jane",
        last_name: "Smith",
        profile_image: "/profile-placeholder.jpg"
      },
      status: "Active",
      start_date: "2023-06-01",
      end_date: "2023-07-01"
    },
    {
      id: 2,
      title: "Newborn Care",
      customer: {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        profile_image: "/profile-placeholder.jpg"
      },
      doula: {
        id: 3,
        first_name: "Emily",
        last_name: "Johnson",
        profile_image: "/profile-placeholder.jpg"
      },
      status: "Completed",
      start_date: "2023-04-15",
      end_date: "2023-05-15"
    }
  ]
};

// Contact/Messages mock data
export const contactMock = {
  success: true,
  data: [
    {
      id: 1,
      doula: {
        id: 2,
        first_name: "Jane",
        last_name: "Smith",
        profile_image: "/profile-placeholder.jpg"
      },
      messages: [
        {
          id: 1,
          message: "Hello, I'm interested in your services.",
          createdAt: "2023-06-15T10:30:00Z"
        }
      ]
    },
    {
      id: 2,
      doula: {
        id: 3,
        first_name: "Emily",
        last_name: "Johnson",
        profile_image: "/profile-placeholder.jpg"
      },
      messages: [
        {
          id: 2,
          message: "I'd like to schedule a consultation.",
          createdAt: "2023-06-10T14:45:00Z"
        }
      ]
    }
  ]
};

// Favorites mock data
export const favoritesMock = {
  success: true,
  data: [
    {
      id: 1,
      user: {
        id: 2,
        first_name: "Jane",
        last_name: "Smith",
        profile_image: "/profile-placeholder.jpg",
        city: "Los Angeles",
        userDetail: {
          location: "Beverly Hills"
        }
      }
    },
    {
      id: 2,
      user: {
        id: 3,
        first_name: "Emily",
        last_name: "Johnson",
        profile_image: "/profile-placeholder.jpg",
        city: "Chicago",
        userDetail: {
          location: "Lincoln Park"
        }
      }
    }
  ]
};

// Availability mock data
export const availabilityMock = {
  success: true,
  data: {
    monday: [
      { start_time: "09:00:00", end_time: "17:00:00" }
    ],
    tuesday: [
      { start_time: "09:00:00", end_time: "17:00:00" }
    ],
    wednesday: [
      { start_time: "09:00:00", end_time: "17:00:00" }
    ],
    thursday: [
      { start_time: "09:00:00", end_time: "17:00:00" }
    ],
    friday: [
      { start_time: "09:00:00", end_time: "17:00:00" }
    ],
    saturday: [],
    sunday: []
  }
};

// Generic success response
export const successResponse = {
  success: true,
  message: "Operation completed successfully"
};

// Generic error response
export const errorResponse = {
  success: false,
  error: "Something went wrong"
};
