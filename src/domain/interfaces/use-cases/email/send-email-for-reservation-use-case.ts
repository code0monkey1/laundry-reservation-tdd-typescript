interface SendEmailForReservationUseCase{
    
  send(emailRequest:RequestForReservation):void

}


export type RequestForReservation={

            emailAddress: string,
            machineNumber: string, 
            reservationId: string, 
            pin: string
          
}