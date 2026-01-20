# 🚀 Deployment Guide: Smart QR Restaurant App

This guide will help you deploy your application to the web so anyone can access it!

We will use:
1.  **MongoDB Atlas** for the Database (Cloud Storage).
2.  **GitHub** for hosting your code.
3.  **Render** for the Backend (API).
4.  **Vercel** for the Frontend (User Interface).

---

## 📦 Step 1: Push Code to GitHub

1.  Create a **New Repository** on GitHub (e.g., `smart-qr-app`).
2.  Open your project folder in VS Code.
3.  Open the terminal and run:
    ```bash
    git init
    git add .
    git commit -m "Initial commit for deployment"
    git branch -M main
    git remote add origin https://github.com/ganireddyumesh/Smart-Qr-App.git
    git push -u origin main
    ```
    *(Replace `YOUR_USERNAME` with your actual GitHub username)*

---

## 🗄️ Step 2: Setup Database (MongoDB Atlas)

1.  Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database) and sign up/login.
2.  Create a **New Cluster** (Free Tier is fine).
3.  Go to **Database Access** -> Add New Database User (Username: `admin`, Password: `your_secure_password`).
4.  Go to **Network Access** -> Add IP Address -> Allow Access from Anywhere (`0.0.0.0/0`).
5.  Go to **Database** -> Click **Connect** -> Choose **Drivers** (Node.js).
6.  **Copy the Connection String**. It looks like:
    `mongodb+srv://admin:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`
7.  Replace `<password>` with your actual password. **Keep this safe!**

---

## ⚙️ Step 3: Deploy Backend (Render)

1.  Go to [Render.com](https://render.com/) and sign up with GitHub.
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository (`smart-qr-app`).
4.  **Important Settings**:
    *   **Root Directory**: `backend` (This is very important!)
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
    *   **Environment Variables** (Add these):
        *   `MONGO_URI`: The connection string you copied from MongoDB Atlas.
        *   `PORT`: `10000` (Render acts weird if you don't set this sometimes, but our code handles it).
5.  Click **Create Web Service**.
6.  Wait for deployment to finish. Render will give you a URL (e.g., `https://smart-qr-backend.onrender.com`).
    *   **Copy this URL.** You need it for the frontend.

---

## 🎨 Step 4: Deploy Frontend (Vercel)

1.  Go to [Vercel.com](https://vercel.com/) and sign up with GitHub.
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository (`smart-qr-app`).
4.  **Important Settings**:
    *   **Root Directory**: Click "Edit" and select `frontend`.
    *   **Environment Variables**:
        *   Name: `NEXT_PUBLIC_API_URL`
        *   Value: Your Render Backend URL + `/api` (e.g., `https://smart-qr-backend.onrender.com/api`)
        *   *Note: Make sure to add `/api` at the end!*
5.  Click **Deploy**.
6.  Wait for the confetti! 🎉

---

## ✅ Deployment Checklist

- [ ] **Database**: MongoDB Atlas Cluster created & Network Access allowed.
- [ ] **Backend**: Deployed on Render with `MONGO_URI` set.
- [ ] **Frontend**: Deployed on Vercel with `NEXT_PUBLIC_API_URL` set to the backend URL.
- [ ] **Verification**: Open the Vercel link on your phone. Can you see images? Can you order?

**Troubleshooting:**
*   **Images not loading?** Check if `menuSeed.js` URLs work publicly.
*   **"Network Error"?** Check your `NEXT_PUBLIC_API_URL` variable in Vercel. It must have `https://` and end with `/api`.
