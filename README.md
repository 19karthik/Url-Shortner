# URL Shortener Application

A URL Shortener application built with Node.js, Express.js, MongoDB, and JWT authentication. The application allows users to create and manage shortened URLs, track URL usage, and provides administrative capabilities for managing users and platform statistics.

## Features

### Authentication & Authorization

* User Registration
* User Login
* User Logout
* JWT-based Authentication
* Refresh Token Support
* Password Hashing using bcrypt
* Role-Based Access Control (User/Admin)

### URL Shortening

* Generate Short URLs
* Custom Alias Support
* URL Validation
* Link Expiration
* Enable/Disable URLs
* Update Existing URLs
* Delete URLs

### URL Management

* View All User URLs
* Search URLs
* Filter URLs
* Manage URL Status

### Analytics

* Total Click Tracking
* Today's Clicks
* Last 7 Days Clicks
* Last 30 Days Clicks
* Clicks Per Day Statistics
* Top Performing URLs

### Admin Features

* View Users
* Ban/Unban Users
* Delete Users
* View Global Analytics
* View Total URLs
* Monitor Platform Activity

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* bcrypt

### Additional Packages

* cookie-parser
* cors
* dotenv

---

## Project Structure

```text
project-root/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.js
│
├── server.js
├── .env
├── package.json
└── README.md
```

## API Modules

### Auth Module

Handles:

* Registration
* Login
* Logout
* Token Validation

### URL Module

Handles:

* Create Short URL
* Update URL
* Delete URL
* Enable/Disable URL
* Retrieve User URLs

### Analytics Module

Handles:

* Click Tracking
* Daily Statistics
* Top Performing URLs
* User Analytics

### Admin Module

Handles:

* User Management
* Platform Analytics
* URL Statistics

### Redirect Module

Handles:

* Short URL Resolution
* URL Redirection
* Click Recording
* Expiration Validation

---

## Security Features

* Password Hashing using bcrypt
* JWT Authentication
* Protected Routes
* Role-Based Authorization
* Input Validation
* CORS Configuration
* Secure Cookie Support

---
