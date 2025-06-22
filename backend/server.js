const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
const PORT = process.env.PORT || 3000;



app.use(cors());

app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    const {
      senderName,
      senderEmail,
      recipients,
      subject,
      content,
      isHtml,
      appPassword,
      service,
    } = req.body;

    const transporter = nodemailer.createTransport({
      service,
      auth: {
        user: senderEmail,
        pass: appPassword,
      },
    });

    const mailOptions = {
      from: `"${senderName}" <${senderEmail}>`,
      to: Array.isArray(recipients) ? recipients[0] : recipients,
      ...(Array.isArray(recipients) && recipients.length > 1
        ? { bcc: recipients.slice(1).join(", ") }
        : {}),
      subject,
      [isHtml ? "html" : "text"]: content,
    };

    const info = await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "تم إرسال البريد بنجاح",
      info: info.messageId,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "فشل إرسال البريد",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
