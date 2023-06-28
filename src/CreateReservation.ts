import { Reservation } from "./types/Reservation"

export default class CreateReservation{

  constructor(
    private readonly emailService:EmailService,
    private readonly reservationRepository:ReservationRepository,
    private readonly machineApi :MachineApi,
    ){}
  
    execute(reservationDateTime:Date,phoneNumber:string,email:string){

      // get Machine number from the reservationRepository
        const machineNumber=this.reservationRepository.getFreeMachineNumber()
        const reservationId = this.generateReservationId()
        const pin = this.generatePin()

        //Saves reservation to the DB
         const reservation:Reservation={
           pin,
           reservationDateTime,
           email,
           reservationId,
           machineNumber
         }

         this.reservationRepository.save(reservation)
 

      //  Send lock instruction to selected machine via    Machine API

        

      //Sends confirmation email with a machine number, reservation ID and a 5 digit PIN
         this.emailService.send(email,machineNumber,reservationId,pin)
    }

    private generateReservationId(){

         return 2+""
    }

    private generatePin(){
        return 12345+""
    }

}

export interface EmailService{
   send(email:string,machineNumber:number,reservationId:string,pin:string):void
}

export interface ReservationRepository{

    save(reservation:Reservation):void
    getFreeMachineNumber():number,
    getReservations():Reservation[]
}

export interface MachineApi{
     lock(reservationId:string, machineNumber:number, reservationDateTime:Date):boolean
     unlock(machineNumber:string, reservationId:string):void
}