
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


      let laundryReservation:ILaundryReservation


      beforeEach(()=>{

          laundryReservation = new LaundryReservation(emailService,dbService,machineService)
      })


      afterEach(()=>{
        jest.clearAllMocks()
      })


     
    describe('createReservation', () => {

        
        test('is defined',()=>{

            //Arrange
            const sut  = laundryReservation

            //Act //Assert
             expect(sut.createReservation).toBeInstanceOf(Function)
            
        })

        test('sends email',()=>{

           //Arrange
              const sut  = laundryReservation

           //Act 
             const date = new Date ( 1,1,1,1,1,1)
             const phone='1'
             const email ='email'
    
            const result = sut.createReservation(date,phone,email)
              
            //Assert
            

        })


      
    })
    
     
})

interface ILaundryReservation{
   createReservation:(dateTime:Date,phone:string,email:string)=>void
}

interface IEmailService{
  send:(machineNumber:number,reservationId:string,pin:number)=>void
}

interface IDbService{
  create:()=>void
}

interface IMachineService{ 

     lock:(reservationId:string ,reservationDateTime:Date,pin:number)=>boolean
     unlock:( reservationId:string)=>void

} 
  
class LaundryReservation implements ILaundryReservation {
      

     constructor( private readonly emailService:IEmailService, private readonly dbService:IDbService ,private readonly machineService:IMachineService){}

       
     createReservation(dateTime:Date,phone:string,email:string){
         
         this.emailService.send(1,"1",1)

     }

}

