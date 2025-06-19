# 💸 FarmLink API

## Introduction

FarmLink is a full-service eCommerce platform for farmers. It provides a managed agricultural marketplace where farmers can register, post their farm products, and receive orders from consumers.

---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Documentation](#api-documentation)
- [Email Functionality](#email-functionality)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contributors](#contributors)

---

## 🚀 Features

- ✅ User Registration & Login (JWT-based authentication)
- 🔐 Protected Routes for authenticated users
- 📊 Full CRUD Operations on Products, Orders, Categories, Vendors, and more
- 🔁 Forgot Password and Reset Password (via Nodemailer)
- 🔄 Token-based Session Management
- 📦 RESTful API Architecture

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Email Service**: Nodemailer
- **Payment Gateway**: Stripe, PayStack
- **File Storage**: Cloudinary
- **Security**: Helmet, CORS, Rate Limiter
- **Environment Variables**: dotenv
- **Testing**: Jest / Mocha
- **Documentation**: Swagger / Postman

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
│   ├── isAdmin.js
│   └── isLoggedIn.js
├── models/
│   ├── Category.js
│   ├── Color.js
│   ├── Coupon.js
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
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
```

---

## ▶️ Running the App

```bash
node server.js
# or with nodemon for development
nodemon server.js
```

---

## API Documentation

The API is documented using Postman.  
[FarmLink API Documentation](https://farmlink-api.onrender.com/)

### Example Endpoints

> All routes require the header:  
> `Authorization: Bearer <token>`

#### User Authentication

| Method | Endpoint               | Description       |
| ------ | ---------------------- | ----------------- |
| POST   | /api/v1/users/login    | User login        |
| POST   | /api/v1/users/register | User registration |

#### Product Management

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| GET    | /api/v1/products     | List all products  |
| POST   | /api/v1/products     | Create a product   |
| GET    | /api/v1/products/:id | Get product detail |
| PUT    | /api/v1/products/:id | Update a product   |
| DELETE | /api/v1/products/:id | Delete a product   |

#### Orders

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | /api/v1/orders | List all orders |
| POST   | /api/v1/orders | Create an order |

_...and more for categories, vendors, reviews, etc._

---

## 💌 Email Functionality

- Users can reset their password by receiving a secure reset link via email.
- Emails are sent using **Nodemailer** and your configured email provider.

---

## 🧪 Testing

Run unit and integration tests:

```bash
npm test
```

Run test coverage report:

```bash
npm run test:coverage
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
- [Oluwatobi Adelabu](mailto:adelabutobi@gmail.com)

---
