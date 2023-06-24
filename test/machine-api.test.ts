
describe('machine-api', () => {
     
     describe('lock',()=>{
            
           it('is defined',()=>{
             
              const mockDevice :IMachineDevice={
                Lock: jest.fn(()=>{
                  return true
                }),
                Unlock: jest.fn()
              }

             //Arrange
             const sut = new MachineApi([])

             //Act //Assert
             expect(sut.lock).toBeDefined()

           })

           describe('Device not found', () => {
             it('returns error : `Device with machineNumber: 1 not found`, if device not found',()=>{
  
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



             describe('Lock',()=>{
  
            
               it('returns true when conditions are fulfilled',()=>{
    
                //Arrange
                const mockDevice :IMachineDevice={
                    Lock: jest.fn(()=>{
                      return true
                    }),
                    Unlock: jest.fn(()=>{
                      return false
                    })
                  }
    
                const sut = new MachineApi([mockDevice])
    
                const reservationId:string="1" 
                const machineNumber:number =0
                const reservationDateTime:Date=new Date(1,1,1,1,1,1)
                const pin:number=12345
    
                //Act
     
                const result =sut.lock(reservationId,machineNumber,reservationDateTime,pin)
                
                //Assert
                expect(mockDevice.Lock).toBeCalledWith(reservationId,reservationDateTime,pin)
  
                expect(result).toBe(true)
    
               })
  
         it('returns false , as conditions not fulfilled',()=>{
  
               //Arrange
               const mockDevice :IMachineDevice={
                   Lock: jest.fn(()=>{
                     return false
                   }),
                   Unlock: jest.fn(()=>{
                     return false
                   })
                 }
  
               const sut = new MachineApi([mockDevice])
  
               const reservationId:string="1" 
               const machineNumber:number =0
               const reservationDateTime:Date=new Date(1,1,1,1,1,1)
               const pin:number=12345
  
               //Act
               const result =sut.lock(reservationId,machineNumber,reservationDateTime,pin)

               //Assert
                expect(mockDevice.Lock).toBeCalledWith(reservationId,reservationDateTime,pin)

               expect(result).toBe(false)
  
        })
             
      
      })

        
     
     })

      describe('unlock',()=>{
                
              test('calls unlock while passing  machine number and reservation id',()=>{
                  
                 const mockDevice :IMachineDevice={
                   Lock: jest.fn(()=>{
                     return false
                   }),
                   Unlock: jest.fn()
                 }
  
               const sut = new MachineApi([mockDevice])
  
               const reservationId:string="1" 
               const machineNumber:number =0
  
               //Act
                 sut.unlock(machineNumber,reservationId)

               //Assert
                expect(mockDevice.Unlock).toBeCalledWith(machineNumber,reservationId)

              })

             })
             
})

interface IMachineDevice{
     Lock( reservationId:string,  reservationDateTime:Date,  pin:number):boolean
     Unlock(machineNumber:number,reservationId:string):void
}
interface IMachineAPI{ 

     lock(reservationId:string ,machineNumber:number,reservationDateTime:Date,pin:number):boolean
     unlock(machineNumber:number, reservationId:string):void

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

  unlock(machineNumber:number,reservationId: string): void {
     
      const device = this.devices[machineNumber]

      if(!device)
         throw new Error(`Device with machineNumber: ${machineNumber} not found`)

      device.Unlock(machineNumber,reservationId)
  
  }
  
}

