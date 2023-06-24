import { MachineDevice, ReservationRepository } from '../interfaces';

export interface LockMachineUseCase {
  execute(machineNumber: number, reservationId: string): boolean;
}

export class LockMachineInteractor implements LockMachineUseCase {
  constructor(
    private readonly machineDevice: MachineDevice,
    private readonly reservationRepository: ReservationRepository
  ) {}

  execute(machineNumber: number, reservationId: string): boolean {

    const reservation = this.reservationRepository.getById(reservationId);
    
    if (reservation && reservation.machineNumber === machineNumber) {
      
      const locked = this.machineDevice.lock(
        reservationId,
        reservation.reservationDateTime,
        reservation.pin
      );

      if (locked) {
        return true;
      }

    }
    return false;
  }
}