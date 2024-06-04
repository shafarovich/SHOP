import React, { useState, useEffect, useContext } from 'react';
import { Button, Container, Card, Row, Col, Table } from 'react-bootstrap';
import CreateProduct from '../components/modals/CreateProduct';
import CreateType from '../components/modals/CreateType';
import EditType from '../components/modals/EditType';
import { fetchTypes, delType, updateType } from '../http/productAPI';
import DeleteType from '../components/modals/DeleteType';
import { getAllFeedback, deleteFromFeedback } from '../http/productAPI';
import { Context } from '..';

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false);
    const [productVisible, setProductVisible] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const [modalShow, setModalShow] = useState(false); //удаление типа
    const [editModalShow, setEditModalShow] = useState(false); // Состояние для отображения модального окна редактирования категории
    const [feedbackList, setFeedbackList] = useState([]);
    const { product } = useContext(Context);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const feedback = await getAllFeedback();
                setFeedbackList(feedback);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFeedback();
    }, []);

    const handleDeleteFeedback = (id) => {
        deleteFromFeedback(id)
            .then(() => alert(`Отзыв успешно удален`))
            .then(() => setFeedbackList(feedbackList.filter(f => f.id !== id)));
    };

    return (
        <Container className='d-flex flex-column'>
            <h4 className='mt-3 p-2'>
                Управление типами товаров
            </h4>
            <Button
                variant={"outline-success"}
                className='mt-3 p-2'
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип товара
            </Button>
            <Button
                variant={"outline-danger"}
                className='mt-4 p-2'
                onClick={() => setModalShow(true)}
            >
                Удалить тип товра
            </Button>
            <Button
                variant={"outline-success"}
                className='mt-4 p-2'
                onClick={() => setEditModalShow(true)}
            >
                Редактировать тип товара
            </Button>
            <h4 className='mt-3 p-2' >
                Управление меню
            </h4>
            <Button
                variant={"outline-success"}
                className='mt-4 p-2'
                onClick={() => setProductVisible(true)}
            >
                Добавить товар
            </Button>

            <h4 className='mt-3 p-2'>
                Управление отзывами посетителей
            </h4>
            <Row>
                {feedbackList.map((feedback) => (
                    <Col key={feedback.id} lg={6} className="mb-4">
                        <Card className="mt-4 p-2">
                            <Card.Body>
                                <Card.Title>{feedback.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{feedback.email}</Card.Subtitle>
                                <Card.Text>{feedback.message}</Card.Text>
                                <div className="flex-row">
                                    <Button variant="outline-dark" onClick={() => handleDeleteFeedback(feedback.id)}> Удалить </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>


            <DeleteType show={modalShow} onHide={() => setModalShow(false)} fetchTypes={fetchTypes} delType={delType} />
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)} selectedType={selectedType} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <EditType show={editModalShow} onHide={() => setEditModalShow(false)} fetchTypes={fetchTypes} updateType={updateType} />
        </Container>
    );
};

export default Admin;