
describe('laundry-reservation',()=>{

      let mockEmailService:IEmailService
      let mockDbService:IDbService
      let mockMachineService:IMachineService


       class MockEmailService implements IEmailService{
         send(machineNumber: number, reservationId: string, pin: number): void {
           throw new Error("Method not implemented.")
         }
               
        }

       class  MockDbService implements IDbService{
         create(): void {
           throw new Error("Method not implemented.")
         }
             
      }


      class MockMachineService implements IMachineService{
        lock(reservationId: string, reservationDateTime: Date, pin: number): boolean {
          throw new Error("Method not implemented.")
        }
        unlock(reservationId: string): void {
          throw new Error("Method not implemented.")
        }
           
      }

      beforeEach(()=>{

        jest.clearAllMocks();

        mockEmailService= new MockEmailService()
        mockDbService=new MockDbService()
        mockMachineService= new MockMachineService()

      })

   
     
    describe('createReservation', () => {

        
        test('is defined',()=>{

            //Arrange
            const sut  = new LaundryReservation(
                                                mockEmailService,
                                                mockDbService,
                                                mockMachineService
                                                )

            //Act //Assert
             expect(sut.createReservation).toBeInstanceOf(Function)
            
        })

        test('sends email with machine number, reservation ID and a 5 digit PIN',()=>{


              jest.spyOn(mockEmailService,'send').mockImplementation(()=>Promise.resolve(true))

            //Arrange
                  const sut  = new LaundryReservation(
                                                      mockEmailService,mockDbService,mockMachineService
                                                      )

            //Act 
                const date = new Date ( 1,1,1,1,1,1)
                const phone='1'
                const email ='email'
        
                  
            //Assert
            sut.createReservation(date,phone,email)

            expect(mockEmailService.send).toBeCalledTimes(1)

            expect(mockEmailService.send).toBeCalledWith(0,"1",123)

        })

        test('calls machine api')


      
    })
    
     
})

interface ILaundryReservation{
   createReservation(dateTime:Date,phone:string,email:string):void
}

interface IEmailService{
  send(machineNumber:number,reservationId:string,pin:number):void
}

interface IDbService{
  create():void
}

interface IMachineService{ 

     lock(reservationId:string ,reservationDateTime:Date,pin:number):boolean
     unlock( reservationId:string):void

} 
  
class LaundryReservation implements ILaundryReservation {

     private machines=Array<number>(25).fill(-1)

     constructor( 
      private readonly emailService:IEmailService, 
      private readonly dbService:IDbService ,
      private readonly machineService:IMachineService){}

       
     createReservation(dateTime:Date,phone:string,email:string){

         const machineNumber =this.getMachineNumber()
         const reservationId =this.getReservationId()
         const pin = this.getPin()


         this.emailService.send(machineNumber,reservationId,pin)

     }

     private getMachineNumber(){
           return this.machines.indexOf(-1)
     }

     private getReservationId(){
      //TODO
             return "1"
     }

     private getPin(){
         //TODO
              return 123
     }

     initialize(machines :Array<number>){
        this.machines=machines
     }

}

