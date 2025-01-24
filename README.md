# Blog Project Backend 🚀

Welcome to the backend of the Blog Project! This project is built using **TypeScript**, **Express**, **Mongoose**, and **MongoDB**. It provides the server-side functionalities for a robust and efficient blogging platform.

## Features ✨

- **Authentication and Authorization** 🔒: Secure user authentication and role-based access control using JWT.
- **User Features** 👤:
  - Users can create, update, and delete their own blog posts.
  - Admins can delete any user's blog posts and block users if necessary.
- **CRUD Operations** 📝: Complete CRUD functionalities for blog posts and comments.
- **Efficient Data Management** 📊: Powered by MongoDB and Mongoose for seamless data handling.
- **Scalable Architecture** 📈: Designed for scalability and maintainability using TypeScript and Express.
- **Error Handling** ⚠️: Centralized and customizable error-handling mechanism.

---

## Prerequisites 📋

Ensure you have the following installed on your system:

- **Node.js** (v16 or later) 🟢
- **npm** or **yarn** 📦
- **MongoDB**  🍃

---





## API Endpoints 🌐

### Authentication 🔑
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Log in an existing user

### Blog Posts ✍️
- **GET** `/api/blogs` - Get all blog posts
- **POST** `/api/blogs` - Create a new post (authenticated users only)

- **Patch** `/api/blogs/:id` - Update a post (authenticated users can only update their own posts)
- **DELETE** `/api/blogs/:id` - Delete a post (authenticated users can only delete their own posts, admins can delete any post)

### Admin Features 🛡️
- **DELETE** `/api/admin/blogs/:id` - Admin can delete any user’s blog post
- **block USer(PATCH)** `api/admin/users/:userId/block` - Admin can block a user



## Technologies Used 🛠️

- **Language**: TypeScript 💻
- **Framework**: Express.js ⚙️
- **Database**: MongoDB (with Mongoose ODM) 🍃
- **Authentication**: JWT 🔐
- **Tooling**: ESLint, Prettier 🧹


