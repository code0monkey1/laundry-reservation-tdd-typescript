import CreateReservation, { EmailService, MachineApi, ReservationRepository } from "../src/CreateReservation";
import { Reservation } from "../src/types/Reservation";

describe('Laundry Reservation', () => {
  
  describe('CreateReservation', () => {
  
       class MockEmailService implements EmailService{
        
         private mailSent:{email:string,machineNumber:number,reservationId:string,pin:string}[]=[]
         
         send(email:string,machineNumber: number, reservationId: string, pin: string): void {
         
          this.mailSent.push( {
              email,
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

         private reservations:Reservation[] =[]

         getFreeMachineNumber(): number {
           return 1
         }
         save(reservation: Reservation): void {
           this.reservations.push(reservation)
         }

          getReservations():Reservation[]{
            return this.reservations
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
         expect(sentMail).toStrictEqual([{email,machineNumber:1,pin:"12345",reservationId:"2",}])
  
       //Assert
  
    })
  
      it('saves reservation to db',()=>{
        
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
  
         const reservationId="2"
         const machineNumber=1
         const pin="12345"

         const reservation:Reservation={
          pin,
          reservationDateTime,
          email,
          reservationId,
          machineNumber
         }
  
       //Assert
         expect(mockReservationRepository.getReservations()).toStrictEqual([reservation])
          

      })
      it.todo('sends lock instructions to selected machine')
  
      
  })
  
  
  describe('Machine Api', () => {
       
      it.todo('locks machine using machine number, DateTime of reservation and reservationId')
  
      it.todo('unlocks machine using machineNumber and reservationId')
  })
  
  
  describe('ClaimReservation', () => {
    
  })
  

})  


