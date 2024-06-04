import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { createType } from "../../http/productAPI";

const CreateType = ({show, onHide}) => {
    const [value, setValue] = useState ('')

    const addType = () => {
        if (value.trim() !== '') { // Проверка на заполненность поля
            createType( {name: value}).then(data => {
                setValue('')
                onHide()
            })
        }
    }

    return(
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value = {value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название типа"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addType} disabled={value.trim() === ''}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateType;
