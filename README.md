## 💸 FarmLink API

## Introduction

SpendWy$e is a RESTful API built with **Node.js**, **Express.js**, and **MongoDB** that allows users to securely track their expenses. It features user authentication using **JWT**, secure password handling, and basic **CRUD** operations for managing transactions.

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Contributors](#-contributors)
- [License](#-license)

## 🚀 Features

- ✅ User Registration & Login (JWT-based authentication)
- 🔐 Protected Routes for authenticated users
- 📊 Full CRUD Operations on Expenses
- 🔁 Forgot Password and Reset Password (via Nodemailer)
- 🔄 Token-based Session Management
- 📦 RESTful API Architecture

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
│   └── dbConfig.js
│ 
├── controllers/
│   ├── brandsController.js
│   ├── categoriesController.js
│   ├── colorsController.js
│   ├── couponsController.js
|   ├── orderController.js
|   ├── productsController.js
|   ├── reviewsController.js
│   └── usersController.js
├── middleware/
|   ├── globalErrHandler.js
|   ├── isAdmin.js
|   ├── isFarmer.js
│   └── isLoggedIn.js
│ 
├── models/
│   ├── Brand.js
│   ├── Category.js
│   ├── Color.js
│   ├── Coupon.js
│   ├── Order.js
│   ├── Product.js
│   ├── Review.js
│   └── User.js
│ 
├── routes/
│   ├── brandsRoute.js
│   ├── categoriesRoute.js
│   ├── colorsRoute.js
│   ├── couponsRoute.js
│   ├── ordersRoute.js
│   ├── productsRoute.js
│   ├── reviewsRoute.js
│   └── usersRoute.js
│ 
├── services/
│   ├──
│   └──
│ 
├── utils/
│   ├──
│   ├──
│   └──
│ 
├── .env
├── .gitignore
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Installation

```bash
git clone https://github.com/brightBediako/farmlink-api.git
cd spendWy$e
npm install
```

---

## 🧾 Environment Variables

Create a `.env` file in the root directory with the following:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

---

## ▶️ Running the App

```bash
node index.js
# or with nodemon for development
nodemon index.js
```

---

## API Documentation

#### 🔐 Authentication Flow

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST   | ``       |             |
| PUT    | ``       |             |
| PATCH  | ``       |             |
| DELETE | ``       |             |
| GET    | ``       |             |

---

### Product Management

> All routes require the header:  
> `Authorization: Bearer <token>`

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST   | ``       |             |
| PUT    | ``       |             |
| PATCH  | ``       |             |
| DELETE | ``       |             |
| GET    | ``       |             |

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

![Postman Test](public/image.png)

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

## Contributors

[Bright Bediako](bright.bediako.dev@gmail.com)

---
