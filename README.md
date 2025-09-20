# Fake Instagram – Main Repository

This repository contains the source code for a student project called **Fake Instagram**, developed as part of a university course.  
The project simulates a simplified social media platform, with two different implementations for the frontend:  
1. A traditional **ASP.NET Core MVC** solution (in the `API/` folder).  
2. A modern **React** frontend (in the `sub2/` folder), connected to the same backend.  

---

## 📂 Repository Structure
FakeInstagram-main/
│
├── API/ # Full ASP.NET Core MVC application
│ # Includes backend (C# API + database) and MVC-based frontend
│
└── sub2/ # React frontend
# Uses the same backend from API/

---

## 🔧 How it works
- The **API/** project contains the backend (controllers, models, database context) and also the original frontend implemented with MVC views.  
- The **sub2/** project is a separate React application that connects to the backend in `API/`. It replaces the MVC frontend with a more modern, dynamic interface.  

---

## 🔗 Project Documentation
Both the `API/` and `sub2/` folders include their own `README.md` files with setup and usage instructions.  

---

## 🎯 Purpose
The project was created to explore **fullstack development**:  
- Building a backend with ASP.NET Core MVC  
- Implementing a frontend in two different ways: first with MVC views, then with React  
- Learning how to connect a React application to an existing backend API  
