// src/usecases/CreateReservationUseCase.ts
import { ReservationRepository } from '../interfaces';
import { Reservation } from '../models/Reservation';
import { generateGuid } from '../utils/Guid';
import { generateRandomPin, getRandomMachineNumber } from '../utils/Random';

export interface CreateReservationUseCase {
  execute(
    reservationDateTime: Date,
    phoneNumber: string,
    email: string
  ): Reservation;
}

export class CreateReservationInteractor implements CreateReservationUseCase {
  constructor(private reservationRepository: ReservationRepository) {}

  execute(
    reservationDateTime: Date,
    phoneNumber: string,
    email: string
  ): Reservation {
    
    const reservation: Reservation = {
      id: generateGuid(),
      machineNumber: getRandomMachineNumber(),
      reservationDateTime,
      pin: generateRandomPin(),
      phoneNumber,
      email,
      used: false,
      failedAttempts: 0,
    };

    this.reservationRepository.save(reservation);

    return reservation;
  }
}