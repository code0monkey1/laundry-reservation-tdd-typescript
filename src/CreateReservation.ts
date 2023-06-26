import { Reservation } from "./types/Reservation"

export default class CreateReservation{

  constructor(emailService:EmailService){

  }
  
    execute(reservationDateTime:Date,phoneNumber:string,email:string){

    }

}

export interface EmailService{
   send(machineNumber:number,reservationId:string,pin:string):void
}

export interface ReservationRepositoryService{

    save(reservation:Reservation):void
}