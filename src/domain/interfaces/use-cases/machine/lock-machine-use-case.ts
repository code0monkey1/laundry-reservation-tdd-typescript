interface LockMachineUseCase {
         
  execute(reservationId:string, machineNumber:string, reservationDateTime:string):Promise<boolean>
        

}


export interface MachineApi{
   
  lock(lockRequest:LockRequest):Promise<boolean>

  unlock():void

}


export type LockRequest={
  reservationId:string,
  machineNumber:string,
  reservedDateTime:string
}

export interface MachineDevice{

    lock(reservationId:string,  reservationDateTime:string,  pin:string):boolean
    unlock( reservationId:string):void
}