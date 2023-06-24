// Reservation.ts
export class Reservation {

  private used: boolean=false;
  private failedAttempts: number=0;

  constructor(
    private readonly id: string, 
    private readonly machineNumber: number, 
    private reservationDateTime: Date, 
    private pin: number,
    private phoneNumber: string) {}

  getFailedAttempts(){
    this.failedAttempts
  }

  markAsFiledAttempt(){
    this.failedAttempts++
  }


}
