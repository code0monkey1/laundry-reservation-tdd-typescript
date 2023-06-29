import UnlockMachine from "../../../../src/domain/use-cases/machine/UnlockMachine"
import { getMachineNumber, getReservationId } from "../../../../src/domain/utils"

describe('Unlock Machine Use Case', () => {
      
    test('unlocks machine given the machine number and reservation id',()=>{
     
          //Arrange
          const unlockMachine = new UnlockMachine()
          const machineNumber = getMachineNumber()
          const reservationId = getReservationId()
          
          jest.spyOn(unlockMachine,'execute').mockImplementation(()=>{

                Promise.resolve(true)
          })

          //Act
          unlockMachine.execute(machineNumber,reservationId)
          

          //Assert

    })
})
