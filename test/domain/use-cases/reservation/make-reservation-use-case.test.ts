import MakeReservation, { EmailService } from '../../../../src/domain/use-cases/reservation/MakeReservation';

describe('Make Reservation Use Case',()=>{

     class MockEmailService implements EmailService{

       send(emailAddress: string, machineNumber: string, reservationId: string, pin: string): void {
         throw new Error('Method not implemented.');
       }

     }

     beforeEach(()=>{

        mockEmailService = new MockEmailService()
        makeReservation = new MakeReservation(mockEmailService)

     })

     let mockEmailService:EmailService ;
     let makeReservation:MakeReservation ;
     
  describe('Make Reservation', () => {
    
    describe('Should Execute All Reservation Functions',()=>{
         
         it('should send reservation email',()=>{
        
           
          const reservationDateTime='01/01/2020, 01:01:12'
          const phoneNumber='123'
          const email='e@email.com'
          
          const emailRequest={
            reservationDateTime,
            phoneNumber,
            email
          }

          makeReservation.execute(reservationDateTime,phoneNumber,email)

          jest.spyOn(mockEmailService,'send').mockImplementation(()=>
            Promise.resolve(true)
          )

        



         })
      
   
        })

  })
  

})