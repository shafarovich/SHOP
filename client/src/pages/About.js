import React, { useState } from 'react';
import { submitFeedback } from '../http/productAPI';

const About = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'message' && value.length > 600) {
            alert('Сообщение не может содержать больше 600 символов');
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            await submitFeedback(formData);
            setSubmitted(true);
        } catch (error) {
            alert('Ошибка при отправки обратной связи');
        }
    };
    

    return (
        <div className="container mt-4">
            <div className="row">
                    <div className="col-md-1"></div>
                    
                    <div className="col-md-3" style={{ marginTop: '20px' }}>
                        <img
                            src="https://sun9-9.userapi.com/impf/c851420/v851420621/1a8986/fWRg_4Oifd4.jpg?size=340x319&quality=96&sign=1d11ebdc763d444792a0e0556b66938f&type=album"
                            className='figure-img img-fluid rounded shadow-3 mb-3'
                            alt="Фотография"
                            style={{ width: '250px' }}
                        />
                    </div>
                    
                    <div className="col-md-8" style={{ marginTop: '20px' }}>
                        <h3>«Торт и Кофе » — это уже больше, чем просто кондитория</h3>
                        <hr />
                        <h5>Мы создаем уютную атмосферу</h5>
                        <p>Приходите к нам, чтобы насладиться не только вкусными десертами, но и уютной атмосферой. </p>
                        <hr />
                        <h5>Мы заботимся о вас</h5>
                        <p>В нашей кондитерской мы не только готовим вкусные торты, но и заботимся о вашем здоровье. Мы используем только качественные и свежие ингредиенты, чтобы каждый десерт был не только вкусным, но и полезным.</p>
                    </div>            
                    
                    <div className="col-md-12" style={{ marginTop: '50px' }}>
                        <div className="bg-light p-3 mb-3">
                            <h3>О компании</h3>
                        </div>
                    </div>
                    
                    <div className="col-md-12 text-center">
                        <p>Мы гордимся своими рецептами и используем только высококачественные ингредиенты, чтобы угодить даже самому взыскательному гурману.</p>
                        <p>Посетите нашу кондитерскую «Торт и Кофе», и мы уверены, что это станет вашим любимым местом для встреч с друзьями и близкими.</p>
                    </div>

                    <div className="col-md-12 text-center">
                        <img
                            src="https://sun9-13.userapi.com/impg/F4_DIn8ZP2Vvvy2GNe-rSVpVoU_QxV5Tgv709g/OfF1vl3z3v4.jpg?size=605x807&quality=95&sign=c271b304e436aa260027d21f4ac14cc4&c_uniq_tag=dLSgMOR7eNycas2ewkRoMNqIQY5sSbL3eD3Kvtr2-aU&type=album"
                            className="img-fluid rounded shadow-3 m-3"
                            alt="Фотография 1"
                            style={{ width: '300px' }}
                        />
                        <img
                            src="https://sun9-18.userapi.com/impg/OaBcvpS2R--izHnC6Lg9QiDa_E3lwgN-VMjt7w/rUqeJKQWN1s.jpg?size=605x807&quality=95&sign=624dd986504129b35d048f038b074297&c_uniq_tag=kgulp5NuTEakLIFUG_DMwKknmoVnxTshhpVxJr4T5s4&type=album"
                            className="img-fluid rounded shadow-3 m-3"
                            alt="Фотография 2"
                            style={{ width: '350px' }}
                        />
                        <img
                            src="https://sun9-9.userapi.com/impg/LjQ9T17kkAHRVXRXeDo1pB-No7fBkV6fGmIQkw/V1MxPp0OpXM.jpg?size=605x807&quality=95&sign=33f494ecf20ce54ca164eeb0983f4b8a&c_uniq_tag=EM4-rhaW4uFTO4pY58QSQPuVCJG-FJ3EaYBWdSUOLjI&type=album"
                            className="img-fluid rounded shadow-3 m-3"
                            alt="Фотография 3"
                            style={{ width: '300px' }}
                        />
                    </div>

                    <div className="col-md-12" style={{ marginTop: '50px' }}>
                        <div className="bg-light p-3 mb-3">
                            <h3>Форма обратной связи</h3>
                        </div>
                    </div>

                    {submitted ? (
                        <div className="col-md-12 text-center" style={{ marginTop: '50px' }}>
                            <h3>Спасибо за отзыв!</h3>
                        </div>
                    ) : (

                    <div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email адрес:</label>
                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Имя:</label>
                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Сообщение:</label>
                            <textarea className="form-control" id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
                        </div>
                        <button type="submit" class="btn btn-dark">Отправить</button>
                    </form>
                    </div>
                )}
                
                    <div  style={{ marginTop: '50px' }}></div>
                </div>
            </div>
    );
};

export default About;
