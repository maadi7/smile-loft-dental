"use client";

import React, { useState, useEffect } from 'react';
import { AppointmentInput } from '../types/graphql';
import useTranslation from '../hooks/useTranslation';
import AppointmentForm from '@/components/AppointmentForm';


const Appointment = () => {
 return(
    <div className='md:pt-20 pt-28' >
    <AppointmentForm/>
    </div>
  );
};

export default Appointment;
