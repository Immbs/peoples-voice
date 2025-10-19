// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.add('hidden');
  });
});

// Scroll Effect for Nav
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('nav-scrolled');
  } else {
    navbar.classList.remove('nav-scrolled');
  }
});

// Form Submissions (ব্যাকএন্ড ইন্টিগ্রেশন – Fetch API দিয়ে)
document.getElementById('report-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  try {
    const response = await fetch('http://localhost:3000/api/submit-report', {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      alert('রিপোর্ট সাবমিট হয়েছে!');
      e.target.reset();
    } else {
      alert('ত্রুটি: আবার চেষ্টা করুন।');
    }
  } catch (error) {
    alert('নেটওয়ার্ক ত্রুটি।');
  }
});

document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      alert('মেসেজ পাঠানো হয়েছে!');
      e.target.reset();
    } else {
      alert('ত্রুটি: আবার চেষ্টা করুন।');
    }
  } catch (error) {
    alert('নেটওয়ার্ক ত্রুটি।');
  }
});

// Donation Schema
const donationSchema = new mongoose.Schema({
  amount: Number,
  recurring: Boolean,
  method: String,
  name: String,
  timestamp: { type: Date, default: Date.now }
});
const Donation = mongoose.model('Donation', donationSchema);

// API for donation
app.post('/api/donate', async (req, res) => {
  const { amount, recurring, method, name } = req.body;
  const newDonation = new Donation({ amount, recurring, method, name });
  await newDonation.save();

  // Placeholder for payment gateway integration
  if (method === 'bkash') {
    // Use bkash-payment-gateway library
    // Example: const bkash = require('bkash-payment-gateway');
    // await bkash.createPayment({ amount, ... });
    console.log('bKash payment initiated');
  } else if (method === 'nagad') {
    // Use nagad-payment-gateway library
    // Example: const nagad = require('nagad-payment-gateway');
    // await nagad.initiate({ amount, ... });
    console.log('Nagad payment initiated');
  }

  res.send('Donation processed successfully! Thank you for your support.');
});