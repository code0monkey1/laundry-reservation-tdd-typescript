import { Reservation } from "./Reservation"

export interface IDataBase{

      create(reservation:Reservation):Promise<void>
      read(id:number):Promise<void>

      update(id:number):void

      remove(id:number):void
}

 class DataBase implements IDataBase{
  
   create(reservation: Reservation): Promise<void> {
     throw new Error("Method not implemented.")
   }
   read(id: number): Promise<void> {
     throw new Error("Method not implemented.")
   }
   update(id: number): void {
     throw new Error("Method not implemented.")
   }
   remove(id: number): void {
     throw new Error("Method not implemented.")
   }
    
      

}

export default DataBase