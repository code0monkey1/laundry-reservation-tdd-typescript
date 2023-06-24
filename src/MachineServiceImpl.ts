export interface IMachineDevice{
  lock(reservationId:string,reservationDateTime:string,pin:number):boolean
  unlock(reservationId:string):void
}

export interface IMachineAPI {

  devices: { [key: number]: IMachineDevice };
  lockMachine(reservationId: string, machineNumber: number, reservationDateTime: Date): boolean;
  unlockMachine(machineNumber: number, reservationId: string): void;
  claimReservation(machineId: number, pin: number): boolean;
  
}


export default class MachineService implements IMachineService{
   
  constructor(private machines:Array<number>){}

  lock(reservationId: string, machineNumber: number, reservationDateTime: Date, pin: number): boolean {
    throw new Error("Method not implemented.");
  }
  unlock(reservationId: string): void {
    throw new Error("Method not implemented.");
  }

  
}