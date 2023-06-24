describe('laundry-reservation-api', () => {
      
       
       
})


interface IReservation{
     reserve(machineId:number,pin:number):void
}
function getReservationApi():IReservation{
    
    return {

        reserve(machineId:number,pin:number){
            
        }
    }


}