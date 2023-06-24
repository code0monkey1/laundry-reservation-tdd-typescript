
describe('laundry-reservation',()=>{

     
    describe('createReservation', () => {

        
        test('is defined',()=>{
             
             //Arrange
              const sut  = getLaundryReservation()

              //Act //Assert
              expect(sut.createReservation).toBeInstanceOf(Function)
            
        })

        test('Takes in Reservation date and time,Cell phone number,Email address',()=>{




        })


      
    })
    
     
})

interface ILaundryReservation{
   createReservation:(dateTime:Date,phone:string,email:string)=>void
}

function getLaundryReservation():ILaundryReservation {

  return {
     createReservation(dateTime:Date,phone:string,email:string){


     }
  }
}
