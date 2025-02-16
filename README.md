# Newsletter and Contact Form Full-Stack Application

This is a simple full-stack application built with a **React frontend** and a **Node.js backend**. It allows users to subscribe to a newsletter and send contact messages. The backend stores data in a **MongoDB** database and sends email notifications using **Nodemailer**.

---

## **Features**

### Frontend
- **Subscription Form**: Users can enter their email to subscribe to a newsletter.
- **Contact Form**: Users can enter their name, email, and message to send a contact request.

### Backend
- **/subscribe**: Stores email addresses in a MongoDB database. Returns an error if the email is already subscribed.
- **/contact**: Stores contact messages in a MongoDB database and sends an email notification to the administrator.

---

## **Tech Stack**

### Frontend
- React
- Axios (for API requests)
- Basic CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose for database modeling)
- Nodemailer (for sending email notifications)
- CORS (for enabling communication between frontend and backend)

---

## **Prerequisites**

Before running the application, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- A Gmail account (for Nodemailer)

---

## **Setup and Installation**

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/newsletter-app.git
cd newsletter-app
```

### Step 2: Set Up the Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/newsletter_app
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   ADMIN_EMAIL=admin-email@gmail.com
   ```

4. Start the backend server:
   ```bash
   node server.js
   ```

   The backend will run on `http://localhost:5000`.

---

### Step 3: Set Up the Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`.

---

## **Project Structure**

### Backend
```
backend/
├── .env
├── server.js
├── models/
│   ├── Subscription.js
│   └── Contact.js
├── routes/
│   ├── subscriptionRoutes.js
│   └── contactRoutes.js
|   └── emailRoutes.js
└── templates
|   └──template.html
└── utils/
    └── sendEmail.js
```

### Frontend
```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── SubscriptionForm.js
│   │   └── ContactForm.js
|       └── Navbar.js
|       └──AdminDashboard.js 
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

---

## **How It Works**

### Backend
1. **MongoDB Connection**: The backend connects to a MongoDB database using the `MONGODB_URI` environment variable.
2. **Subscription Endpoint**:
   - Accepts a POST request with an email address.
   - Checks if the email already exists in the database.
   - Stores the email if it is unique.
3. **Contact Endpoint**:
   - Accepts a POST request with a name, email, and message.
   - Stores the message in the database.
   - Sends an email notification to the administrator using Nodemailer.

### Frontend
1. **Subscription Form**:
   - Users enter their email and submit the form.
   - The email is sent to the `/subscribe` endpoint using Axios.
   - Success or error messages are displayed based on the response.
2. **Contact Form**:
   - Users enter their name, email, and message and submit the form.
   - The data is sent to the `/contact` endpoint using Axios.
   - Success or error messages are displayed based on the response.

---

## **Testing the Application**

1. Open the React app in your browser at `http://localhost:3000`.
2. Test the **Subscription Form**:
   - Enter a valid email address and submit the form.
   - If the email is already subscribed, an error message will be displayed.
3. Test the **Contact Form**:
   - Enter your name, email, and a message, then submit the form.
   - Verify that the message is stored in the database and that the admin receives an email notification.

---

## **Environment Variables**

### Backend
- `MONGODB_URI`: MongoDB connection URI.
- `EMAIL_USER`: Gmail address for Nodemailer.
- `EMAIL_PASS`: Gmail app password for Nodemailer.
- `ADMIN_EMAIL`: Email address to receive contact form notifications.

---

## **Dependencies**

### Backend
- `express`: Web framework for Node.js.
- `mongoose`: MongoDB object modeling.
- `cors`: Middleware for enabling CORS.
- `dotenv`: Loads environment variables from a `.env` file.
- `nodemailer`: Sends email notifications.

### Frontend
- `axios`: Handles HTTP requests to the backend.
- `react`: Frontend library for building user interfaces.
