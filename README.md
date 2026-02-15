# 📚 BookCourier

BookCourier is a full-stack role-based book management and ordering platform.  
It allows users to browse and order books, librarians to manage book listings, and administrators to control users and book publishing.

---

## 🌐 Live Website

🔗 Live URL: https://librago-app.web.app

---

## 🎯 Project Purpose

The purpose of this project is to:

- Implement role-based authentication and authorization
- Practice protected routing in React
- Build a dashboard system with multiple roles
- Manage relational data (Books & Orders)
- Apply full-stack development concepts using MERN stack

---

## 👥 User Roles & Features

### 👤 User
- Register & Login
- Browse all books
- View book details
- Place orders
- View personal order history
- View invoice

---

### 📚 Librarian
- Add new books
- Edit books
- View own added books
- Manage book listings

---

### 👑 Admin
- View all users
- Manage all books
- Publish / Unpublish books
- Delete books (automatically deletes related orders)
- Access control for dashboard routes

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Private routes for logged-in users
- Role-based route protection (AdminRoute)
- Forbidden page for unauthorized access

---

## 🛠️ Technologies Used

### Frontend
- React
- React Router
- Tailwind CSS
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- JWT (jsonwebtoken)
- dotenv
- cors

---

## 📦 NPM Packages Used

### Frontend
