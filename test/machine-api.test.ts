
describe('machine-api', () => {
     
     describe('lock',()=>{
            
           it('is defined',()=>{
             
              const mockDevice :IMachineDevice={
                Lock: jest.fn(()=>{
                  return true
                }),
                Unlock: jest.fn(()=>{
                   return false
                })
              }

             //Arrange
             const sut = new MachineApi([mockDevice])

             //Act //Assert
             expect(sut.lock).toBeDefined()

           })

             
     })
})

interface IMachineDevice{
     Lock( reservationId:string,  reservationDateTime:Date,  pin:number):boolean
     Unlock( reservationId:string):void
}
interface IMachineAPI{ 

     lock(reservationId:string ,machineNumber:number,reservationDateTime:Date,pin:number):boolean
     unlock( reservationId:string):void

} 

class MachineApi implements IMachineAPI{
   
    private devices:Record<number,IMachineDevice>

    constructor(devices:Record<number,IMachineDevice>){

      this.devices=devices

    }

  lock(reservationId: string, machineNumber: number, reservationDateTime: Date, pin: number): boolean {

    const device = this.devices[machineNumber]

    if(device){

         const lockGranted = device.Lock(reservationId,reservationDateTime,pin)

         return lockGranted

    }

    return false
  }
  unlock(reservationId: string): void {
    throw new Error("Method not implemented.")
  }
  
}

