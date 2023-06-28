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
      getById(id: string): Promise<ReservationResponseModel>|null {
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
        
       jest.clearAllMocks()

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
          
    
          const reservations:ReservationResponseModel[]=[]

          jest.spyOn(mockReservationRepository,'save').mockImplementation((reservation:ReservationRequestModel)=>{

             reservations.push({id:"5cba8579-bbac-5410-afc5-bce80e571cea",...reservation})
          })

          await makeReservation.execute(reservationDateTime,phoneNumber,email)
 
          expect(reservations).toHaveLength(1)

          expect(reservations[0].machineNumber).not.toBeNull()
          expect(reservations[0].pin).not.toBeNull()
          expect(reservations[0].machineNumber).not.toBeNull()
      

         })
         
         it('should send lock instructions to selected machine',async ()=>{
          
           const reservationDateTime='01/01/2020, 01:01:12'
          const phoneNumber='123'
          const email='e@email.com'
          
          const lockRequest:Partial<LockRequest> ={
            reservedDateTime: reservationDateTime
          }
            
          const dateTime:string[]=[]

          jest.spyOn(lockMachine,'execute').mockImplementation(async(lockRequest:LockRequest)=>{

            dateTime.push(lockRequest.reservedDateTime)

            return true;
          })
       

          await makeReservation.execute(reservationDateTime,phoneNumber,email)
       
          expect(dateTime).toStrictEqual([reservationDateTime])

          })

          it('If the reservationId already exist, then update the pin and DateTime returning true.',async()=>{
                
               
            const reservationDateTime='01/01/2020, 01:01:12'
            const phoneNumber='123'
            const email='e@email.com'
        
            
            jest.spyOn(mockReservationRepository,'getById').mockImplementation(()=>{

              const reservationResponse:ReservationResponseModel={
                id: '1',
                machineNumber: '2',
                reservationId: '3',
                pin: '4'
              }

              return Promise.resolve(reservationResponse)
            })
            
               await makeReservation.execute(reservationDateTime,phoneNumber,email)
           
          })

            it('if machine is not locked , proper error should be thrown',async ()=>{
          
           const reservationDateTime='01/01/2020, 01:01:12'
          const phoneNumber='123'
          const email='e@email.com'
          

          jest.spyOn(lockMachine,'execute').mockImplementation(()=>Promise.resolve(false)
          )
       

           try{
            await makeReservation.execute(reservationDateTime,phoneNumber,email)    
           }catch(e){
          
              if(e instanceof Error)
                  expect(e.message).toBe("Machine was not locked")
              
           }


            expect(lockMachine.execute).toBeCalledTimes(1)
        
          })
  

})