import MakeReservation from '../../../../src/domain/use-cases/reservation/MakeReservation';
describe('Make Reservation Use Case',()=>{
     
  describe('Make Reservation', () => {
    
    describe('Should Execute All Reservation Functions',()=>{
         
         it.todo('should send reservation email',()=>{
             
          const makeReservation = new MakeReservation()
           
          const reservationDateTime='01/01/2020, 01:01:12'
          const phoneNumber='123'
          const email='e@email.com'
          
          makeReservation.execute(reservationDateTime,phoneNumber,email)

         })
       
  
   
        })

  })
  



})