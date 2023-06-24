// Reservation.ts
export class Reservation {

  private used: boolean=false;
  private failedAttempts: number=0;

  constructor(
    private readonly id: string, 
    private readonly machineNumber: number, 
    private readonly reservationDateTime: Date, 
    private readonly pin: number,
    private readonly phoneNumber: string) {}

  getFailedAttempts(){
    this.failedAttempts
  }

  markAsFiledAttempt(){
    this.failedAttempts++
  }


}
