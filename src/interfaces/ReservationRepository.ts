import { Reservation } from '../models/Reservation';

export interface ReservationRepository {
  save(reservation: Reservation): void;
  getById(id: string): Reservation | undefined;
  update(reservation: Reservation): void;
  getAll(): Reservation[];
}