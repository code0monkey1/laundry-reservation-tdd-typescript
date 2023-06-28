
import { ReservationRepository } from '../../interfaces/repositories/reservation-repository';
import { LockMachineUseCase } from '../../interfaces/use-cases/machine/lock-machine-use-case';
import { MakeReservationUseCase } from '../../interfaces/use-cases/reservation/make-reservation-use-case';



export default class MakeReservation implements MakeReservationUseCase{

  constructor(
    private readonly emailService:EmailService,
    private readonly reservationRepo:ReservationRepository,
    private readonly lockMachine:LockMachineUseCase){}

  async execute(reservationDateTime: string, phoneNumber: string, email: string) {

         const machineNumber=this.getMachineNumber()
         const reservationId = this.getReservationId()
         const pin  = this.getPin()
          

        await this.emailService.send({emailAddress:email,machineNumber,reservationId,pin})
        
        await this.reservationRepo.save({machineNumber,reservationId,pin})


        const wasLocked=await this.lockMachine.execute({machineNumber,reservationId,reservedDateTime:reservationDateTime})
        

        if(!wasLocked){
         throw new Error("Machine was not locked")
        }

  }

  getMachineNumber(){
      return "1"
  }

  getReservationId(){
        return '12'
  }


  getPin(){
      return '12345'
  }

  
}


export interface EmailService{

    send(emailRequest:EmailRequest):void
   
  }

export interface MachineApi{
   
  lock(lockRequest:LockRequest):Promise<boolean>

  unlock():Promise<void>

}



export type EmailRequest={

            emailAddress: string,
            machineNumber: string, 
            reservationId: string, 
            pin: string
          
}

export type LockRequest={
  reservationId:string,
  machineNumber:string,
  reservedDateTime:string
}