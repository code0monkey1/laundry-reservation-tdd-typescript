import { EmailService, MachineApi, ReservationRepository } from "../src/CreateReservation";
import { Reservation } from "../src/types/Reservation";

describe('CreateReservation', () => {

     class MockEmailService implements EmailService{
       send(machineNumber: string, reservationId: string, pin: string): void {
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
       save(reservation: Reservation): void {
         throw new Error("Method not implemented.");
       }
      
     }


     let mockEmailService:MockEmailService
     let mockMachineApi:MachineApi
     let mockReservationRepository:ReservationRepository

     beforeEach( ()=>{


      
     })
    
  test('sends email',()=>{

     //Arrange



     //Act


     //Assert

  })
})
