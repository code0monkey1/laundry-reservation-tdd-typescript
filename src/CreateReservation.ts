import { Reservation } from "./types/Reservation"

export default class CreateReservation{

  constructor(private readonly email:EmailService,
    private readonly reservationRepository :ReservationRepositoryService,

    ){}
  
    execute(reservationDateTime:Date,phoneNumber:string,email:string){

    }

}

export interface EmailService{
   send(machineNumber:string,reservationId:string,pin:string):void
}

export interface ReservationRepositoryService{

    save(reservation:Reservation):void
}

export interface MachineApi{
     lock(reservationId:string, machineNumber:string, reservationDateTime:Date):boolean
     unlock(machineNumber:string, reservationId:string):void
}