export interface Reservation {
  id: string;
  machineNumber: number;
  reservationDateTime: Date;
  pin: number;
  phoneNumber: string;
  email: string;
  used: boolean;
  failedAttempts: number;
}
