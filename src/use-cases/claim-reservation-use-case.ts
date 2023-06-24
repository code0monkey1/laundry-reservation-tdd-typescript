// src/usecases/ClaimReservationUseCase.ts
import { ReservationRepository } from '../interfaces';

export interface ClaimReservationUseCase {
  execute(machineId: number, pin: number): boolean;
}

export class ClaimReservationInteractor implements ClaimReservationUseCase {

  constructor(private reservationRepository: ReservationRepository) {}

  execute(machineId: number, pin: number): boolean {
    
    const reservation = this.reservationRepository
      .getAll()
      .find((r) => r.machineNumber === machineId && r.pin === pin);

    if (reservation) {
      if (reservation.used) {
        return false; // Reservation already claimed
      }

      reservation.used = true;
      this.reservationRepository.update(reservation);

      return true;
    }

    return false;
  }
  
}
