
describe('machine-api', () => {
     
     describe('lock',()=>{
            
           it('is defined',()=>{
             
             //Arrange
             const sut = new MachineApi([])

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
    throw new Error("Method not implemented.")
  }
  unlock(reservationId: string): void {
    throw new Error("Method not implemented.")
  }
  
}

