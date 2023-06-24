interface IMachineDevice{
     Lock( reservationId:string,  reservationDateTime:Date,  pin:number):boolean
     Unlock(machineNumber:number,reservationId:string):void
}
interface IMachineAPI{ 

     lock(reservationId:string ,machineNumber:number,reservationDateTime:Date,pin:number):boolean
     unlock(machineNumber:number, reservationId:string):void

} 

export default class MachineApi implements IMachineAPI{
   
    private devices:Record<number,IMachineDevice>

    constructor(devices:Record<number,IMachineDevice>){

      this.devices=devices

    }

  lock(reservationId: string, machineNumber: number, reservationDateTime: Date, pin: number): boolean {

    const device = this.devices[machineNumber]

    if(!device)
        throw new Error(`Device with machineNumber: ${machineNumber} not found`)

    const lockGranted = device.Lock(reservationId,reservationDateTime,pin)

    return lockGranted
  }

  unlock(machineNumber:number,reservationId: string): void {
     
      const device = this.devices[machineNumber]

      if(!device)
         throw new Error(`Device with machineNumber: ${machineNumber} not found`)

      device.Unlock(machineNumber,reservationId)
  
  }
  
}

