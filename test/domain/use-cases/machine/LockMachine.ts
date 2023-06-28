export interface MachineApi{
   
  lock(lockRequest:LockRequest):Promise<boolean>

  unlock():void

}


export type LockRequest={
  reservationId:string,
  machineNumber:string,
  reservedDateTime:string
}