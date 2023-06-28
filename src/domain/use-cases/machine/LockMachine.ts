import { ReservationRepository } from "../../interfaces/repositories/reservation-repository";
import { LockMachineUseCase, LockRequest } from "../../interfaces/use-cases/machine/lock-machine-use-case";

export class LockMachine implements LockMachineUseCase{
      
  constructor(
    private readonly reservationRepository:ReservationRepository,
    private readonly machineDevice:MachineDevice){}
    

  async execute(lockRequest: LockRequest): Promise<boolean> {
       
       const reservationRequest= await this.reservationRepository.getById(lockRequest.reservationId)

       if(!reservationRequest){
            throw new Error('Reservation not found') 
       }

       return true;
  }

}

export interface MachineDevice{

    lock(reservationId:string,  reservationDateTime:string,  pin:string):boolean

    unlock( reservationId:string):void

}