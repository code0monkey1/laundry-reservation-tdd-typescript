import { ReservationRepository, ReservationRequestModel } from '../../../../src/domain/interfaces/repositories/reservation-repository';
import MakeReservation, { EmailRequest, EmailService, LockRequest, MachineApi } from '../../../../src/domain/use-cases/reservation/MakeReservation';

describe('Make Reservation Use Case',()=>{

     class MockEmailService implements EmailService{

       async send(emailRequest: EmailRequest): Promise<void> {
        //  throw new Error('Method not implemented.');
     
       }

     }

     class MockReservationRepository implements ReservationRepository{

      async  save(reservation: ReservationRequestModel): Promise<void> {
        //  throw new Error('Method not implemented.');
       }


     }

     class MockMachineApi implements MachineApi{
      
       async lock(lockRequest:LockRequest): Promise<boolean> {
        //  throw new Error('Method not implemented.');
         return Promise.resolve(true)
       }
       unlock(): Promise<void> {
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

          jest.spyOn(mockEmailService,'send').mockImplementation(()=>{

                Promise.resolve(true)
          })

          makeReservation.execute(reservationDateTime,phoneNumber,email)

          expect(mockEmailService.send).toBeCalledWith(emailRequest)
          expect(mockEmailService.send).toBeCalledTimes(1)

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
          
          const lockRequest:LockRequest={
            reservationId: '12',
            machineNumber: '1',
            reservedDateTime: reservationDateTime
          }

          jest.spyOn(mockMachineApi,'lock').mockImplementation(()=>Promise.resolve(true)
          )
       

          await makeReservation.execute(reservationDateTime,phoneNumber,email)
       
          expect(mockMachineApi.lock).toBeCalledWith(lockRequest)

          expect(mockMachineApi.lock).toBeCalledTimes(1)

          })

            it('if machine is not locked , proper error should be thrown',async ()=>{
          
           const reservationDateTime='01/01/2020, 01:01:12'
          const phoneNumber='123'
          const email='e@email.com'
          
          const lockRequest:LockRequest={
            reservationId: '12',
            machineNumber: '1',
            reservedDateTime: reservationDateTime
          }

          jest.spyOn(mockMachineApi,'lock').mockImplementation(()=>Promise.resolve(false)
          )
       

          expect(async()=>await makeReservation.execute(reservationDateTime,phoneNumber,email) ).toThrowError('Machine was not locked')
       
        

        
        

          })


        })
  

})