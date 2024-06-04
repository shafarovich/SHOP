import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditType = ({ show, onHide, fetchTypes, updateType }) => {
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [newName, setNewName] = useState('');

    useEffect(() => {
        const fetchTypesData = async () => {
            const typesData = await fetchTypes();
            setTypes(typesData);
        };
        fetchTypesData();
    }, [fetchTypes]);

    const handleEdit = async () => {
        if (selectedType && newName.trim() !== '') { // Проверка на заполненность поля
            try {
                await updateType(selectedType.id, { name: newName });
                const updatedTypes = types.map(type =>
                    type.id === selectedType.id ? { ...type, name: newName } : type
                );
                setTypes(updatedTypes);
                setSelectedType(null);
                setNewName('');
                onHide();
            } catch (error) {
                console.error('Ошибка при редактировании категории товара:', error);
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
                    Редактировать тип товара
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
                {selectedType && (
                    <Form.Control
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Новое название"
                        className="mt-3"
                    />
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={handleEdit} disabled={!selectedType || newName.trim() === ''}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditType;
