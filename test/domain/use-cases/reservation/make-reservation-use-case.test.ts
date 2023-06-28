import { ReservationRepository, ReservationRequestModel } from '../../../../src/domain/interfaces/repositories/reservation-repository';
import MakeReservation, { EmailRequest, EmailService } from '../../../../src/domain/use-cases/reservation/MakeReservation';

describe('Make Reservation Use Case',()=>{

     class MockEmailService implements EmailService{

       send(emailRequest: EmailRequest): void {
         throw new Error('Method not implemented.');
       }

     }

     class MockReservationRepository implements ReservationRepository{

       save(reservation: ReservationRequestModel): void {
         throw new Error('Method not implemented.');
       }


      
     }

     beforeEach(()=>{

        mockEmailService = new MockEmailService()
        mockReservationRepository= new MockReservationRepository()
        
        makeReservation = new MakeReservation(mockEmailService,mockReservationRepository)

     })

     let mockEmailService:EmailService ;
     let makeReservation:MakeReservation ;
     let mockReservationRepository:ReservationRepository;
     
  describe('Make Reservation', () => {
    
    describe('Should Execute All Reservation Functions',()=>{
         
         it('should send reservation email',()=>{
        
           
          const reservationDateTime='01/01/2020, 01:01:12'
          const phoneNumber='123'
          const email='e@email.com'
          
          const emailRequest:EmailRequest={
            machineNumber: '1',
            reservationId: '12',
            emailAddress: email,
            pin: '12345'
          }
           
           const arr : EmailRequest[]=[]

          jest.spyOn(mockEmailService,'send').mockImplementation((emailRequest:EmailRequest)=>
            arr.push(emailRequest)
          )

          makeReservation.execute(reservationDateTime,phoneNumber,email)

          expect(arr).toStrictEqual([emailRequest])

         })

         it('should save reservation to db',()=>{
        
           
          const reservationDateTime='01/01/2020, 01:01:12'
          const phoneNumber='123'
          const email='e@email.com'
          
      
           
          const reservationRequest:ReservationRequestModel={
            machineNumber: '1',
            reservationId: '12',
            pin: '12345'
          }

          makeReservation.execute(reservationDateTime,phoneNumber,email)
 
          expect(mockReservationRepository.save).toBeCalledWith(reservationRequest)

         })

         it.todo('should send lock instructions to selected machine')
      
   
        })

  })
  

})