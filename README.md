# 💸 MoneyMate(Personal Finance Management App)

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing personal finances with secure authentication, real-time charts, and AI-powered insights.

## 🚀 Features

### ✅ Core Features

* **User Authentication**: JWT-based login/signup with role-based access (User/Admin).
* **Dashboard**: Overview of total balance, income, and expenses with responsive UI.
* **Transaction Module**:

  * Add/Edit/Delete Income and Expenses.
  * Filter and categorize entries.
* **Data Visualization**:

  * MUI charts for interactive financial overview.
  * Recent transaction history.
* **AI Insights**:

  * Get personalized financial advice using Groq.

## 🛡️ Security

* Password hashing with bcrypt
* Helmet for secure HTTP headers
* CORS and XSS/CSRF protection

## 📦 Tech Stack

* **Frontend**: React, MUI, Redux
* **Backend**: Node.js, Express.js, MongoDB
* **AI**: Groq for insights

## 📂 Folder Structure

```
backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── config/
├── index.js
frontend/
├── components/
├── pages/
├── redux/
├── App.jsx
```

## 🧪 Setup Instructions

```bash
# Clone repo
git clone https://github.com/saiteja218/MoneyMate

# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

## 🌐 Environment Variables

Create `.env` files for backend:

### Backend

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_ai_key
NODE_ENV=development
```

### Frontend

```
VITE_API_BASE_URL=http://localhost:5000/api/
```

## 🧠 AI Integration (Optional)

* Used for generating personalized savings tips and insights.
* Replace `GROQ_API_KEY` with your actual key from Groq.

## 🔗 Deployment

[MoneyMate.](https://moneymate-s4x1.onrender.com)


## 🙌 Contributions

PRs are welcome. Please open issues for any bugs or feature requests.

---

Made with ❤️ by Sai Teja
