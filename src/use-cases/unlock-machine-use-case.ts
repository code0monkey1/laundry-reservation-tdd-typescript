// src/usecases/UnlockMachineUseCase.ts

import { MachineDevice, ReservationRepository } from '../interfaces';

export interface UnlockMachineUseCase {
  execute(machineNumber: number, reservationId: string): void;
}

export class UnlockMachineInteractor implements UnlockMachineUseCase {
  constructor(
    private machineDevice: MachineDevice,
    private reservationRepository: ReservationRepository
  ) {}

  execute(machineNumber: number, reservationId: string): void {

    const reservation = this.reservationRepository.getById(reservationId);
    
    if (reservation && reservation.machineNumber === machineNumber) {
      this.machineDevice.unlock(reservationId);
    }
  }
}
