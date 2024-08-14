export interface AppointmentInput {
    fullName: string;
    phoneNumber: string;
    email: string;
    patientType: string;
    treatment: string;
    insurance: string;
    location: string;
    message: string;
    termsAccepted: boolean;
    newsletterSubscribed: boolean;
  }
  
  export interface CreateAppointmentResponse {
    createAppointment: {
      id: string;
    }
  }