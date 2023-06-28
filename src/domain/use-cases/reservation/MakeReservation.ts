
import { MakeReservationUseCase } from '../../interfaces/use-cases/reservation/make-reservation-use-case';
export default class MakeReservation implements MakeReservationUseCase{

  constructor(emailService:EmailService){}

  execute(reservationDateTime: string, phoneNumber: string, email: string): void {
    throw new Error('Method not implemented.');
  }


  
}

export interface EmailService{

    send(emailAddress:string,machineNumber:string,reservationId:string,pin:string):void
   
  }
    