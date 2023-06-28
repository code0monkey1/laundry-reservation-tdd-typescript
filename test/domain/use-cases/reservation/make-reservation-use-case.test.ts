import { ReservationRepository, ReservationRequestModel, ReservationResponseModel } from '../../../../src/domain/interfaces/repositories/reservation-repository';
import { RequestReservation, SendEmailForReservationUseCase } from '../../../../src/domain/interfaces/use-cases/email/send-reservation-email-use-case';
import { LockMachineUseCase, LockRequest } from '../../../../src/domain/interfaces/use-cases/machine/lock-machine-use-case';
import MakeReservation, { EmailRequest, EmailService, MachineApi } from '../../../../src/domain/use-cases/reservation/MakeReservation';
import { getMachineNumber, getPin, getReservationId } from '../../../../src/domain/utils';

describe('Make Reservation Use Case',()=>{
  
    class MockSendEmailForReservation implements SendEmailForReservationUseCase{
      execute(emailRequest: RequestReservation): void {
        // throw new Error('Method not implemented.');
      }
   
      
    }

     class MockReservationRepository implements ReservationRepository{
      getById(id: string): Promise<ReservationResponseModel> {
        throw new Error('Method not implemented.');
      }

      async  save(reservation: ReservationRequestModel): Promise<void> {
        //  throw new Error('Method not implemented.');
       }


     }

    class MockLockMachine implements LockMachineUseCase{
      execute(lockRequest: LockRequest): Promise<boolean> {
        // throw new Error('Method not implemented.');
        return Promise.resolve(true)
      }
      
    }


     beforeEach(()=>{

        sendEmailForReservation = new MockSendEmailForReservation()
        mockReservationRepository= new MockReservationRepository()
        lockMachine = new MockLockMachine()
        
        makeReservation = new MakeReservation(sendEmailForReservation,mockReservationRepository,lockMachine)

     })

     let sendEmailForReservation:SendEmailForReservationUseCase ;
     let lockMachine :LockMachineUseCase;
     let mockReservationRepository:ReservationRepository;
     
     let makeReservation:MakeReservation ;
    

         
         it('should send reservation email',()=>{
        
           
          const reservationDateTime='01/01/2020, 01:01:12'
          const phoneNumber='123'
          const email='e@email.com'
          
          const emailRequest:Partial<EmailRequest> ={
            emailAddress: email,
          }

          const emailArr:string[]=[]

          jest.spyOn(sendEmailForReservation,'execute').mockImplementation((emailRequest:EmailRequest)=>{

                emailArr.push(emailRequest.emailAddress)
          })

          makeReservation.execute(reservationDateTime,phoneNumber,email)

          expect(emailArr).toStrictEqual(emailArr)
    
          expect(sendEmailForReservation.execute).toBeCalledTimes(1)

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

          jest.spyOn(lockMachine,'execute').mockImplementation(()=>Promise.resolve(true)
          )
       

          await makeReservation.execute(reservationDateTime,phoneNumber,email)
       
          expect(lockMachine.execute).toBeCalledWith(lockRequest)

          expect(lockMachine.execute).toBeCalledTimes(1)

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

          jest.spyOn(lockMachine,'execute').mockImplementation(()=>Promise.resolve(false)
          )
       

           try{
            await makeReservation.execute(reservationDateTime,phoneNumber,email)    
           }catch(e){
          
              if(e instanceof Error)
                  expect(e.message).toBe("Machine was not locked")
              
           }

            expect(lockMachine.execute).toBeCalledWith(lockRequest)
            expect(lockMachine.execute).toBeCalledTimes(1)
        
          })
  

})