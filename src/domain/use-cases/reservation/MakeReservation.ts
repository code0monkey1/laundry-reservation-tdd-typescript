
import { MakeReservationUseCase } from '../../interfaces/use-cases/reservation/make-reservation-use-case';
export default class MakeReservation implements MakeReservationUseCase{

  constructor(private readonly emailService:EmailService){}

  async execute(reservationDateTime: string, phoneNumber: string, email: string) {

         const machineNumber=this.getMachineNumber()
         const reservationId = this.getReservationId()
         const pin  = this.getPin()

         this.emailService.send(email,machineNumber,reservationId,pin)

         
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

    send(emailAddress:string,machineNumber:string,reservationId:string,pin:string):void
   
  }
    