import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../';
import { getOrder, getUserOrderList, updateUserOrder } from '../http/productAPI';
import { Button, Card, Col, Container, Dropdown, Row, DropdownButton } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const Order = observer(() => {
    const { product, user, a } = useContext(Context);
    const [orderVisible, setOrderVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');

    const filterOptions = [
        { key: 'all', label: 'Все' },
        { key: 'today', label: 'Сегодня' },
        { key: 'week', label: 'Неделя' },
        { key: 'month', label: 'Месяц' }
    ];

    useEffect(() => {
        getOrder(user.isUser).then(data => product.setOrders(data));
        getUserOrderList(product._selectedOrder).then(data => product.setOrdersList(data));
    }, [product, product._selectedOrder, a]);

    const filterOrders = (orders, filter) => {
        const now = new Date();
        return orders.filter(order => {
            const orderDate = new Date(order.createdAt);
            switch (filter) {
                case 'today':
                    return orderDate.toDateString() === now.toDateString();
                case 'week':
                    const oneWeekAgo = new Date(now);
                    oneWeekAgo.setDate(now.getDate() - 7);
                    return orderDate >= oneWeekAgo;
                case 'month':
                    const oneMonthAgo = new Date(now);
                    oneMonthAgo.setMonth(now.getMonth() - 1);
                    return orderDate >= oneMonthAgo;
                default:
                    return true;
            }
        });
    };

    const sortedOrders = filterOrders(product.order.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), selectedFilter);

    const updateOrders = async (orderId, newStatus) => {
        try {
            await updateUserOrder(orderId, newStatus);
            const updatedOrders = await getOrder(user.isUser);
            const orderedUpdatedOrders = product.order.map((order) =>
                updatedOrders.find((updatedOrder) => updatedOrder.id === order.id)
            );
            product.setOrders(orderedUpdatedOrders);
        } catch (error) {
            console.error(error);
        }
    };

    const statuses = [
        { id: '0', name: 'Закрыт' },
        { id: '1', name: 'В обработке' },
        { id: '2', name: 'Передан в доставку' }, 
        { id: '3', name: 'Готов к выдаче' },
        { id: '4', name: 'Завершен' }
    ];
    

    const selectedFilterLabel = filterOptions.find(option => option.key === selectedFilter)?.label || 'Все';

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center mt-3">
            <h2 className="pt-3 pb-2 text-center">Все заказы</h2>
            <DropdownButton
                title={selectedFilterLabel}
                className="mb-3"
                variant="outline-dark"
                onSelect={(eventKey) => setSelectedFilter(eventKey)}
            >
                {filterOptions.map(option => (
                    <Dropdown.Item key={option.key} eventKey={option.key}>{option.label}</Dropdown.Item>
                ))}
            </DropdownButton>
            {sortedOrders.map(item => {
                let total = product._orders_lists
                    .filter(orderItem => orderItem.orderId === item.id)
                    .reduce((sum, orderItem) => sum + orderItem.product.price * orderItem.quantity, 0);

                return (
                    <Card className="w-100 pb-3 mb-3" key={item.id}>
                        <Row className="p-3">
                            <Row>
                                <Col className="mt-3"><strong><h4>Номер заказа: {item.id}</h4></strong></Col> 
                            </Row>
                            <hr />
                            <Row className="w-100 pb-1">
                                <Col className="mt-3"><strong>Телефон</strong></Col>
                                <Col className="mt-3"><strong>Адрес</strong></Col>
                                <Col className="mt-3"><strong>Дата и время создания</strong></Col>
                                <Col className="mt-3"><strong>Статус</strong></Col>
                            </Row>
                            <Row className="w-100 pb-1">
                                <Col><h5>{item.phone}</h5></Col>
                                <Col><h5>{item.address}</h5></Col>
                                <Col><h5>{new Date(item.createdAt).toLocaleString()}</h5></Col>
                                <Col>
                                    <h5>
                                        {{
                                            '0': 'Закрыт',
                                            '1': 'В обработке',
                                            '2': 'Передан в доставку',
                                            '3': 'Готов к выдаче',
                                            '4': 'Завершен'
                                        }[item.status]}
                                    </h5>
                                    {/* <Button className="w-75 mt-2" variant="outline-dark" onClick={() => product.setSelectedOrder(item.id)}>Детали заказа</Button> */}
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

                                    <DropdownButton
                                        title={statuses.find(status => status.id === item.status)?.name || 'Выберите статус'}
                                        className="mt-2"
                                        variant="outline-dark"
                                        onSelect={(eventKey) => updateOrders(item.id, eventKey)}
                                    >
                                        {statuses.map(status =>
                                            <Dropdown.Item key={status.id} eventKey={status.id}>{status.name}</Dropdown.Item>
                                        )}
                                    </DropdownButton>
                                </Col>
                            </Row>
                        </Row>

                        {item.id === product.selectedOrder &&
                            <>
                                <hr />
                                <Row className="p-3">
                                    <Col><strong>id товара</strong></Col>
                                    <Col><strong>Название товара</strong></Col>
                                    <Col><strong>Цена/ Количество</strong></Col>
                                    <Col><strong>Общая стоимость</strong></Col>
                                </Row>
                                {product._orders_lists
                                    .filter(orderItem => orderItem.orderId === item.id)
                                    .map(orderItem => orderItem.product && (
                                        <Row className=" p-3" key={orderItem.product.id}>
                                                <Col className="mt-3">{orderItem.product.id}</Col>
                                                <Col className="mt-3">{orderItem.product.name}</Col>
                                                <Col className="mt-3">{orderItem.product.price} руб. x {orderItem.quantity}</Col>
                                                <Col className="mt-3">{orderItem.product.price * orderItem.quantity} руб.</Col>
                                        </Row>
                                    ))
                                }
                                <hr />
                                <Row className="d-flex p-2 mb-1">
                                    <h4 className="m-0">Общая сумма заказа: {total} руб.</h4>
                                </Row>
                            </>
                        }
                    </Card>
                );
            })}
        </Container>
    );
});

export default Order;
