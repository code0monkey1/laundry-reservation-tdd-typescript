import { Reservation } from "./types/Reservation"

export default class CreateReservation{

  constructor(private readonly emailService:EmailService,
    private readonly reservationRepository :ReservationRepository,
    private readonly machineApi :MachineApi,
    ){}
  
    execute(reservationDateTime:Date,phoneNumber:string,email:string){

      // get Machine number from the dd
         
        const freeMachineNumber=this.reservationRepository.getFreeMachineNumber()
        const reservationId = this.generateReservationId()
        const pin = this.generatePin()

      //Send lock instruction to selected machine via Machine API
        
      //Saves reservation to the DB

      //Sends confirmation email with a machine number, reservation ID and a 5 digit PIN
         this.emailService.send(freeMachineNumber,reservationId,pin)
    }

    private generateReservationId(){

         return Math.floor(10000* Math.random())+''
    }

    private generatePin(){
        return Math.floor(1000000* Math.random())+''
    }

}

export interface EmailService{
   send(machineNumber:number,reservationId:string,pin:string):void
}

export interface ReservationRepository{

    save(reservation:Reservation):void
    getFreeMachineNumber():number
}

export interface MachineApi{
     lock(reservationId:string, machineNumber:string, reservationDateTime:Date):boolean
     unlock(machineNumber:string, reservationId:string):void
}