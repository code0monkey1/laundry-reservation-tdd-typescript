import { IDataBase } from "./DataBase";
import { Reservation } from "./Reservation";

export interface ILaundryReservation{
       reserve(machineId:number,pin:number):void
}


class LaundryReservation implements ILaundryReservation {
      
       constructor(private readonly reservations:Reservation[], private readonly db:IDataBase){}

       reserve(machineId:number,pin:number){
          
            //  const machine = this.db.read()
     
       }

}


export default LaundryReservation;


