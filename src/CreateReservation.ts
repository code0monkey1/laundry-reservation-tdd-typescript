import { Reservation } from "./types/Reservation"

class CreateReservation{

  constructor(emailService:EmailService){

  }
  
    execute(reservationDateTime:Date,phoneNumber:string,email:string){

    }

}

interface EmailService{
   send(machineNumber:number,reservationId:string,pin:string):void
}

interface RepositoryService{

    save(reservation:Reservation):void
}