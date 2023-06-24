describe('laundry-reservation-api', () => {
      
         describe('reserve', () => {
             
              test('is defined',()=>{

                   const sut = getReservationApi()

                   expect(sut.reserve).toBeInstanceOf(Function)

              })

              
         })
          
         
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