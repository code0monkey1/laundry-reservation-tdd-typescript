import CreateReservation, { EmailService, MachineApi, ReservationRepository } from "../src/CreateReservation";
import { Reservation } from "../src/types/Reservation";

describe('CreateReservation', () => {

     class MockEmailService implements EmailService{
       send(machineNumber: number, reservationId: string, pin: string): void {
         throw new Error("Method not implemented.");
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

     //Assert

  })
})
