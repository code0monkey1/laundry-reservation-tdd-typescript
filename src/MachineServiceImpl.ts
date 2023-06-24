export interface IMachineDevice{
  lock(reservationId:string,reservationDateTime:string,pin:number):boolean
  unlock(reservationId:string):void
}

export interface IMachineAPI {

  lockMachine(reservationId: string, machineNumber: number, reservationDateTime: Date): boolean;
  unlockMachine(machineNumber: number, reservationId: string): void;
  claimReservation(machineId: number, pin: number): boolean;

}


export default class MachineService implements IMachineAPI{
  
  private readonly devices: { [key: number]: IMachineDevice };
   
  constructor(devices:{ [key: number]: IMachineDevice }) {

    this.devices = devices;
  }

  lockMachine(reservationId: string, machineNumber: number, reservationDateTime: Date): boolean {
      
      const device = this.devices[machineNumber];

      if(device){
         return true
      }

      return false
  }
  unlockMachine(machineNumber: number, reservationId: string): void {
    throw new Error("Method not implemented.");
  }
  claimReservation(machineId: number, pin: number): boolean {
    throw new Error("Method not implemented.");
  }


  
}