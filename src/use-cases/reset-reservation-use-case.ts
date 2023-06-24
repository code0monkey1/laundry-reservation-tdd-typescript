import { ReservationRepository } from '../interfaces';
import { generateRandomPin } from '../utils/Random';

export interface ResetReservationUseCase {
  execute(reservationId: string): void;
}

export class ResetReservationInteractor implements ResetReservationUseCase {
  constructor(private reservationRepository: ReservationRepository) {}

  execute(reservationId: string): void {
    const reservation = this.reservationRepository.getById(reservationId);

    if (reservation) {
      reservation.pin = generateRandomPin();
      reservation.failedAttempts = 0;

      this.reservationRepository.update(reservation);
    }
  }
}