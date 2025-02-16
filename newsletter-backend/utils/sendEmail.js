// const nodemailer = require('nodemailer');

// const sendEmail = async (options) => {
//   // Create a transporter using Gmail
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: options.to,
//     subject: options.subject,
//     html: options.html,
//   };

//   // Send the email
//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;


const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// ✅ getTemplatePath fonksiyonunu tanımla
const getTemplatePath = (templateName = "template") => {
  return path.join(__dirname, "..", "templates", `${templateName}.html`);
};

const sendEmail = async (options) => {
  try {
    console.log("📥 Sunucuya Gelen İstek:", options);

    if (!options.to || !/\S+@\S+\.\S+/.test(options.to)) {
      throw new Error("  Geçersiz veya eksik alıcı e-posta adresi!");
    }

    if (!process.env.EMAIL_USER) {
      throw new Error("  SMTP gönderici e-posta adresi tanımlanmamış! Lütfen .env dosyanızı kontrol edin.");
    }

    // ✅ `message` yerine `html` kullanımı destekleniyor
    const messageContent = options.message && options.message.trim() !== ""
      ? options.message
      : options.html && options.html.trim() !== ""
        ? options.html
        : null;

    if (!messageContent) {
      throw new Error("  Gönderilecek mesaj içeriği eksik!");
    }

    // ✅ Hata burada düzeltiliyor!
    const templatePath = getTemplatePath(options.template || "template");

    if (!fs.existsSync(templatePath)) {
      throw new Error(`  Email şablonu bulunamadı: ${templatePath}`);
    }

    let htmlTemplate = fs.readFileSync(templatePath, "utf-8")
      .replace("{{message}}", messageContent)
      .replace("{{subject}}", options.subject || "EcoCart Bildirim");

    console.log(" Şablona eklenen mesaj:", messageContent);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"EcoCart Support" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject || "EcoCart Bildirim",
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email başarıyla gönderildi: ${info.response}`);
    return info;
  } catch (error) {
    console.error(`  Hata oluştu: ${error.message}`);
    throw new Error(error.message);
  }
};

module.exports = sendEmail;
