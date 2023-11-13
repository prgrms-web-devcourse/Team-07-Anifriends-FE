import axiosInstance from '../axiosInstance';

export const signInShelter = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) =>
  axiosInstance.post<
    {
      accessToken: string;
      userId: number;
      role: string;
    },
    {
      email: string;
      password: string;
    }
  >('/auth/shelters/login', {
    email,
    password,
  });

export const signInVolunteer = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) =>
  axiosInstance.post<
    {
      accessToken: string;
      userId: number;
      role: string;
    },
    {
      email: string;
      password: string;
    }
  >('/auth/volunteers/login', {
    email,
    password,
  });