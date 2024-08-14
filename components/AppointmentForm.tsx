"use client";

import React, { useState } from 'react';
import { AppointmentInput } from '../types/graphql';

const AppointmentForm = () => {
  const [formData, setFormData] = useState<AppointmentInput>({
    fullName: '',
    phoneNumber: '',
    email: '',
    patientType: '',
    treatment: '',
    insurance: '',
    location: '',
    message: '',
    termsAccepted: false,
    newsletterSubscribed: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.phoneNumber ) {
      return 'Please fill in all required fields.';
    }
    if (!formData.termsAccepted) {
      return 'You must accept the Terms of Use.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return 'Please enter a valid email address.';
    }
    if (!/^\+?[1-9]\d{1,14}$/.test(formData.phoneNumber)) {
      return 'Please enter a valid phone number.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Appointment request sent successfully!');
        setFormData({
          fullName: '',
          phoneNumber: '',
          email: '',
          patientType: '',
          treatment: '',
          insurance: '',
          location: '',
          message: '',
          termsAccepted: false,
          newsletterSubscribed: false,
        });
      } else {
        throw new Error(result.error || 'Failed to send email');
      }
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-24 bg-bgtop'>
      <form onSubmit={handleSubmit} className="w-full max-w-full bg-bgbottom p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg font-nunito">
        <h2 className='text-center text-2xl sm:text-3xl md:text-4xl uppercase font-playfair mb-6 sm:mb-8 lg:mb-10'>Book an Appointment</h2>
        
        <div className="flex flex-wrap mb-4 sm:mb-6 -mx-2 sm:-mx-3">
          <div className="w-full sm:w-1/2 px-2 sm:px-3 mb-4 sm:mb-0">
            <input
              className="block w-full rounded-lg py-2 sm:py-3 px-3 sm:px-4 leading-tight input focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
            />
          </div>
          <div className="w-full sm:w-1/2 px-2 sm:px-3">
            <input
              className="block w-full rounded-lg py-2 sm:py-3 px-3 sm:px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
            />
          </div>
        </div>

        <div className="flex flex-wrap mb-4 sm:mb-6 -mx-2 sm:-mx-3">
          <div className="w-full sm:w-1/3 px-2 sm:px-3 mb-4 sm:mb-0">
            <input
              className="block w-full rounded-lg py-2 sm:py-3 px-3 sm:px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Id"
            />
          </div>
          <div className="w-full sm:w-1/3 px-2 sm:px-3 mb-4 sm:mb-0">
            <input
              className="block w-full rounded-lg py-2 sm:py-3 px-3 sm:px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              name="patientType"
              value={formData.patientType}
              onChange={handleInputChange}
              placeholder="Patient Type"
            />
          </div>
          <div className="w-full sm:w-1/3 px-2 sm:px-3">
            <input
              className="block w-full rounded-lg py-2 sm:py-3 px-3 sm:px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              name="treatment"
              value={formData.treatment}
              onChange={handleInputChange}
              placeholder="Treatment"
            />
          </div>
        </div>

        <div className="flex flex-wrap mb-4 sm:mb-6 -mx-2 sm:-mx-3">
          <div className="w-full sm:w-1/2 px-2 sm:px-3 mb-4 sm:mb-0">
            <select
              className="block w-full rounded-lg py-2 sm:py-3 px-3 sm:px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
              name="insurance"
              value={formData.insurance}
              onChange={handleInputChange}
            >
              <option value="">Insurance</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>
          <div className="w-full sm:w-1/2 px-2 sm:px-3">
            <select
              className="block w-full rounded-lg py-2 sm:py-3 px-3 sm:px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            >
              <option value="">Location</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap mb-4 sm:mb-6 -mx-2 sm:-mx-3">
          <div className="w-full px-2 sm:px-3">
            <textarea
              className="block w-full rounded-lg py-2 sm:py-3 px-3 sm:px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your message"
            ></textarea>
          </div>
        </div>

        <div className="flex flex-wrap mb-4 sm:mb-6 -mx-2 sm:-mx-3">
          <div className="w-full px-2 sm:px-3 mb-2 sm:mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 rounded-lg text-primary focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-sm sm:text-base text-gray-700">I acknowledge and accept the Terms of Use</span>
            </label>
          </div>
          <div className="w-full px-2 sm:px-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="newsletterSubscribed"
                checked={formData.newsletterSubscribed}
                onChange={handleInputChange}
                className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 rounded-lg text-primary focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-sm sm:text-base text-gray-700">I want to subscribe for a newsletter</span>
            </label>
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            type="submit"
            disabled={loading}
            className='px-6 sm:px-8 py-2 sm:py-3 text-lg sm:text-xl font-nunito text-[#F7F6F3] bg-primary rounded-lg shadow-xl w-full sm:w-auto disabled:opacity-50'
          >
            {loading ? 'SUBMITTING...' : 'REQUEST CALLBACK'}
          </button>
        </div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </form>
    </div>
  )
}

export default AppointmentForm;
