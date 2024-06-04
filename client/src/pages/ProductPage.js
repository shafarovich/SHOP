import React, { useEffect, useState } from 'react';
import { Container, Col, Image, Card, Button, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { addToBasket, delProduct, fetchOneProduct, fetchProductsByType, hideProduct, unhideProduct } from '../http/productAPI';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../index';
import { useHistory } from 'react-router-dom';
import { SHOP_ROUTE, PRODUCT_ROUTE } from '../utils/consts';
import CreateProduct from '../components/modals/CreateProduct';

const ProductPage = observer(() => {
    const { user } = useContext(Context);
    const history = useHistory();
    const [product, setProduct] = useState({ info: [], basket: [] });
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);

    const handleEdit = (productId) => {
        setEditingProductId(productId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProductId(null);
    };

    const handleHide = async () => {
        try {
            await hideProduct(id);
            setProduct({ ...product, hidden: true });
        } catch (error) {
            console.error('Ошибка при скрытии товара:', error);
        }
        window.location.reload();
    };

    const handleUnhide = async () => {
        try {
            await unhideProduct(id);
            setProduct({ ...product, hidden: false });
        } catch (error) {
            console.error('Ошибка при возврате товара:', error);
        }
        window.location.reload();
    };

    useEffect(() => {
        fetchOneProduct(id)
            .then(data => setProduct(data))
            .catch(error => console.error('Ошибка загрузки информации о товаре:', error));
    }, [id]);

    useEffect(() => {
        if (product.typeId) {
            fetchProductsByType(product.typeId)
                .then(data => setRelatedProducts(data))
                .catch(error => console.error('Ошибка загрузки связанных товаров:', error));
        }
    }, [product.typeId]);

    const add = () => {
        if (!user.isAuth) {
            alert('Для добавления товара в корзину необходимо войти в аккаунт.');
            return;
        }
        const quantity = 1;
        addToBasket(id, quantity)
            .then(response => alert(`Товар ${product.name} был добавлен в вашу корзину!`));
    };

    const handleDelete = () => {
        if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
            delProduct(id)
                .then(() => {
                    alert('Товар был удален');
                    history.push(SHOP_ROUTE);
                })
                .catch(error => console.error('Ошибка удаления товара:', error));
        }
    };

    return (
        <Container className="mt-3">
            {user.isRole === "ADMIN" &&
                <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <Button
                        variant={"outline-danger"}
                        className="mt-4 p-2"
                        onClick={handleDelete}
                    >
                        Удалить
                    </Button>
                    <Button
                        variant={"outline-primary"}
                        className="mt-4 p-2"
                        onClick={() => handleEdit(id)}
                    >
                        Редактировать
                    </Button>
                    {product.isHidden? (
                        <Button
                            variant={"outline-success"}
                            className="mt-4 p-2"
                            onClick={handleUnhide}
                        >
                            Вернуть
                        </Button>
                    ) : (
                        <Button
                            variant={"outline-warning"}
                            className="mt-4 p-2"
                            onClick={handleHide}
                        >
                            Скрыть
                        </Button>
                    )}
                </Row>
            }
            <CreateProduct show={showModal} onHide={handleCloseModal} productId={editingProductId} />
            <Row>
                <Col md={5} className="mt-4">
                    <Image fluid src={process.env.REACT_APP_API_URL + product.img} />
                </Col>
                <Col md={6} className="mt-4">
                    <h3 className="text-center mb-4">{product.name}</h3>
                    <Card className={`mb-4 p-3 ${product.hidden ? 'bg-light text-muted' : ''}`} style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <h4 className="text-center">Цена: {product.price} Руб.</h4>
                        <div className="d-flex justify-content-center mt-3">
                            <Button variant="outline-success" onClick={add} disabled={product.hidden}>КУПИТЬ</Button>
                        </div>
                    </Card>
                    {product.info.length > 0 && (
                        <>
                            <h4 className="mb-3">Описание</h4>
                            {product.info.map(info => (
                                <Row key={info.id} className="mb-2">
                                    <Col className="info-row">
                                        <strong>{info.title}:</strong> {info.description}
                                    </Col>
                                </Row>
                            ))}
                        </>
                    )}
                </Col>
            </Row>
            {relatedProducts.length > 0 &&
                <>
                    <h3 className="text-center mt-5 mb-5">Вам также может понравиться:</h3>
                    <Row>
                        {relatedProducts
                            .filter(relatedProduct => relatedProduct.id !== product.id)
                            .slice(0, 4)
                            .map(relatedProduct =>
                                <Col key={relatedProduct.id} xs={12} sm={6} md={3} className="mb-4">
                                    <Card
                                        className="h-100"
                                        onClick={() => {
                                            history.push(PRODUCT_ROUTE + '/' + relatedProduct.id);
                                            window.location.reload();
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Card.Img
                                            variant="top"
                                            src={process.env.REACT_APP_API_URL + relatedProduct.img}
                                            style={{ height: '300px', objectFit: 'cover' }}
                                        />
                                        <Card.Body>
                                            <Card.Title>{relatedProduct.name}</Card.Title>
                                            <Card.Text>Цена: {relatedProduct.price} Руб.</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                    </Row>
                </>
            }
        </Container>
    );
});

export default ProductPage;



// import React, { useEffect, useState } from 'react';
// import { Container, Col, Image, Card, Button, Row } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
// import { addToBasket, delProduct, fetchOneProduct, fetchProductsByType } from '../http/productAPI';
// import { observer } from 'mobx-react-lite';
// import { useContext } from 'react';
// import { Context } from '../index';
// import { useHistory } from 'react-router-dom';
// import { SHOP_ROUTE, PRODUCT_ROUTE } from '../utils/consts';
// import CreateProduct from '../components/modals/CreateProduct';

// const ProductPage = observer(() => {
//     const { user } = useContext(Context);
//     const history = useHistory();
//     const [product, setProduct] = useState({ info: [], basket: [] });
//     const [relatedProducts, setRelatedProducts] = useState([]);
//     const { id } = useParams();
//     const [showModal, setShowModal] = useState(false);
//     const [editingProductId, setEditingProductId] = useState(null);

//     const handleEdit = (productId) => {
//         setEditingProductId(productId);
//         setShowModal(true);
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//         setEditingProductId(null);
//     };

//     useEffect(() => {
//         fetchOneProduct(id)
//             .then(data => setProduct(data))
//             .catch(error => console.error('Ошибка загрузки информации о товаре:', error));
//     }, [id]);

//     useEffect(() => {
//         if (product.typeId) {
//             fetchProductsByType(product.typeId)
//                 .then(data => setRelatedProducts(data))
//                 .catch(error => console.error('Ошибка загрузки связанных товаров:', error));
//         }
//     }, [product.typeId]);

//     const add = () => {
//         if (!user.isAuth) {
//             alert('Для добавления товара в корзину необходимо войти в аккаунт.');
//             return;
//         }
//         const quantity = 1;
//         addToBasket(id, quantity)
//             .then(response => alert(`Товар ${product.name} был добавлен в вашу корзину!`));
//     };

//     const handleDelete = () => {
//         if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
//             delProduct(id)
//                 .then(() => {
//                     alert('Товар был удален');
//                     history.push(SHOP_ROUTE);
//                 })
//                 .catch(error => console.error('Ошибка удаления товара:', error));
//         }
//     };

//     return (
//         <Container className="mt-3">
//             {user.isRole === "ADMIN" &&
//                 <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
//                     <Button
//                         variant={"outline-danger"}
//                         className="mt-4 p-2"
//                         onClick={handleDelete}
//                     >
//                         Удалить
//                     </Button>
//                     <Button
//                         variant={"outline-primary"}
//                         className="mt-4 p-2"
//                         onClick={() => handleEdit(id)}
//                     >
//                         Редактировать
//                     </Button>
//                 </Row>
//             }
//             <CreateProduct show={showModal} onHide={handleCloseModal} productId={editingProductId} />
//             <Row>
                
//                 <Col md={5} className="mt-4">
//                     <Image fluid src={process.env.REACT_APP_API_URL + product.img} />
//                 </Col>
              
//                 <Col md={6} className="mt-4">
//                     <h3 className="text-center mb-4">{product.name}</h3>
//                     <Card className="mb-4 p-3" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
//                         <h4 className="text-center">Цена: {product.price} Руб.</h4>
//                         <div className="d-flex justify-content-center mt-3">
//                             <Button variant="outline-success" onClick={add}>КУПИТЬ</Button>
//                         </div>
//                     </Card>
//                     {product.info.length > 0 && (
//                         <>
//                             <h4 className="mb-3">Описание</h4>
//                             {product.info.map(info => (
//                                 <Row key={info.id} className="mb-2">
//                                     <Col className="info-row">
//                                         <strong>{info.title}:</strong> {info.description}
//                                     </Col>
//                                 </Row>
//                             ))}
//                         </>
//                     )}

//                 </Col>
//             </Row>
//             {relatedProducts.length > 0 &&
//                 <>
//                     <h3 className="text-center mt-5 mb-5">Вам также может понравиться:</h3>
//                     <Row>
//                         {relatedProducts
//                             .filter(relatedProduct => relatedProduct.id !== product.id)
//                             .slice(0, 4)
//                             .map(relatedProduct =>
//                                 <Col key={relatedProduct.id} xs={12} sm={6} md={3} className="mb-4">
//                                     <Card
//                                         className="h-100"
//                                         onClick={() => {
//                                             history.push(PRODUCT_ROUTE + '/' + relatedProduct.id);
//                                             window.location.reload();
//                                         }}
//                                         style={{ cursor: 'pointer' }}
//                                     >
//                                         <Card.Img
//                                             variant="top"
//                                             src={process.env.REACT_APP_API_URL + relatedProduct.img}
//                                             style={{ height: '300px', objectFit: 'cover' }}
//                                         />
//                                         <Card.Body>
//                                             <Card.Title>{relatedProduct.name}</Card.Title>
//                                             <Card.Text>Цена: {relatedProduct.price} Руб.</Card.Text>
//                                         </Card.Body>
//                                     </Card>
//                                 </Col>
//                             )}
//                     </Row>
//                 </>
//             }
//         </Container>
//     );
// });

// export default ProductPage;
