# Cherished Beginnings UI

https://cherishedbeginning.fabaf.in/

A Next.js application for connecting parents with doula services. This is a demo project with static data for demonstration purposes.

## Project Overview

Cherished Beginnings is a platform that allows:

- Parents to find and connect with qualified doulas
- Doulas to create profiles and offer their services
- Scheduling and availability management
- Messaging between clients and service providers
- Contract management

## Features

- User authentication (customer and doula roles)
- Profile management
- Search and filtering
- Availability scheduling
- Messaging system
- Contract management
- Favorites system
- Responsive design

## Available Routes

| Route                          | Description                   |
| ------------------------------ | ----------------------------- |
| `/`                            | Home Page                     |
| `/listing`                     | Browse available doulas       |
| `/listing/[id]`                | View doula details            |
| `/listing/nocaregivers`        | No results page               |
| `/contact`                     | Contact page                  |
| `/favourite`                   | Saved favorites               |
| `/contracts`                   | View contracts                |
| `/contracts/[id]`              | View contract details         |
| `/my-requests`                 | View sent requests            |
| `/my-request/[id]`             | View request details          |
| `/profile`                     | User profile                  |
| `/profile/about`               | About section                 |
| `/profile/notification`        | Notification settings         |
| `/profile/password`            | Change password               |
| `/profile/payment-history`     | Payment history               |
| `/profile/payment-method`      | Payment methods               |
| `/profile/profile-description` | Edit profile description      |
| `/profile/resume`              | Resume/CV                     |
| `/doula/[id]`                  | View doula profile            |
| `/doula/availability`          | Doula availability settings   |
| `/doula/contracts`             | Doula contracts               |
| `/doula/contracts/[id]`        | Doula contract details        |
| `/doula/customerprofile`       | Customer profile (for doulas) |
| `/doula/myprofile`             | Doula profile management      |
| `/setting/notification`        | Notification settings         |
| `/setting/verification`        | Account verification          |
| `/availability`                | Availability management       |
| `/calendar`                    | Calendar view                 |

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/cherished-beginnings-ui.git
cd cherished-beginnings-ui
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_BASE_API_URL=http://localhost:3001/api
NEXT_PUBLIC_GOOGLE_ID=your-google-client-id
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
NEXT_PUBLIC_STRIPE_CLIENT_KEY=your-stripe-client-key
NEXT_PUBLIC_IMAGE_PATH=/images/
```

Note: For this demo version, the actual API calls have been replaced with static mock data, so these environment variables are not required for the application to function.

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Building for Production

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm run start
# or
yarn start
```

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/Components` - React components
- `/src/Redux` - Redux store and slices
- `/src/Assets` - Static assets (images, icons)
- `/src/mockData` - Mock data for the demo
- `/src/modules` - Utility functions and helpers
- `/public` - Public assets

## Technologies Used

- Next.js 14
- React 18
- Redux Toolkit
- React Bootstrap
- Ant Design
- React Hook Form
- Formik & Yup
- React Toastify
- Framer Motion
- React Slick

## Notes

This is a demo version with static data. In a production environment, this would connect to a backend API for dynamic data.
