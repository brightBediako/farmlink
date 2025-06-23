# 💸 FarmLink API

## Overview

FarmLink is a full-service eCommerce platform for farmers and consumers. It allows farmers (vendors) to register, post their farm products, and receive orders from consumers. The platform supports robust user roles, product management, order processing, and notification features.

---

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the App](#-running-the-app)
- [API Documentation](#api-documentation)
- [Email Functionality](#-email-functionality)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)
- [Contributors](#-contributors)

---

## 🚀 Features

- ✅ User Registration & Login (JWT-based authentication)
- 🔐 Protected Routes for authenticated users
- 📊 Full CRUD Operations on Products, Orders, Categories, Vendors, Coupons, Colors, Reviews, and more
- 🔁 Forgot Password and Reset Password (via Nodemailer)
- 🔄 Token-based Session Management
- 📦 RESTful API Architecture
- 📧 Email Verification and Notifications
- 🛒 Stripe Payment Integration
- ☁️ Image Uploads via Cloudinary

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Email Service**: Nodemailer
- **Payment Gateway**: Stripe
- **File Storage**: Cloudinary
- **Security**: CORS
- **Environment Variables**: dotenv
- **Testing**: Jest / Mocha (planned)

---

## 📁 Project Structure

```
farmlink-api/
├── app/
│   └── app.js
├── config/
│   ├── categoryUpload.js
│   ├── dbConnect.js
│   ├── fileUpload.js
│   └── vendorUpload.js
├── controllers/
│   ├── categoriesController.js
│   ├── colorsController.js
│   ├── couponsController.js
│   ├── ordersController.js
│   ├── productsController.js
│   ├── reviewsController.js
│   ├── usersController.js
│   └── vendorsController.js
├── middleware/
│   ├── globalErrHandler.js
│   ├── isAccountVerified.js
│   ├── isAdmin.js
│   ├── isBlocked.js
│   └── isLoggedIn.js
├── models/
│   ├── Category.js
│   ├── Color.js
│   ├── Coupon.js
│   ├── Notification.js
│   ├── Order.js
│   ├── Product.js
│   ├── Review.js
│   ├── User.js
│   └── Vendor.js
├── routes/
│   ├── categoriesRoute.js
│   ├── colorsRoute.js
│   ├── couponsRoute.js
│   ├── ordersRoute.js
│   ├── productsRoute.js
│   ├── reviewsRoute.js
│   ├── usersRoute.js
│   └── vendorsRoute.js
├── services/
│   ├── sendAccountVerificationEmail.js
│   ├── sendOrderNotification.js
│   ├── sendPasswordEmail.js
│   ├── sendProductNotification.js
│   ├── sendRegisterNotification.js
│   └── sendVendorNotification.js
├── utils/
│   ├── generateToken.js
│   ├── getTokenFromHeader.js
│   └── verifyToken.js
├── public/
│   └── index.html
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Installation

```bash
git clone https://github.com/brightBediako/farmlink-api.git
cd farmlink-api
npm install
```

---

## 🧾 Environment Variables

Create a `.env` file in the root directory with the following (add any other required variables as needed):

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_KEY=your_stripe_secret_key
```

---

## ▶️ Running the App

```bash
node server.js
# or with nodemon for development
npm run server
```

---

## API Documentation

The API is documented using Postman and the public HTML documentation in `public/index.html`.

### Main Endpoints

> All protected routes require the header:  
> `Authorization: Bearer <token>`

#### Users

| Method | Endpoint                                        | Description                   |
| ------ | ----------------------------------------------- | ----------------------------- |
| POST   | /api/v1/users/register                          | Register a new user           |
| POST   | /api/v1/users/login                             | User login                    |
| GET    | /api/v1/users/profile                           | Get user profile              |
| PUT    | /api/v1/users/profile/:id                       | Update user profile           |
| PUT    | /api/v1/users/update/shipping                   | Update shipping address       |
| GET    | /api/v1/users                                   | Get all users (admin)         |
| DELETE | /api/v1/users/profile/:id                       | Delete user (admin)           |
| PUT    | /api/v1/users/block/:userId                     | Block user (admin)            |
| PUT    | /api/v1/users/unblock/:userId                   | Unblock user (admin)          |
| POST   | /api/v1/users/verify-email                      | Send email verification token |
| POST   | /api/v1/users/verify-email/:verifyToken         | Verify email account          |
| POST   | /api/v1/users/forgot-password                   | Send password reset token     |
| POST   | /api/v1/users/verify-password-reset/:resetToken | Reset password                |

#### Products

| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| GET    | /api/v1/products     | List all products (with filters) |
| POST   | /api/v1/products     | Create a product (with images)   |
| GET    | /api/v1/products/:id | Get product detail               |
| PUT    | /api/v1/products/:id | Update a product                 |
| DELETE | /api/v1/products/:id | Delete a product                 |

#### Categories

| Method | Endpoint               | Description                    |
| ------ | ---------------------- | ------------------------------ |
| GET    | /api/v1/categories     | List all categories            |
| POST   | /api/v1/categories     | Create a category (with image) |
| GET    | /api/v1/categories/:id | Get category detail            |
| PUT    | /api/v1/categories/:id | Update a category              |
| DELETE | /api/v1/categories/:id | Delete a category              |

#### Vendors

| Method | Endpoint               | Description                  |
| ------ | ---------------------- | ---------------------------- |
| POST   | /api/v1/vendors/become | Become a vendor (with image) |
| GET    | /api/v1/vendors        | List all vendors             |
| GET    | /api/v1/vendors/:id    | Get vendor detail            |
| PUT    | /api/v1/vendors/:id    | Update vendor profile        |
| DELETE | /api/v1/vendors/:id    | Delete vendor profile        |

#### Orders

| Method | Endpoint                  | Description                   |
| ------ | ------------------------- | ----------------------------- |
| GET    | /api/v1/orders            | List all orders (admin)       |
| POST   | /api/v1/orders            | Create an order (with Stripe) |
| GET    | /api/v1/orders/:id        | Get order detail              |
| PUT    | /api/v1/orders/update/:id | Update order status (admin)   |
| GET    | /api/v1/orders/sales/sum  | Get order sales statistics    |

#### Coupons

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| GET    | /api/v1/coupons     | List all coupons  |
| POST   | /api/v1/coupons     | Create a coupon   |
| GET    | /api/v1/coupons/:id | Get coupon detail |
| PUT    | /api/v1/coupons/:id | Update a coupon   |
| DELETE | /api/v1/coupons/:id | Delete a coupon   |

#### Colors

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| GET    | /api/v1/colors     | List all colors  |
| POST   | /api/v1/colors     | Create a color   |
| GET    | /api/v1/colors/:id | Get color detail |
| PUT    | /api/v1/colors/:id | Update a color   |
| DELETE | /api/v1/colors/:id | Delete a color   |

#### Reviews

| Method | Endpoint                   | Description                   |
| ------ | -------------------------- | ----------------------------- |
| GET    | /api/v1/reviews            | List all reviews              |
| POST   | /api/v1/reviews/:productID | Create a review for a product |
| DELETE | /api/v1/reviews/:id        | Delete a review               |

---

## 🧩 Middleware

- `globalErrHandler.js` – Global error handler for API responses
- `notFound` – 404 handler for undefined routes
- `isLoggedIn.js` – Auth middleware (JWT)
- `isAdmin.js` – Admin role check
- `isBlocked.js` – Blocked user check
- `isAccountVerified.js` – Email verification check

## ⚙️ Config Files

- `dbConnect.js` – MongoDB connection
- `categoryUpload.js`, `fileUpload.js`, `vendorUpload.js` – Multer/Cloudinary upload configs

## 🛠️ Services

- `sendAccountVerificationEmail.js` – Send account verification emails
- `sendOrderNotification.js` – Send order notification emails
- `sendPasswordEmail.js` – Send password reset emails
- `sendProductNotification.js` – Send product notification emails
- `sendRegisterNotification.js` – Send registration notification emails
- `sendVendorNotification.js` – Send vendor notification emails

## 🧰 Utilities

- `generateToken.js` – JWT token generation
- `getTokenFromHeader.js` – Extract JWT from request headers
- `verifyToken.js` – Verify JWT tokens

---

## 💌 Email Functionality

- Users can reset their password by receiving a secure reset link via email.
- Email verification and notifications for registration, orders, and vendor actions.
- Emails are sent using **Nodemailer** and your configured email provider.

---

## 🧪 Testing

Run unit and integration tests (if available):

```bash
npm test
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 👥 Contributors

- [Bright Bediako](mailto:bright.bediako.dev@gmail.com)
- [Lemik Manyore](mailto:lemik254@gmail.com)
- [Lekatoo Nangayai](mailto:Lakertoo5@gmail.com)
- [Oluwatobi Adelabu](mailto:adelabutobi@gmail.com)

---

## Registration Flow

### 1. Customer Registration

- Endpoint: `POST /api/v1/users/register`
- Fields: `fullname`, `email`, `phone`, `password`
- The user is created with the role `customer` by default.
- Email verification is required before the user can become a vendor or upload products.

### 2. Vendor Registration (Two-Step)

- After registering as a customer, the user can become a vendor.
- Endpoint: `POST /api/v1/vendors/become-vendor`
- Fields: `userId` (from registration), `farmName`, `country`, `location`, `phone`, and other vendor details.
- The vendor profile is created with status `pending` and must be verified by an admin before uploading products.
- Email verification is required before becoming a vendor.

---

## Product Upload Restrictions

- Only users with verified emails (`isEmailVerified: true`) can upload products.
- Vendors must have their vendor status set to `active` (approved by admin) to upload products.
- Admins can upload and manage all products.

---

## Order and Payment Flow

- Orders are created and processed via Stripe payments.
- After successful payment, the following notifications are sent:
  - **Customer:** Receives an email with order details (order number, payment status, payment method, total price, currency).
  - **Vendors:** Each vendor whose products are included in the order receives an email notification listing their products in the order and the order/payment details.

---

## Admin Controls

- Admins can approve or suspend vendors via `PUT /api/v1/vendors/status/:id`.
- Only vendors with `status: active` can upload products.
- Admins can view all products via `/api/v1/products/my-products`.

---

## API Endpoints (Key)

### Users

- `POST /api/v1/users/register` – Register a new user
- `POST /api/v1/users/login` – Login
- `POST /api/v1/users/verify-email/:verifyToken` – Verify email

### Vendors

- `POST /api/v1/vendors/become-vendor` – Become a vendor (after registering as a user)
- `PUT /api/v1/vendors/status/:id` – Admin: update vendor status

### Products

- `POST /api/v1/products/add-product` – Add a product (vendor/admin only, with restrictions)
- `GET /api/v1/products/my-products` – Get all products for the logged-in vendor or all products for admin

### Orders

- `POST /api/v1/orders` – Create an order
- `GET /api/v1/orders/:id` – Get order details

---

## Notifications

- Email notifications are sent for:
  - Registration
  - Vendor approval
  - Order confirmation (to customer)
  - Order notification (to vendors)

---

## Payment

- Stripe is used for payment processing.
- Webhook endpoint `/webhook` updates order status and triggers notifications after payment.

---

## Setup

- Configure environment variables for MongoDB, Stripe, and email (SMTP) in a `.env` file.
- Run `npm install` to install dependencies.
- Start the server with `npm start` or `npm run server` (for nodemon).

---
