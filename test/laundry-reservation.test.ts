
describe('laundry-reservation',()=>{

     
    describe('reserveMachine', () => {

        
        test('is defined',()=>{
             
             //Arrange
              const sut  = getLaundryReservation()

              //Act //Assert
              expect(sut.reserveMachine).toBeInstanceOf(Function)
            
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
