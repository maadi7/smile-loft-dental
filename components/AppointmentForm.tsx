"use client";

import React, { useState, useEffect } from 'react';
import { AppointmentInput } from '../types/graphql';
import useTranslation from '../hooks/useTranslation';
import Loader from './Loader';
import toast, { Toaster } from "react-hot-toast";


const AppointmentForm = () => {
  const { translate, language } = useTranslation();
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
  const [translations, setTranslations] = useState<{
    heading: string;
    fullNamePlaceholder: string;
    phoneNumberPlaceholder: string;
    emailPlaceholder: string;
    patientTypePlaceholder: string;
    treatmentPlaceholder: string;
    insurance: string;
    location: string;
    messagePlaceholder: string;
    termsAccepted: string;
    newsletterSubscribed: string;
    submitButton: string;
    successMessage: string;
    failureMessage: string;
    unknownError: string;
  } | null>({
    heading: "REQUEST CALLBACK",
    fullNamePlaceholder: "Full Name",
    phoneNumberPlaceholder: "Phone Number",
    emailPlaceholder: "Email Id",
    patientTypePlaceholder: "Patient Type",
    treatmentPlaceholder: "Treatment",
    insurance: "Insurance",
    location: "Location",
    messagePlaceholder: "Your message",
    termsAccepted: "I acknowledge and accept the Terms of Use",
    newsletterSubscribed: "I want to subscribe to the newsletter",
    submitButton: "SUBMIT",
    successMessage: "Appointment request sent successfully!",
    failureMessage: "Failed to send email",
    unknownError: "An unknown error occurred",

  });

  useEffect(() => {
    const fetchTranslations = async () => {
      const translatedTexts = {
        heading: (await translate("REQUEST CALLBACK"))?.text || "REQUEST CALLBACK",
        fullNamePlaceholder: (await translate("Full Name"))?.text || "Full Name",
        phoneNumberPlaceholder: (await translate("Phone Number"))?.text || "Phone Number",
        emailPlaceholder: (await translate("Email Id"))?.text || "Email Id",
        patientTypePlaceholder: (await translate("Patient Type"))?.text || "Patient Type",
        treatmentPlaceholder: (await translate("Treatment"))?.text || "Treatment",
        insurance: (await translate("Insurance"))?.text || "Insurance",
        location: (await translate("Location"))?.text || "Location",
        messagePlaceholder: (await translate("Your message"))?.text || "Your message",
        termsAccepted: (await translate("I acknowledge and accept the Terms of Use"))?.text || "I acknowledge and accept the Terms of Use",
        newsletterSubscribed: (await translate("I want to subscribe to the newsletter"))?.text || "I want to subscribe to the newsletter",
        submitButton: (await translate("SUBMIT"))?.text || "SUBMIT",
        successMessage: (await translate("Appointment request sent successfully!"))?.text || "Appointment request sent successfully!",
        failureMessage: (await translate("Failed to send email"))?.text || "Failed to send email",
        unknownError: (await translate("An unknown error occurred"))?.text || "An unknown error occurred",
      };
      setTranslations(translatedTexts);
    };

    fetchTranslations();
  }, [translate]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const validateForm = async () => {
    if (!formData.fullName || !formData.email || !formData.phoneNumber) {
      return translations?.fullNamePlaceholder;
    }
    if (!formData.termsAccepted) {
      return translations?.termsAccepted;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return translations?.emailPlaceholder;
    }
    if (!/^\+?[1-9]\d{1,14}$/.test(formData.phoneNumber)) {
      return translations?.phoneNumberPlaceholder;
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const validationError = await validateForm();
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
        alert(translations?.successMessage);
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
        throw new Error(result.error || translations?.failureMessage);
      }
    } catch (error) {
      const errorMessage = (error as Error).message || translations?.unknownError || "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

   if (!translations) return (
    <div className="flex items-center justify-center space-x-4 z-50 h-[50vh]">
    <div className="w-5 h-5 bg-[#b2b1b1] rounded-full bounce-delay-0"></div>
    <div className="w-5 h-5 bg-[#b2b1b1] rounded-full bounce-delay-1"></div>
    <div className="w-5 h-5 bg-[#b2b1b1] rounded-full bounce-delay-2"></div>
  </div>
   );

  return (
    <div className='py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-24 bg-bgtop'>
       
      <form onSubmit={handleSubmit} className="w-full max-w-full bg-bgbottom p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg font-nunito">
        <h2 className='text-center text-2xl sm:text-3xl md:text-4xl uppercase font-playfair mb-6 sm:mb-8 lg:mb-10'>
          {translations.heading}
        </h2>
        
        <div className="flex flex-wrap mb-4 sm:mb-6 -mx-2 sm:-mx-3">
          <div className="w-full sm:w-1/2 px-2 sm:px-3 mb-4 sm:mb-0">
            <input
              className="block w-full rounded-lg py-2 sm:py-3 px-3 sm:px-4 leading-tight input focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder={translations.fullNamePlaceholder}
            />
          </div>
          <div className="w-full sm:w-1/2 px-2 sm:px-3">
            <input
              className="block w-full rounded-lg py-2 sm:py-3 px-3 sm:px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder={translations.phoneNumberPlaceholder}
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
              placeholder={translations.emailPlaceholder}
            />
          </div>
          <div className="w-full sm:w-1/3 px-2 sm:px-3 mb-4 sm:mb-0">
  <select
    className="block w-full rounded-lg py-2 sm:py-3 px-3 sm:px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
    name="patientType"
    value={formData.patientType}
    onChange={handleInputChange}
  >
    <option value="" disabled selected hidden>{translations.patientTypePlaceholder}</option>
    <option value="Existing Patient">Existing Patient</option>
    <option value="New Patient">New Patient</option>
  </select>
</div>
<div className="w-full sm:w-1/3 px-2 sm:px-3">
  <select
    className="block w-full rounded-lg py-2 sm:py-3 px-3 sm:px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
    name="treatment"
    value={formData.treatment}
    onChange={handleInputChange}
  >
    <option value="" disabled selected hidden>{translations.treatmentPlaceholder}</option>
    <option value="Invisalign">Invisalign</option>
    <option value="Dental Hygiene">Dental Hygiene</option>
    <option value="Dental Fillings">Dental Fillings</option>
    <option value="Dental Crowns">Dental Crowns</option>
    <option value="Dental Implants">Dental Implants</option>
    <option value="Teeth Whitening">Teeth Whitening</option>
    <option value="Aura Aesthetics - Botox">Aura Aesthetics - Botox</option>
    <option value="Emergency Exams">Emergency Exams</option>
    <option value="Oral Surgery">Oral Surgery</option>
  </select>
</div>
        </div>

        <div className="flex flex-wrap mb-4 sm:mb-6 -mx-2 sm:-mx-3">
          {/* <div className="w-full sm:w-1/2 px-2 sm:px-3 mb-4 sm:mb-0">
            <select
              className="block w-full rounded-lg py-2 sm:py-3 px-3 sm:px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
              name="insurance"
              value={formData.insurance}
              onChange={handleInputChange}
            >
              <option value="">{translations.insurance}</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div> */}
          <div className="w-full px-2 sm:px-3">
  <select
    className="block w-full rounded-lg py-2 sm:py-3 px-3 sm:px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
    name="location"
    value={formData.location}
    onChange={handleInputChange}
  >
    <option value="" disabled selected hidden>{translations.location}</option>
    <option value="Smile Loft Affinity Dental">Smile Loft Affinity Dental</option>
    <option value="Smile Loft Glen Burnie">Smile Loft Glen Burnie</option>
    <option value="Smile Loft Landover">Smile Loft Landover</option>
    <option value="Smile Loft Laurel">Smile Loft Laurel</option>
    <option value="Smile Loft North Potomac">Smile Loft North Potomac</option>
    <option value="Smile Loft Shady Grove">Smile Loft Shady Grove</option>
    <option value="Smile Loft Middle River">Smile Loft Middle River</option>
    <option value="Smile Loft Towne Centre">Smile Loft Towne Centre</option>
  </select>
</div>
        </div>

        <div className="flex flex-wrap mb-4 sm:mb-6 -mx-2 sm:-mx-3">
          <div className="w-full px-2 sm:px-3">
            <textarea
              className="block w-full rounded-lg py-2 sm:py-3 px-3 sm:px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={translations.messagePlaceholder}
              rows={4}
            />
          </div>
        </div>

        <div className="flex items-center mb-4 sm:mb-6">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label htmlFor="termsAccepted">{translations.termsAccepted}</label>
        </div>

        <div className="flex items-center mb-4 sm:mb-6">
          <input
            type="checkbox"
            name="newsletterSubscribed"
            checked={formData.newsletterSubscribed}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label htmlFor="newsletterSubscribed">{translations.newsletterSubscribed}</label>
        </div>
        <div className="flex justify-center">
        <button
         type="submit"
         disabled={loading}
         className='px-6 sm:px-8 py-2 sm:py-3 text-lg sm:text-xl font-nunito text-[#F7F6F3] bg-primary rounded-lg shadow-xl w-full sm:w-auto disabled:opacity-50  hover:bg-box2 hover:text-primary transition-all duration-300'
        
        >
          {loading ? 'Loading...' : translations.submitButton}
        </button>
        </div>
        
          
      

        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AppointmentForm;
