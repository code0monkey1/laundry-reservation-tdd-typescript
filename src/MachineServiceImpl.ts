export default class MachineService implements IMachineService{
   
  constructor(private machines:Array<number>){}

  lock(reservationId: string, machineNumber: number, reservationDateTime: Date, pin: number): boolean {
    throw new Error("Method not implemented.");
  }
  unlock(reservationId: string): void {
    throw new Error("Method not implemented.");
  }

  
}