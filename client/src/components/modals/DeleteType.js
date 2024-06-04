import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const DeleteType = ({ show, onHide, fetchTypes, delType }) => {
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        const fetchTypesData = async () => {
            const typesData = await fetchTypes();
            setTypes(typesData);
        };
        fetchTypesData();
    }, [fetchTypes]);

    const handleDelete = async () => {
        if (selectedType) {
            try {
                await delType(selectedType.id);
                const updatedTypes = types.filter(type => type.id !== selectedType.id);
                setTypes(updatedTypes);
                setSelectedType(null);
                onHide();
            } catch (error) {
                console.error('Ошибка при удалении типа товара:', error);
            }
        }
    };

    const handleChange = (event) => {
        const typeId = event.target.value;
        const selected = types.find(type => type.id === Number(typeId));
        setSelectedType(selected);
    };

    return (
        <Modal 
            show={show} 
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Выберите тип для удаления
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Select 
                    onChange={handleChange} 
                    value={selectedType?.id}>
                    <option value="">Выберите тип</option>
                    {types.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-danger" onClick={handleDelete} disabled={!selectedType}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteType;
