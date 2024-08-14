import { gql } from 'graphql-request';

export const CREATE_APPOINTMENT = gql`
  mutation PatientDetail($data: AppointmentInput!) {
    PatientDetail(data: $data) {
      id
    }
  }
`;