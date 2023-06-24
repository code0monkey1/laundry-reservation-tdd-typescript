export interface MachineDevice {
  lock(reservationId: string, reservationDateTime: Date, pin: number): boolean;
  unlock(reservationId: string): void;
}
