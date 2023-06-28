import { ReservationRepository, ReservationRequestModel } from '../../../../src/domain/interfaces/repositories/reservation-repository';
import MakeReservation, { EmailRequest, EmailService, LockRequest, MachineApi } from '../../../../src/domain/use-cases/reservation/MakeReservation';

describe('Make Reservation Use Case',()=>{

     class MockEmailService implements EmailService{

       send(emailRequest: EmailRequest): void {
        //  throw new Error('Method not implemented.');
       }

     }

     class MockReservationRepository implements ReservationRepository{

       save(reservation: ReservationRequestModel): void {
        //  throw new Error('Method not implemented.');
       }


     }

     class MockMachineApi implements MachineApi{
      
       lock(lockRequest:LockRequest): boolean {
         throw new Error('Method not implemented.');
       }
       unlock(): void {
         throw new Error('Method not implemented.');
       }
      
     }

     beforeEach(()=>{

        mockEmailService = new MockEmailService()
        mockReservationRepository= new MockReservationRepository()
        mockMachineApi = new MockMachineApi()
        
        makeReservation = new MakeReservation(mockEmailService,mockReservationRepository,mockMachineApi)

     })

     let mockEmailService:EmailService ;
     let mockMachineApi :MachineApi;
     let mockReservationRepository:ReservationRepository;
     
     let makeReservation:MakeReservation ;
     
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

         it('should save reservation to db',async()=>{
        
           
          const reservationDateTime='01/01/2020, 01:01:12'
          const phoneNumber='123'
          const email='e@email.com'
          
    
          const reservationRequest:ReservationRequestModel={
            machineNumber: '1',
            reservationId: '12',
            pin: '12345'
          }

          jest.spyOn(mockReservationRepository,'save').mockImplementation(()=>{

             Promise.resolve(true)
          })

          await makeReservation.execute(reservationDateTime,phoneNumber,email)
 
          expect(mockReservationRepository.save).toBeCalledWith(reservationRequest)

         })

         it('should send lock instructions to selected machine',async ()=>{
          
           const reservationDateTime='01/01/2020, 01:01:12'
          const phoneNumber='123'
          const email='e@email.com'
          
    
          const reservationRequest:ReservationRequestModel={
            machineNumber: '1',
            reservationId: '12',
            pin: '12345'
          }

          jest.spyOn(mockReservationRepository,'save').mockImplementation(()=>{

             Promise.resolve(true)
          })

          await makeReservation.execute(reservationDateTime,phoneNumber,email)
 
          expect(mockReservationRepository.save).toBeCalledWith(reservationRequest)
   
          })

        })

  })
  

})