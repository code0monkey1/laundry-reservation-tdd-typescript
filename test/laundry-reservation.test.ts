
describe('laundry-reservation',()=>{

      let mockEmailService:IEmailService
      let mockDbService:IDbService
      let mockMachineService:IMachineService


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

      beforeEach(()=>{

      jest.clearAllMocks();

       mockEmailService=emailService
       mockDbService=dbService
       mockMachineService= machineService

      })

   
     
    describe('createReservation', () => {

        
        test('is defined',()=>{

            //Arrange
            const sut  = new LaundryReservation(mockEmailService,mockDbService,mockMachineService)

            //Act //Assert
             expect(sut.createReservation).toBeInstanceOf(Function)
            
        })

        test('sends email',()=>{

        //Arrange
              const sut  = new LaundryReservation(mockEmailService,mockDbService,mockMachineService)

        //Act 
             const date = new Date ( 1,1,1,1,1,1)
             const phone='1'
             const email ='email'
    
              
        //Assert
         sut.createReservation(date,phone,email)

         expect(emailService.send).toBeCalledTimes(1)

         expect(emailService.send).toBeCalledWith(0,"1",123)

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

     private machines=Array<number>(25).fill(-1)

     constructor( 
      private readonly emailService:IEmailService, 
      private readonly dbService:IDbService ,
      private readonly machineService:IMachineService){}

       
     createReservation(dateTime:Date,phone:string,email:string){

         const machineNumber = this.getVacantMachine()
         const reservationId ="1"
         const pin = this.getPin()


         this.emailService.send(machineNumber,reservationId,pin)

     }

     initialize(machines :Array<number>){
        this.machines=machines
     }

     private getVacantMachine(){

        const vacantMachineIndex =this.machines.findIndex(value=> value===-1)

        return vacantMachineIndex;
     }

     private getPin(){
        return 123
     }

}

