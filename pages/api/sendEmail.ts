import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure:  true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      fullName,
      phoneNumber,
      email,
      patientType,
      treatment,
      insurance,
      location,
      message,
    } = req.body;

    const mailOptions = {
      from: email,
      to: 'mishraadi733@gmail.com', // Replace with your email
      subject: 'New Appointment Request',
      html: `
      <h1>New Appointment Request</h1>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Phone:</strong> ${phoneNumber}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Patient Type:</strong> ${patientType}</p>
      <p><strong>Treatment:</strong> ${treatment}</p>
      <p><strong>Insurance:</strong> ${insurance}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ error });

    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
