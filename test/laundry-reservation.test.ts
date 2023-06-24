
describe('laundry-reservation',()=>{

     
    describe('reserveMachine', () => {

        
        test('is defined',()=>{
             
             //Arrange
              const sut  = getLaundryReservation()

              //Act
              

              //Assert
            
        })
      
    })
    
     
})

interface ILaundryReservation{
   reserveMachine:(date:string,time:string,phone:string,email:string)=>void
}

function getLaundryReservation():ILaundryReservation {

  return {
     reserveMachine(data:string,time:string,phone:string,email:string){

      
     }
  }
}
