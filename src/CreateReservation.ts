import { Reservation } from "./types/Reservation"

export default class CreateReservation{

  constructor(private readonly email:EmailService,
    private readonly reservationRepository :ReservationRepository,
    private readonly machineApi :MachineApi
    ){}
  
    execute(reservationDateTime:Date,phoneNumber:string,email:string){

      //Send lock instruction to selected machine via Machine API

      //Saves reservation to the DB

      //Sends confirmation email with a machine number, reservation ID and a 5 digit PIN
    }

}

export interface EmailService{
   send(machineNumber:string,reservationId:string,pin:string):void
}

export interface ReservationRepository{

    save(reservation:Reservation):void
}

export interface MachineApi{
     lock(reservationId:string, machineNumber:string, reservationDateTime:Date):boolean
     unlock(machineNumber:string, reservationId:string):void
}