import { ReservationRepository, ReservationRequestModel, ReservationResponseModel } from '../../../../src/domain/interfaces/repositories/reservation-repository';
import { LockMachine, MachineDevice } from '../../../../src/domain/use-cases/machine/LockMachine';
import { LockRequest } from '../../../../src/domain/use-cases/reservation/MakeReservation';

describe('Lock Machine Use Case',()=>{
      
      class MockReservationRepository implements ReservationRepository{
            getById(id: string): Promise<ReservationResponseModel> {
                  throw new Error('Method not implemented.');
            }
            save(_reservation: ReservationRequestModel): void {
                  throw new Error('Method not implemented.');
            }
            
      }

      class MockMachineDevice implements MachineDevice{

            lock(_reservationId: string, _reservationDateTime: string, _pin: string): boolean {
                  throw new Error('Method not implemented.');
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
               reservationId: '',
               machineNumber: '',
               reservedDateTime: ''
         }
         
         lockMachine.execute(lockRequest)
         
      })

      it.todo('If the reservationId already exist, then update the pin and DateTime returning true.')

      it.todo('In all other cases return false')
     
})