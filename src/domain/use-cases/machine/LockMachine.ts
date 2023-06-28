import { ReservationRepository, ReservationResponseModel } from "../../interfaces/repositories/reservation-repository";
import { LockMachineUseCase, LockRequest } from "../../interfaces/use-cases/machine/lock-machine-use-case";

export class LockMachine implements LockMachineUseCase{
      
  constructor(
    private readonly reservationRepository:ReservationRepository,
    private readonly machineDevice:MachineDevice){}
    

  async execute(lockRequest: LockRequest): Promise<boolean> {
       
       const {pin}:ReservationResponseModel= await this.reservationRepository.getById(lockRequest.reservationId)
      
       //return true if machine was unlocked and can be locked at given dateTime
      const locked:boolean= await this.machineDevice.lock(lockRequest.reservationId,lockRequest.reservedDateTime,pin)

      if(locked){
             
      }
     
       return false;
  }

}

export interface MachineDevice{

    lock(reservationId:string,  reservationDateTime:string,  pin:string):boolean

    unlock( reservationId:string):void

}