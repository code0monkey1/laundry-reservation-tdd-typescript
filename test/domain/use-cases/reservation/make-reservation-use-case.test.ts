import MakeReservation, { EmailRequest, EmailService } from '../../../../src/domain/use-cases/reservation/MakeReservation';

describe('Make Reservation Use Case',()=>{

     class MockEmailService implements EmailService{

       send(emailRequest: EmailRequest): void {
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
          
          const emailRequest:EmailRequest={
            machineNumber: '1',
            reservationId: '12',
            emailAddress: email,
            pin: '12345'
          }

          jest.spyOn(mockEmailService,'send').mockImplementation(()=>
            Promise.resolve(true)
          )

          makeReservation.execute(reservationDateTime,phoneNumber,email)

          expect(mockEmailService.send).toBeCalledWith(emailRequest)

         })
      
   
        })

  })
  

})