
describe('machine-api', () => {
     
     describe('lock',()=>{
            
           it('is defined',()=>{
             
             //Arrange
             const sut = new MachineApi()

             //Act //Assert
             expect(sut.lock).toBeDefined()

            

           })

             
     })
})

interface IMachineAPI{ 

     lock(reservationId:string ,machineNumber:number,reservationDateTime:Date,pin:number):boolean
     unlock( reservationId:string):void

} 

class MachineApi implements IMachineAPI{
  lock(reservationId: string, machineNumber: number, reservationDateTime: Date, pin: number): boolean {
    throw new Error("Method not implemented.")
  }
  unlock(reservationId: string): void {
    throw new Error("Method not implemented.")
  }
  
}

