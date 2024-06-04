import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Card, Row, Col, Button, Image, Form } from 'react-bootstrap';
import { Context } from '../';
import { deleteFromBasket, getBasket, updateQuantity, getUserOrder, getUserOrderList } from '../http/productAPI';
import CreateOrder from "../components/modals/CreateOrder";
import { NavLink } from 'react-router-dom';
import { SHOP_ROUTE } from "../utils/consts";

const Basket = observer(() => {
    const { product, user, a } = useContext(Context);
    const [orderVisible, setOrderVisible] = useState(false);

    useEffect(() => {
        getBasket().then(data => product.setBaskets(data));
        getUserOrder(user.isUser).then(data => {
            const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            product.setOrders(sortedOrders);
        });
        getUserOrderList(product._selectedOrder).then(data => product.setOrdersList(data));
    }, [product, product._selectedOrder, a]);

    const refreshPage = () => { window.location.reload(); };

    const _delete = (id) => {
        deleteFromBasket(id).then(data => {
            alert(`Товар удален из корзины`);
            refreshPage();
        });
    };

    const handleQuantityChange = (id, newQuantity) => {
        updateQuantity(id, newQuantity).then(response => {
            refreshPage();
        });
    };

    const handleIncreaseQuantity = (id, currentQuantity) => {
        handleQuantityChange(id, currentQuantity + 1);
    };

    const handleDecreaseQuantity = (id, currentQuantity) => {
        if (currentQuantity > 1) {
            handleQuantityChange(id, currentQuantity - 1);
        }
    };

    let prices = product.basket.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center mt-3">
            <h2 className="pb-2 text-center">Корзина</h2>
            {product.basket.length === 0 ? (
                <div className="text-center" style={{ marginTop: '20px', marginBottom: '100px' }}>
                    <h5 className="pt-2 pb-2">Ваша корзина пустая</h5>
                    <Button as={NavLink} to={SHOP_ROUTE} variant="second" className="mt-1">
                        На главную
                    </Button>                
                </div>
            ) : (
                <Card className="d-flex flex-row p-2 justify-content-between align-items-center mb-2">
                    <h2 className="align-self-end">Всего:</h2>
                    <h2 className="ms-3 align-self-end">{prices} <span className="font-weight-light pl-2">руб.</span></h2>
                </Card>
            )}

            {product.basket.map(item => (
                <Card className="p-3 mb-2 w-100" key={item.id}>
                    <Row className="justify-content-center align-items-center">
                        <Col xs={12} md={2} className="d-flex justify-content-center mb-2 mb-md-0">
                            <Image src={process.env.REACT_APP_API_URL + item.product.img} alt="img not found" fluid />
                        </Col>
                        <Col xs={12} md={3} className="d-flex flex-column justify-content-center align-items-center text-center mb-2 mb-md-0">
                            <h3>{item.product.name}</h3>
                        </Col>
                        <Col xs={12} md={2} className="d-flex flex-column justify-content-center align-items-center text-center mb-2 mb-md-0">
                            <h3 className="font-weight-light">{item.product.price} руб.</h3>
                        </Col>
                        <Col xs={12} md={3} className="d-flex flex-column justify-content-center align-items-center text-center mb-2 mb-md-0">
                            <div className="d-flex align-items-center">
                                <Button variant="outline-secondary" onClick={() => handleDecreaseQuantity(item.id, item.quantity)}>-</Button>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    readOnly
                                    className="mx-2 text-center"
                                    style={{ width: '60px' }}
                                />
                                <Button variant="outline-secondary" onClick={() => handleIncreaseQuantity(item.id, item.quantity)}>+</Button>
                            </div>
                        </Col>
                        <Col xs={12} md={2} className="d-flex flex-column justify-content-center align-items-center text-center">
                            <Button variant="outline-danger" onClick={() => _delete(item.id)}>Удалить</Button>
                        </Col>
                    </Row>
                </Card>
            ))}
            {product.basket.length > 0 && <Row className="pt-3 pb-4 text-center w-100"><Button variant="outline-success" onClick={() => setOrderVisible(true)}>Оформить заказ</Button></Row>}

            {product.order.length > 0 && (<h2 className="pt-5 pb-2 text-center">Ваши заказы</h2>)}

            {product.order.map(item => (
                <Card className="pb-3 mb-3 w-100" key={item.id}>
                    <Row className="m-3">
                        <Row>
                            <Col className="mt-3"><strong><h4>Номер заказа: {item.id}</h4></strong></Col> 
                        </Row>
                        <hr />
                        <Row className="w-100 pb-1">
                            <Col className="mt-3">Адрес получения</Col>
                            <Col className="mt-3">Время и дата создания</Col>
                            <Col className="mt-3">Статус заказа</Col>
                        </Row>
                        <Row>
                            <Col><h4>{item.address}</h4></Col>
                            <Col><h4>{new Date(item.createdAt).toLocaleString()}</h4></Col>
                            <Col>
                                {{
                                    '0': <h4>Закрыт</h4>,
                                    '1': <h4>В обработке</h4>,
                                    '2': <h4>Передан в доставку</h4>,
                                    '3': <h4>Готов к выдаче</h4>,
                                    '4': <h4>Завершен</h4>
                                }[item.status]}
                                <Button
                                    className="w-75 mt-2"
                                    variant="outline-dark"
                                    onClick={() => {
                                        if (product.selectedOrder === item.id) {
                                            product.setSelectedOrder(null); // закрыть детали, если уже открыты
                                        } else {
                                            product.setSelectedOrder(item.id); // открыть детали, если закрыты
                                        }
                                    }}
                                >
                                    {product.selectedOrder === item.id ? 'Скрыть детали заказа' : 'Детали заказа'}
                                </Button>
                            </Col>
                        </Row>
                    </Row>
                    {item.id === product.selectedOrder &&
                        <>
                            <hr />
                            <Row className="p-3">
                                <Col><strong>Название товара</strong></Col>
                                <Col><strong>Цена/ Количество</strong></Col>
                                <Col><strong>Общая стоимость</strong></Col>
                            </Row>
                            {product._orders_lists.map(orderItem =>
                                <Row className="p-3" key={orderItem.id}>
                                        <Col className="mt-3">{orderItem.product.name}</Col>
                                        <Col className="mt-3">{orderItem.product.price} руб. x {orderItem.quantity}</Col>
                                        <Col className="mt-3">{orderItem.product.price * orderItem.quantity} руб.</Col>
                                </Row>
                            )}
                            <hr />
                            {item.id === product.selectedOrder &&
                                <Row className="d-flex p-2 mb-1">
                                    <h4 className="align-self-end">Общая сумма заказа: {product._orders_lists.reduce((total, orderItem) => total + (orderItem.product.price * orderItem.quantity), 0)} руб.</h4>
                                </Row>
                            }
                        </>
                    }
                </Card>
            ))}

            <CreateOrder show={orderVisible} onHide={() => setOrderVisible(false)} />
        </Container>
    );
});

export default Basket;
