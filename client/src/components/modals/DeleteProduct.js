// import React, { useContext } from 'react';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import { delProduct } from '../../http/productAPI';
// import { Context } from '../..';

// const DeleteProduct = ({ show, onHide, productId }) => {
//     const { product } = useContext(Context);

//     const handleDelete = async () => {
//         try {
//             await delProduct(productId);
//             product.setProducts(product.products.filter(p => p.id !== productId)); // Удаление товара из списка после успешного удаления на сервере
//             onHide(); // Закрытие модального окна
//         } catch (error) {
//             console.error('Failed to delete product:', error);
//         }
//     };

//     return (
//         <Modal show={show} onHide={onHide}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Удаление товара</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>Вы уверены, что хотите удалить этот товар?</Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={onHide}>
//                     Отмена
//                 </Button>
//                 <Button variant="danger" onClick={handleDelete}>
//                     Удалить
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default DeleteProduct;


// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
// import { delProduct, fetchProductsByType } from '../../http/productAPI';

// const DeleteProduct = ({ show, onHide }) => {
//     const [products, setProducts] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         fetchProductsByType(selectedType.id).then((data) => {
//             setProducts(data);
//         });
//     }, [selectedType]);

//     const handleDelete = () => {
//         setLoading(true);
//         delProduct(selectedProduct.id)
//             .then(() => {
//                 alert('Товар успешно удален');
//                 onHide();
//             })
//             .catch(() => {
//                 alert('Произошла ошибка при удалении товара');
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     };

//     return (
//         <Modal show={show} onHide={onHide}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Удалить товар</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form.Group>
//                     <Form.Label>Выберите тип товара</Form.Label>
//                     <Dropdown>
//                         <Dropdown.Toggle variant="secondary" id="dropdown-basic">
//                             {selectedType ? selectedType.name : 'Выберите тип товара'}
//                         </Dropdown.Toggle>
//                         <Dropdown.Menu>
//                             {types.map((type) => (
//                                 <Dropdown.Item key={type.id} onClick={() => setSelectedType(type)}>
//                                     {type.name}
//                                 </Dropdown.Item>
//                             ))}
//                         </Dropdown.Menu>
//                     </Dropdown>
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>Выберите товар</Form.Label>
//                     <Dropdown>
//                         <Dropdown.Toggle variant="secondary" id="dropdown-basic">
//                             {selectedProduct ? selectedProduct.name : 'Выберите товар'}
//                         </Dropdown.Toggle>
//                         <Dropdown.Menu>
//                             {products.map((product) => (
//                                 <Dropdown.Item key={product.id} onClick={() => setSelectedProduct(product)}>
//                                     {product.name}
//                                 </Dropdown.Item>
//                             ))}
//                         </Dropdown.Menu>
//                     </Dropdown>
//                 </Form.Group>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={onHide}>
//                     Отмена
//                 </Button>
//                 <Button variant="danger" onClick={handleDelete} disabled={!selectedProduct || loading}>
//                     {loading ? 'Удаление...' : 'Удалить'}
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default DeleteProduct;

