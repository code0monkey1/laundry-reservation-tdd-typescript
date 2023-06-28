import { ReservationRepository, ReservationRequestModel } from '../../../../src/domain/interfaces/repositories/reservation-repository';
import { LockMachine, MachineDevice } from '../../../../src/domain/use-cases/machine/LockMachine';
describe('Lock Machine Use Case',()=>{
      
      class MockReservationRepository implements ReservationRepository{
            save(reservation: ReservationRequestModel): void {
                  throw new Error('Method not implemented.');
            }
            
      }

      class MockMachineDevice implements MachineDevice{

            lock(reservationId: string, reservationDateTime: string, pin: string): boolean {
                  throw new Error('Method not implemented.');
            }
            unlock(reservationId: string): void {
                  throw new Error('Method not implemented.');
            }
            
      }


      beforeEach(()=>{


      })

      let mockMachineDevice :MachineDevice
      let mockReservationRepository:ReservationRepository
    
      it('Returns true if the machine was unlocked and could be locked at the specified DateTime via the SDK ',()=>{

         //Arrange
         const machine = new LockMachine(mockReservationRepository,mockMachineDevice,)

         //Act

         //Assert
      })

      it.todo('If the reservationId already exist, then update the pin and DateTime returning true.')

      it.todo('In all other cases return false')
     
})