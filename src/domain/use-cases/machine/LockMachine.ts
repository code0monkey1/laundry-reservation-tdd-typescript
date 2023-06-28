import { ReservationRepository, ReservationResponseModel } from "../../interfaces/repositories/reservation-repository";
import { LockMachineUseCase, LockRequest } from "../../interfaces/use-cases/machine/lock-machine-use-case";
import { getPin, getReservedDateTime } from "../../utils";

export class LockMachine implements LockMachineUseCase{
      
  constructor(
    private readonly reservationRepository:ReservationRepository,
    private readonly machineDevice:MachineDevice){}
    

  async execute(lockRequest: LockRequest): Promise<boolean> {
       
       const reservationResponseModel= await this.reservationRepository.getById(lockRequest.reservationId)

      if(reservationResponseModel){
     
          //updating entry
          const updatedPin=getPin()
          const updatedDateTime = getReservedDateTime()
        const locked:boolean= await this.machineDevice.lock(lockRequest.reservationId,updatedDateTime,updatedPin)


         if(locked){
              return true;
         }
       
      }
       //return true if machine was unlocked and can be locked at given dateTime

    
       return false;
  }

}

export interface MachineDevice{

    lock(reservationId:string,  reservationDateTime:string,  pin:string):boolean

    unlock( reservationId:string):void

}