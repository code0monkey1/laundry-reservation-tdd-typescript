// src/repositories/ReservationRepository.ts
import { ReservationRepository } from '../interfaces';
import { Reservation } from '../models/Reservation';

export class InMemoryReservationRepository implements ReservationRepository {

  private reservations: Reservation[] = [];

  
  getAll(): Reservation[] {
    throw new Error('Method not implemented.');
  }

  save(reservation: Reservation): void {
    this.reservations.push(reservation);
  }

  getById(id: string): Reservation | undefined {
    return this.reservations.find((reservation) => reservation.id === id);
  }

  update(reservation: Reservation): void {
    const index = this.reservations.findIndex(
      (r) => r.id === reservation.id
    );
    if (index !== -1) {
      this.reservations[index] = reservation;
    }
  }
}