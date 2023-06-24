
describe('laundry-reservation',()=>{

     
    describe('createReservation', () => {

        
        test('is defined',()=>{
             
             //Arrange
              const sut  = getLaundryReservation()

              //Act //Assert
              expect(sut.createReservation).toBeInstanceOf(Function)
            
        })


      
    })
    
     
})

interface ILaundryReservation{
   createReservation:(date:string,time:string,phone:string,email:string)=>void
}

function getLaundryReservation():ILaundryReservation {

  return {
     createReservation(data:string,time:string,phone:string,email:string){


     }
  }
}
