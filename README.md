# 🍽️ CulinaFlow – AI-Powered Recipe & Pantry Management Platform  

An AI-powered cooking assistant platform that helps users manage pantry ingredients, generate recipes using AI, and organize their cooking experience efficiently.

---

## 🚀 Features  

### 1️⃣ User Authentication  

Secure login and signup system.  

The system provides:  

* JWT-based authentication  
* Password hashing using bcryptjs  
* Protected routes  
* User session management  

---

### 2️⃣ Pantry Management  

Users can manage their kitchen ingredients easily.  

Features include:  

* Add, update, and delete pantry items  
* Track ingredient quantity  
* Expiry date alerts  
* Low-stock warnings  

---

### 3️⃣ AI Recipe Generation  

Users can generate recipes using AI based on available pantry items.  

The system provides:  

* AI-powered recipe generation using Google Gemini 2.5 Flash  
* Recipes based on available ingredients  
* Dietary filters:  
  * Vegetarian  
  * Vegan  
  * Keto  
  * Paleo  
  * Gluten-Free  

Recipe details include:  

* Ingredients list  
* Step-by-step cooking instructions  
* Nutrition information  
* AI cooking tips  
* Save recipe option  

---

### 4️⃣ Recipe Collection  

Users can manage and explore saved recipes.  

Features include:  

* Save recipes for future use  
* Search recipes  
* Filter by:  
  * Cuisine  
  * Difficulty level  

---

### 5️⃣ PostgreSQL Database  

Efficient and structured data storage.  

The system uses:  

* Normalized relational schema  
* Hosted on Neon  
* Tables for users, pantry, and recipes  

---

### 6️⃣ Responsive UI  

Modern and user-friendly interface.  

Features include:  

* Built with Tailwind CSS v4  
* Fully responsive design  
* Clean and modern UI  

---

## 🛠 Tech Stack  

Frontend  

* React.js  
* Tailwind CSS v4  
* React Router  
* Axios  

Backend  

* Node.js  
* Express.js  
* JWT Authentication  
* bcryptjs  

Database  

* PostgreSQL (NeonDB)  

AI Integration  

* Google Gemini 2.5 Flash API  

---

## ⚙️ Installation  

Clone the repository  

git clone https://github.com/your-username/culinaflow.git  

Navigate to project  

cd culinaflow  

Install dependencies  

npm install  

Run the development server  

npm run dev  

---

## 🔑 Environment Variables  

Create a `.env` file and add:  

GEMINI_API_KEY=your_api_key  
DATABASE_URL=your_neondb_url  
JWT_SECRET=your_secret_key  
PORT=5000  

---

## 📊 Future Improvements  

* Meal planning system  
* Grocery list generation  
* Recipe sharing feature  
* Voice-based cooking assistant  
