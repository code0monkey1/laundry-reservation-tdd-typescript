
describe('laundry-reservation',()=>{

     
    describe('createReservation', () => {

        
        test('is defined',()=>{

            //Arrange
            const sut  = getLaundryReservation()

            //Act //Assert
             expect(sut.createReservation).toBeInstanceOf(Function)
            
        })

        test('sends email',()=>{

           //Arrange
              const sut  = getLaundryReservation()

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


function getLaundryReservation():ILaundryReservation{

          
             const emailService:IEmailService={
               send: jest.fn()
             }

             const dbService:IDbService={
               create: function (): void {
                 send:jest.fn()
               }
             }


             const machineService :IMachineService={
               lock: jest.fn(),
               unlock: jest.fn()
             }

             
              const laundryReservation  = new LaundryReservation(emailService,dbService,machineService)

   return laundryReservation
}
