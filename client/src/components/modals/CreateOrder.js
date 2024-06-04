import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { Context } from '../../index';
import { addOrder } from '../../http/productAPI';
import { observer } from 'mobx-react-lite';

const CreateOrder = observer(({ show, onHide }) => {
    const { user } = useContext(Context);
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [house, setHouse] = useState('');
    const [apartment, setApartment] = useState('');
    const [floor, setFloor] = useState('');
    const [deliveryType, setDeliveryType] = useState('pickup'); // 'pickup' or 'delivery'
    const [phoneError, setPhoneError] = useState('');
    const [addressError, setAddressError] = useState('');
    const id = user.isUser;

    const validatePhone = (phone) => {
        const phoneRegex = /^(?:\+7|7|8)?(?:\s|-)?\(?(9\d{2})\)?(?:\s|-)?(\d{3})(?:\s|-)?(\d{2})(?:\s|-)?(\d{2})$/;
        return phoneRegex.test(phone);
    };

    const validateAddress = () => {
        if (deliveryType === 'delivery' && (!street || !house || !apartment || !floor)) {
            setAddressError('Заполните все поля адреса.');
            return false;
        }
        return true;
    };

    const createOrder = () => {
        if (!validatePhone(phone)) {
            setPhoneError('Некорректный номер телефона.');
            return;
        }

        if (!validateAddress()) {
            return;
        }

        const formData = new FormData();
        try {
            const delivery = deliveryType === 'pickup' ? 'Самовывоз' : `${street}, д.${house}, кв.${apartment}, эт.${floor}`;
            addOrder(id, phone, delivery, deliveryType === 'delivery' ? `${street}, д.${house}, кв.${apartment}, эт.${floor}` : '').then((data) => onHide());
            window.location.reload();
        } catch (e) {
            alert(e);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Оформление заказа</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                            setPhoneError('');
                        }}
                        className="mt-3"
                        placeholder="Введите номер телефона +7 (999) 999-99-99"
                        isInvalid={phoneError !== ''}
                    />
                    {phoneError && <Form.Text className="text-danger">{phoneError}</Form.Text>}
                    <Form.Check
                        className="mt-3"
                        type="radio"
                        label="Самовывоз"
                        name="deliveryType"
                        id="pickup"
                        checked={deliveryType === 'pickup'}
                        onChange={() => {
                            setDeliveryType('pickup');
                            setAddressError('');
                            setStreet('');
                            setHouse('');
                            setApartment('');
                            setFloor('');
                        }}
                    />

                    <Form.Check
                        className="mt-3"
                        type="radio"
                        label="Доставка"
                        name="deliveryType"
                        id="delivery"
                        checked={deliveryType === 'delivery'}
                        onChange={() => setDeliveryType('delivery')}
                    />
                    {deliveryType === 'delivery' && (
                        <>
                            <Form.Control
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                className="mt-3"
                                placeholder="Улица"
                            />
                            <Form.Control
                                value={house}
                                onChange={(e) => setHouse(e.target.value)}
                                className="mt-3"
                                placeholder="Дом"
                            />
                            <Form.Control
                                value={apartment}
                                onChange={(e) => setApartment(e.target.value)}
                                className="mt-3"
                                placeholder="Квартира"
                            />
                            <Form.Control
                                value={floor}
                                onChange={(e) => setFloor(e.target.value)}
                                className="mt-3"
                                placeholder="Этаж"
                            />
                        </>
                    )}
                    {addressError && <Form.Text className="text-danger">{addressError}</Form.Text>}
                </Form>
                <div className="mt-3">
                    <p>После оформления заказа вам поступит звонок на указанный номер для его подтверждения</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={createOrder}>
                    Отправить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateOrder;
