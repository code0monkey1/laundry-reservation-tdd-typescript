
describe('laundry-reservation',()=>{

     
    describe('createReservation', () => {

        
        test('is defined',()=>{
             
             //Arrange
              const sut  = new LaundryReservation()

              //Act //Assert
              expect(sut.createReservation).toBeInstanceOf(Function)
            
        })

        test('Takes in Reservation date and time,Cell phone number,Email address',()=>{

           //Arrange
              const sut  = new LaundryReservation()

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

interface IMachineDevice{ 

     lock:(reservationId:string ,reservationDateTime:Date,pin:number)=>boolean
     unlock:( reservationId:string)=>void
     
} 
  
class LaundryReservation implements ILaundryReservation {
      
     private _emailService!: IEmailService
     private _dbService!:IDbService


     initialize(emailService:IEmailService,dbService:IDbService){

          this._emailService=emailService
          this._dbService=dbService

     }
       
     createReservation(dateTime:Date,phone:string,email:string){


     }

}
