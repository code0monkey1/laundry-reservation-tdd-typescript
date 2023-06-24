import { Reservation } from "./Reservation";

export interface ILaundryReservation{
       reserve(machineId:number,pin:number):void
}


class LaundryReservation implements ILaundryReservation {
      
       private reservation:Reservation[]
       constructor(reservation:Reservation[]){
         this.reservation=reservation
       }

       reserve(machineId:number,pin:number){


       }




}


export default LaundryReservation;


