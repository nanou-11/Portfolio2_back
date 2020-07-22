const mailer = require("nodemailer");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const smtpTransport = mailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASS,
      },
    });
    const mail = await smtpTransport.verify();

    await smtpTransport.sendMail({
      from: `${name} ${email}`,
      to: '"Anais" <anais.jouaret@gmail.com>',
      subject: subject,
      text: message,
      html: `<h3>Vous avez reçu un message de ${name} (${email}) de votre portfolio :</h3>
      <p>${subject}</p>
      <p>${message}</p>`,
    });
    res.status(200).json({ mail });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
