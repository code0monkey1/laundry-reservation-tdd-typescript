import MakeReservation from '../../../../src/domain/use-cases/reservation/MakeReservation';
describe('Make Reservation Use Case',()=>{
     
  describe('Make Reservation', () => {
    
    it.todo('should make reservation',()=>{
  
          const makeReservation = new MakeReservation()
           
          const reservationDateTime='01/01/2020, 01:01:12'
          const phoneNumber='123'
          const email='e@email.com'
          
         const result= makeReservation.execute(reservationDateTime,phoneNumber,email)
  
         expect(result).toBeTruthy()
   
        })

  })
  



})