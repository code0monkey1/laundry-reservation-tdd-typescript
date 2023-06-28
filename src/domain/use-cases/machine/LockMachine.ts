import { ReservationRepository } from "../../interfaces/repositories/reservation-repository";
import { LockMachineUseCase, LockRequest } from "../../interfaces/use-cases/machine/lock-machine-use-case";

export class LockMachine implements LockMachineUseCase{
      
  constructor(
    private readonly reservationRepository:ReservationRepository,
    private readonly machineDevice:MachineDevice){}
    

  execute(lockRequest: LockRequest): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  
}


export interface MachineDevice{

    lock(reservationId:string,  reservationDateTime:string,  pin:string):boolean

    unlock( reservationId:string):void

}