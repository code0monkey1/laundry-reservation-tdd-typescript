import CreateReservation, { EmailService, MachineApi, ReservationRepository } from "../src/CreateReservation";
import { Reservation } from "../src/types/Reservation";

describe('CreateReservation', () => {

     class MockEmailService implements EmailService{
       private mailSent:{machineNumber:number,reservationId:string,pin:string}[]=[]
       
       send(machineNumber: number, reservationId: string, pin: string): void {
       
        this.mailSent.push( {
            machineNumber,
            reservationId,
            pin
          })
          
       }

       getSentMail(){
        return this.mailSent
       }
      
     }

     class MockMachineApi implements MachineApi{
       lock(reservationId: string, machineNumber: string, reservationDateTime: Date): boolean {
         throw new Error("Method not implemented.");
       }
       unlock(machineNumber: string, reservationId: string): void {
         throw new Error("Method not implemented.");
       }
      
     }

     class MockReservationRepository implements ReservationRepository{
       getFreeMachineNumber(): number {
         return 1
       }
       save(reservation: Reservation): void {
         throw new Error("Method not implemented.");
       }
      
     }


     let mockEmailService:MockEmailService
     let mockMachineApi:MachineApi
     let mockReservationRepository:ReservationRepository

     beforeEach( ()=>{
      
        jest.clearAllMocks()
        mockEmailService = new MockEmailService()
        mockMachineApi= new MockMachineApi()
        mockReservationRepository=new MockReservationRepository()
      
     })
    
  test('sends email',()=>{

     //Arrange
       const createReservation = new CreateReservation(
                                                  mockEmailService,
                                                  mockReservationRepository,
                                                  mockMachineApi)
       
     
       const reservationDateTime = new Date('01/01/2020') 
       const phoneNumber='1'  
       const email="mail@gmail.com"                                        

     //Act
       
       createReservation.execute(reservationDateTime,phoneNumber,email)
        
       const sentMail = mockEmailService.getSentMail()
       expect(sentMail).toStrictEqual([{machineNumber:1,pin:"12345",reservationId:"2",}])

     //Assert

  })

    test('saved reservation to db',()=>{

     //Arrange
       const createReservation = new CreateReservation(
                                                  mockEmailService,
                                                  mockReservationRepository,
                                                  mockMachineApi)
       
     
       const reservationDateTime = new Date('01/01/2020') 
       const phoneNumber='1'  
       const email="mail@gmail.com"                                        

     //Act
       
       createReservation.execute(reservationDateTime,phoneNumber,email)
        
       const sentMail = mockEmailService.getSentMail()
       expect(sentMail).toStrictEqual([{machineNumber:1,pin:"12345",reservationId:"2",}])

     //Assert

  })
})
