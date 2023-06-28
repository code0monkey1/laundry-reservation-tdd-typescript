import { LockMachineUseCase } from "../../../../src/domain/interfaces/use-cases/machine/lock-machine-use-case";

class LockMachine implements LockMachineUseCase{
  
  execute(reservationId: string, machineNumber: string, reservationDateTime: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}