
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
             const sut = new MachineApi([])

             //Act //Assert
             expect(sut.lock).toBeDefined()

           })
           
           it('returns error : `Device with machineNumber: 1 not found`',()=>{

             //Arrange
            const mockDevice :IMachineDevice={
                Lock: jest.fn(()=>{
                  return true
                }),
                Unlock: jest.fn(()=>{
                   return false
                })
              }

             const sut = new MachineApi([])

             const reservationId:string="1" 
             const machineNumber:number =1
             const reservationDateTime:Date=new Date(1,1,1,1,1,1)
             const pin:number=12345

             //Act //Assert
             expect(()=>sut.lock(reservationId,machineNumber,reservationDateTime,pin)).toThrowError(`Device with machineNumber: 1 not found`)

           })

                 it('returns error : `Device with machineNumber: 1 not found`',()=>{

                  //Arrange
                  const mockDevice :IMachineDevice={
                      Lock: jest.fn(()=>{
                        return true
                      }),
                      Unlock: jest.fn(()=>{
                        return false
                      })
                    }

                  const sut = new MachineApi([])

                  const reservationId:string="1" 
                  const machineNumber:number =1
                  const reservationDateTime:Date=new Date(1,1,1,1,1,1)
                  const pin:number=12345

                  //Act //Assert
                  expect(()=>sut.lock(reservationId,machineNumber,reservationDateTime,pin)).toThrowError(`Device with machineNumber: 1 not found`)

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

    if(!device)
        throw new Error(`Device with machineNumber: ${machineNumber} not found`)

    const lockGranted = device.Lock(reservationId,reservationDateTime,pin)

    return lockGranted

  }
  unlock(reservationId: string): void {
    throw new Error("Method not implemented.")
  }
  
}

