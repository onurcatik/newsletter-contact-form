const express = require("express");
const router = express.Router();
const Subscription = require("../models/Subscription");
const sendEmail = require("../utils/sendEmail");

// POST /send-newsletter
router.post("/send-newsletter", async (req, res) => {
  try {
    // Veritabanındaki tüm aboneleri al
    const subscribers = await Subscription.find();
    if (subscribers.length === 0) {
      return res.status(400).json({ message: "No subscribers found." });
    }

    const emailList = subscribers.map(subscriber => subscriber.email);
    const subject = req.body.subject || "Newsletter Update";
    const message = req.body.message || "This is a test newsletter.";

    // Herkese e-posta gönder
    await sendEmail({
      to: emailList.join(","),
      subject: subject,
      html: `<p>${message}</p>`,
    });

    res.status(200).json({ message: "Newsletter sent successfully!" });
  } catch (error) {
    console.error("Error sending newsletter:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
