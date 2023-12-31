import { ReservationRepository, ReservationRequestModel, ReservationResponseModel } from '../../../../src/domain/interfaces/repositories/reservation-repository';
import { LockMachine, MachineDevice } from '../../../../src/domain/use-cases/machine/LockMachine';
import { LockRequest } from '../../../../src/domain/use-cases/reservation/MakeReservation';
import { getMachineNumber, getReservationId, getReservedDateTime } from '../../../../src/domain/utils';

describe('Lock Machine Use Case',()=>{
      
      class MockReservationRepository implements ReservationRepository{
            
            getById(id: string): Promise<ReservationResponseModel>|null {
                
              const reservationModel:ReservationResponseModel={
                       id: '',
                       machineNumber: '',
                       reservationId: '',
                       pin: ''
                 }  
                  return Promise.resolve(reservationModel)
            }
            save(_reservation: ReservationRequestModel): void {
                  throw new Error('Method not implemented.');
            }
            
      }

      class MockMachineDevice implements MachineDevice{

            lock(_reservationId: string, _reservationDateTime: string, _pin: string): boolean {
                  return true
            }
            unlock(_reservationId: string): void {
                  throw new Error('Method not implemented.');
            }
            
      }


      beforeEach(()=>{
       jest.clearAllMocks()

       mockMachineDevice = new MockMachineDevice()
       mockReservationRepository=new MockReservationRepository()

      })

      let mockMachineDevice :MachineDevice
      let mockReservationRepository:ReservationRepository
    
      it('Returns true if the machine was unlocked and could be locked at the specified DateTime via the SDK ',async()=>{

         //Arrange
         const lockMachine = new LockMachine(mockReservationRepository,mockMachineDevice)
          
         const lockRequest:LockRequest={
               reservationId: getReservationId(),
               machineNumber: getMachineNumber(),
               reservedDateTime: getReservedDateTime()
         }
       
         //Act
        const result= await lockMachine.execute(lockRequest)

         //Assert
        expect(result).toBeTruthy()
         
      })

      it('In all other cases return false',async()=>{
   
                //Arrange
         const lockMachine = new LockMachine(mockReservationRepository,mockMachineDevice)
          
         const lockRequest:LockRequest={
               reservationId: getReservationId(),
               machineNumber: getMachineNumber(),
               reservedDateTime: getReservedDateTime()
         }
          
         jest.spyOn(mockReservationRepository,'getById').mockImplementation(()=>{
           
             return null
            
         })
         
         //Act
        const result= await lockMachine.execute(lockRequest)

         //Assert
        expect(result).not.toBeTruthy()
         
      })
     
})