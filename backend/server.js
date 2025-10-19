const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Connect to MongoDB (local or Atlas)
mongoose.connect('mongodb://localhost:27017/peoplesvoice', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Schemas
const reportSchema = new mongoose.Schema({
  name: String,
  district: String,
  description: String,
  evidence: String // Path to uploaded file
});
const contactSchema = new mongoose.Schema({
  email: String,
  message: String
});
const Report = mongoose.model('Report', reportSchema);
const Contact = mongoose.model('Contact', contactSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve frontend files

// API for report submission
app.post('/api/submit-report', async (req, res) => {
  const { name, district, description } = req.body;
  // Handle file upload here (use multer for evidence)
  const newReport = new Report({ name, district, description, evidence: 'path/to/file' });
  await newReport.save();
  res.send('Report submitted successfully!');
});

// API for contact
app.post('/api/contact', async (req, res) => {
  const { email, message } = req.body;
  const newContact = new Contact({ email, message });
  await newContact.save();

  // Optional: Send email notification
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password'
    }
  });
  let mailOptions = {
    from: email,
    to: 'bdpeoplescall@gmail.com',
    subject: 'New Contact Message',
    text: message
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log('Email sent: ' + info.response);
  });

  res.send('Message sent successfully!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});