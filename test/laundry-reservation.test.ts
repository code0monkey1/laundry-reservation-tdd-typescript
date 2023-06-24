
describe('laundry-reservation',()=>{

       const emailService:IEmailService={
               send: jest.fn()
        }

      const dbService:IDbService={
               create: jest.fn()
      }


      const machineService :IMachineService={
               lock: jest.fn(),
               unlock: jest.fn()
      }

      class MockLaundryReservation implements ILaundryReservation{

         constructor( 
           private readonly emailService:IEmailService,
           private readonly dbService:IDbService ,
           private readonly machineService:IMachineService){}

        createReservation(dateTime: Date, phone: string, email: string): void {
          throw new Error("Method not implemented.")
        }
        
    
      }


      let mockLaundryReservation:ILaundryReservation


      beforeEach(()=>{

        jest.clearAllMocks();

        mockLaundryReservation = new MockLaundryReservation(emailService,dbService,machineService)

      })

     
    describe('createReservation', () => {

        
        test('is defined',()=>{

            //Arrange
            const sut  = mockLaundryReservation

            //Act //Assert
             expect(sut.createReservation).toBeInstanceOf(Function)
            
        })

        test('sends email',()=>{

           //Arrange
              const sut  = mockLaundryReservation

           //Act 
             const date = new Date ( 1,1,1,1,1,1)
             const phone='1'
             const email ='email'
    
             
        jest.spyOn(mockLaundryReservation, "createReservation")
        .mockImplementation(() => Promise.resolve(true))
              
            //Assert
         expect(emailService.send).toBeCalledTimes(1)

        })


      
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
      

     constructor( private readonly emailService:IEmailService, private readonly dbService:IDbService ,private readonly machineService:IMachineService){}

       
     createReservation(dateTime:Date,phone:string,email:string){
         
         this.emailService.send(1,"1",1)

     }

}

