
export interface ReservationRepository{

  save(reservation:ReservationRequestModel):void
  getUnreserved():string

}

export type ReservationRequestModel=Omit<ReservationResponseModel,'id'>

export type  ReservationResponseModel={
  
             id:string,
             machineNumber: string, 
            reservationId: string, 
            pin: string

      }