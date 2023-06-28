import { MakeReservationUseCase } from '../../interfaces/use-cases/reservation/make-reservation-use-case';
class MakeReservation implements MakeReservationUseCase{
  
  execute(reservationDateTime: string, phoneNumber: string, email: string): void {
    throw new Error('Method not implemented.');
  }
  
}