export interface SendEmailForReservationUseCase{
    
  execute(emailRequest:RequestReservation):void

}


export type RequestReservation={

            emailAddress: string,
            machineNumber: string, 
            reservationId: string, 
            pin: string
          
}