
export interface ReservationRepository{

  save(reservation:ReservationRequestModel):void
  getById(id:string):Promise<ReservationResponseModel>|null

}

export type ReservationRequestModel=Omit<ReservationResponseModel,'id'>

export type  ReservationResponseModel={
  
             id:string,
             machineNumber: string, 
            reservationId: string, 
            pin: string

      }