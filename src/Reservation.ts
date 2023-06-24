// Reservation.ts
export class Reservation {
  id: string;
  machineNumber: number;
  reservationDateTime: Date;
  pin: number;
  used: boolean;
  failedAttempts: number;
  phoneNumber: string;

  constructor(id: string, machineNumber: number, reservationDateTime: Date, pin: number, phoneNumber: string) {
    this.id = id;
    this.machineNumber = machineNumber;
    this.reservationDateTime = reservationDateTime;
    this.pin = pin;
    this.used = false;
    this.failedAttempts = 0;
    this.phoneNumber = phoneNumber;
  }
}
