
describe('laundry-reservation',()=>{

     
    describe('createReservation', () => {

        
        test('is defined',()=>{
             
             //Arrange
              const sut  = getLaundryReservation()

              //Act //Assert
              expect(sut.createReservation).toBeInstanceOf(Function)
            
        })

        test('Takes in Reservation date and time,Cell phone number,Email address',()=>{

           //Arrange
              const sut  = getLaundryReservation()

           //Act 
             const date = new Date ( 1,1,1,1,1,1)
             const phone='1'
             const email ='email'
    
            const result = sut.createReservation(date,phone,email)
              
            //Assert
            
             

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
