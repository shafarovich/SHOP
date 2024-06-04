import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { observer } from "mobx-react-lite";
import { FaVk, FaWhatsapp, FaPhone} from 'react-icons/fa'; // Import the shopping cart icon

const Footer = observer(() => {
    return (
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <div class="me-5 d-none d-lg-block">
                <span>Свяжитесь с нами в социальных сетях:</span>
                </div>
                <div 
                    className="d-flex align-items-center"
                    style={{
                        fontSize: 20,
                }}>
                    <a href='https://api.whatsapp.com/send?phone=79233337774' className='me-4 text-reset'>
                        <FaWhatsapp />
                    </a>
                    <a href='https://vk.com/koffee_and_cake?from=search' className='me-4 text-reset'>
                        <FaVk />
                    </a>
                </div>
            </section>

            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md="5" className='mx-auto mb-4 text-center'>
                            <p>ИП Алимова Юлия Игоревна</p>
                            <p>Кондитория "Торт и кофе" | г. Шарыпово | мкр.1 д.18</p>
                            <p>Работаем с 09:00-21:00 | Без выходных</p>
                            <p>Телефон/WhatsApp: <FaPhone/> 8-923-333-777-4</p>
                            <p>Это лучшее место забить на диету! Все права защищены</p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </MDBFooter>

    );
});

export default Footer;

// import React from 'react';
// import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
// import { observer } from "mobx-react-lite";


// const Footer = observer(() => {
//     return (
//     <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
//       <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
//         <div>
//           <a href='https://vk.com/koffee_and_cake?from=search' className='me-4 text-reset'>
//             <MDBIcon fab icon="vk" />
//           </a>
//         </div>
//       </section>

//       <section className=''>
//         <MDBContainer className='text-center text-md-start mt-5'>
//           <MDBRow className='mt-3'>
//             <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
//               <h6 className='text-uppercase fw-bold mb-4'>
//                 <MDBIcon icon="gem" className="me-3" />
//                 Company name
//               </h6>
//               <p>
//                 Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
//                 consectetur adipisicing elit.
//               </p>
//             </MDBCol>

//             <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
//               <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
//               <p>
//                 <a href='#!' className='text-reset'>
//                   Angular
//                 </a>
//               </p>
//               <p>
//                 <a href='#!' className='text-reset'>
//                   React
//                 </a>
//               </p>
//               <p>
//                 <a href='#!' className='text-reset'>
//                   Vue
//                 </a>
//               </p>
//               <p>
//                 <a href='#!' className='text-reset'>
//                   Laravel
//                 </a>
//               </p>
//             </MDBCol>

//             <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
//               <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
//               <p>
//                 <a href='#!' className='text-reset'>
//                   Pricing
//                 </a>
//               </p>
//               <p>
//                 <a href='#!' className='text-reset'>
//                   Settings
//                 </a>
//               </p>
//               <p>
//                 <a href='#!' className='text-reset'>
//                   Orders
//                 </a>
//               </p>
//               <p>
//                 <a href='#!' className='text-reset'>
//                   Help
//                 </a>
//               </p>
//             </MDBCol>

//             <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
//               <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
//               <p>
//                 <MDBIcon icon="home" className="me-2" />
//                 New York, NY 10012, US
//               </p>
//               <p>
//                 <MDBIcon icon="envelope" className="me-3" />
//                 info@example.com
//               </p>
//               <p>
//                 <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
//               </p>
//               <p>
//                 <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
//               </p>
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       </section>
//     </MDBFooter>
//   );

// })

// export default Footer;