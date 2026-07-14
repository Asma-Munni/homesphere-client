# HomeSphere

HomeSphere is a full-stack property rental and management platform where users can explore available properties, property holders can manage their listings, and administrators can monitor the overall platform.

The project was built as a production-ready TypeScript application using Next.js, Express.js, MongoDB, Better Auth, and JWT authentication.

## Live Website

* Live Website: `YOUR_FRONTEND_LIVE_URL`
* Backend API: `YOUR_BACKEND_LIVE_URL`

## GitHub Repositories

* Frontend: https://github.com/Asma-Munni/homesphere-client
* Backend: https://github.com/Asma-Munni/homesphere-server

## Project Overview

Finding and managing rental properties can become difficult when information is spread across different platforms. HomeSphere provides a simple and organized experience where users can search for suitable properties, view complete details, save favorites, and manage listings according to their assigned role.

The platform supports three types of users:

* Tenant
* Property Holder
* Admin

Each role receives a separate dashboard and only sees the features relevant to them.

## Main Features

### Public Features

* Responsive landing page
* Property search and exploration
* Search properties by title or description
* Filter by category
* Filter by location
* Filter by minimum and maximum price
* Sort properties by date, title, or price
* Pagination
* Property details page
* Responsive property cards
* Skeleton loading states
* About page
* Contact page
* Custom 404 page

### Authentication Features

* Email and password registration
* Email and password login
* Demo login
* Google social login
* Better Auth session management
* Custom JWT generation
* Protected backend APIs
* Secure logout
* Role-based navigation

### Tenant Features

* Tenant dashboard
* Browse available properties
* View property details
* Save favorite properties
* Manage profile

### Property Holder Features

* Property-holder dashboard
* Add new properties
* Manage personal properties
* View property details
* Update property information
* Delete owned properties
* View property statistics

### Admin Features

* Admin dashboard
* Manage users
* Manage all property listings
* View platform statistics
* Remove inappropriate listings
* Monitor platform activity

## Home Page Sections

The HomeSphere landing page includes:

1. Hero banner with interactive slider
2. Property categories
3. Featured properties
4. Why Choose HomeSphere
5. Property statistics
6. Frequently asked questions
7. Newsletter section

## Technology Stack

### Frontend

* Next.js
* React.js
* TypeScript
* Tailwind CSS
* Better Auth
* Framer Motion
* Recharts
* Lucide React
* Sonner
* React Hook Form
* Zod

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* JWT
* Better Auth
* CORS
* Dotenv
* JSON Web Token
* MongoDB Node.js Driver

## Authentication Flow

HomeSphere uses Better Auth for user registration, login, session handling, and cookie authentication.

After a successful login:

1. Better Auth creates the user session.
2. The frontend retrieves the authenticated user ID.
3. The frontend requests a custom JWT from the Express backend.
4. The JWT is stored in local storage.
5. Protected API requests send the token through the `Authorization` header.
6. The backend verifies the token before allowing protected operations.

Example protected request header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## User Roles

### Tenant

A tenant can browse properties, search and filter listings, view details, save favorites, and manage their profile.

### Property Holder

A property holder can add new listings, manage their own properties, update information, delete owned properties, and view property statistics.

### Admin

An admin can manage platform users, review all properties, delete inappropriate content, and view platform analytics.

## Important Routes

### Public Routes

```text
/
/properties
/properties/[id]
/about
/contact
/login
/register
```

### Tenant Routes

```text
/dashboard/tenant
/dashboard/tenant/favorites
/profile
```

### Property Holder Routes

```text
/dashboard/holder
/dashboard/holder/items/add
/dashboard/holder/properties
/profile
```

### Admin Routes

```text
/dashboard/admin
/dashboard/admin/users
/dashboard/admin/properties
/dashboard/admin/statistics
/dashboard/admin/settings
```

## Property Fields

Each property can contain the following information:

* Title
* Short description
* Full description
* Price
* Category
* Location
* Bedrooms
* Bathrooms
* Images
* Amenities
* Property status
* Owner ID
* Creation date
* Last updated date

## Search, Filtering, Sorting and Pagination

The Explore page supports the following query parameters:

```text
search
category
location
minPrice
maxPrice
sort
page
limit
```

Example request:

```text
/api/properties?search=apartment&category=Apartment&location=Dhaka&minPrice=1000&maxPrice=50000&sort=price-asc&page=1&limit=9
```

Supported sorting options include:

* Newest first
* Oldest first
* Price: low to high
* Price: high to low
* Title: A to Z
* Title: Z to A

## API Endpoints

### Authentication

```text
POST /api/auth/token
GET  /api/auth/verify
```

### Properties

```text
GET    /api/properties
GET    /api/properties/:id
GET    /api/properties/owner/:ownerId
POST   /api/properties
PATCH  /api/properties/:id
DELETE /api/properties/:id
```

### Upload

```text
POST /api/upload
```

## Environment Variables

### Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
BETTER_AUTH_SECRET=YOUR_BETTER_AUTH_SECRET
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
```

### Backend `.env`

```env
PORT=5000
CLIENT_URL=http://localhost:3000

MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
DB_NAME=YOUR_DATABASE_NAME

JWT_SECRET=YOUR_LONG_RANDOM_JWT_SECRET
```

Never upload real environment variable values or secret keys to GitHub.

## Installation

### Clone the Frontend

```bash
git clone https://github.com/Asma-Munni/homesphere-client.git
cd homesphere-client
npm install
```

Create a `.env.local` file and add the required frontend environment variables.

Run the frontend:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:3000
```

### Clone the Backend

```bash
git clone https://github.com/Asma-Munni/homesphere-server.git
cd homesphere-server
npm install
```

Create a `.env` file and add the required backend environment variables.

Run the backend:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

## Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run start
npm run lint
```

### Backend

```bash
npm run dev
npm run build
npm run start
```

## Demo Credentials

### Demo User

```text
Email: demo@homesphere.com
Password: Demo1234
Role: Tenant
```

### Property Holder

```text
Email: YOUR_PROPERTY_HOLDER_EMAIL
Password: YOUR_PROPERTY_HOLDER_PASSWORD
Role: Property Holder
```

### Admin

```text
Email: YOUR_ADMIN_EMAIL
Password: YOUR_ADMIN_PASSWORD
Role: Admin
```

Replace the placeholder credentials before submitting the project.

## Responsive Design

HomeSphere is designed for:

* Mobile devices
* Tablets
* Laptops
* Desktop screens

The navigation, property cards, dashboards, forms, filters, charts, and additional pages adjust according to the screen size.

## Security Considerations

* Protected API routes require a valid JWT.
* User IDs are collected from authenticated sessions.
* Property creation requires authentication.
* Property update and delete operations should verify ownership.
* Role-based pages should redirect unauthorized users.
* Secret keys are stored in environment variables.
* Passwords are managed securely through Better Auth.
* JWT tokens have an expiration time.

## Deployment

The recommended deployment platforms are:

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas
* Image hosting: Cloudinary

Before deployment:

1. Replace all localhost API URLs with environment variables.
2. Add the production frontend URL to backend CORS.
3. Add all environment variables to Vercel and Render.
4. Run frontend and backend production builds.
5. Test registration, login, property CRUD, filtering, dashboards, and logout.
6. Add the final live URLs to this README.

## Future Improvements

Possible future improvements include:

* Real-time messaging between tenants and property holders
* Online rent payment
* Booking and viewing schedules
* Email notifications
* Advanced admin analytics
* Property approval workflow
* Map-based property search
* Review moderation
* Recently viewed properties
* Personalized property recommendations

## Author

Developed by **Asma Munni**

* Frontend Repository: https://github.com/Asma-Munni/homesphere-client
* Backend Repository: https://github.com/Asma-Munni/homesphere-server

## License

This project was developed for educational and assignment purposes.
