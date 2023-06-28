 import { v4 as uuid } from 'uuid';
 
  export function getMachineNumber(){
      return uuid()
  }

  export function getReservationId(){
       // uuid will be returned from here in the future
        return uuid()
  }


  export function getPin(){
      return uuid()
  }

  export function getReservedDateTime(){
      return '01/01/2020,01:03:12'
  }