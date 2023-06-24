
describe('laundry-reservation',()=>{

      let mockEmailService:IEmailService
      let mockDbService:IDbService
      let mockMachineService:IMachineService


       const emailService : IEmailService={
         send: jest.fn()
       }

      const dbService : IDbService={
         create:jest.fn()
             
      }

      const machineService : IMachineService={
        lock:jest.fn(),
        unlock:jest.fn()
      }

      beforeEach(()=>{

        jest.clearAllMocks();

        mockEmailService= emailService
        mockDbService= dbService
        mockMachineService= machineService

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
        
        describe('email', () => {
          test('sends email with machine number : 0, reservation ID :1 , and a 5 digit PIN : 12345',()=>{
  
  
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
  
              expect(mockEmailService.send).toBeCalledWith(0,"1",12345)
  
          })
          
        })
        
        describe('db', () => {
          test('saves reservation to db',()=>{
            
                jest.spyOn(mockDbService,'create').mockImplementation(()=>Promise.resolve(true))
  
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
  
               expect(mockDbService.create).lastCalledWith("1",email)
  
          })
          
        })
        
       
        describe('machine',()=>{
          test("Send lock instruction to selected machine via Machine API Reservation Id : '1' , Machine number: 0 , Reservation date and time :Date ( 1,1,1,1,1,1) , PIN : 12345 '",()=>{
  
          })

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
  create(reservationId:string,email:string):void
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

       // send email
         this.emailService.send(machineNumber,reservationId,pin)

       // save to db
       this.dbService.create(reservationId,email)

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
              return 12345
     }

     initialize(machines :Array<number>){
        this.machines=machines
     }

}

