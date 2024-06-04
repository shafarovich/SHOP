import React, { useContext, useEffect, useState } from "react";
import { Col, Dropdown, Form, Row } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { createProduct, fetchTypes, fetchOneProduct, updateProduct } from "../../http/productAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

const CreateProduct = observer(({ show, onHide, productId }) => {
    const { product } = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);
    const [editing, setEditing] = useState(false);
    const [productData, setProductData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            if (productId) {
                const productData = await fetchOneProduct(productId);
                setName(productData.name);
                setPrice(productData.price);
                setInfo(productData.info);
                await fetchTypes().then(data => product.setTypes(data));
                const selectedType = product.types.find(type => type.id === productData.typeId);
                product.setSelectedType(selectedType);
                setFile(productData.img);
                setEditing(true);
            } else {
                await fetchTypes().then(data => product.setTypes(data));
            }
        };
        fetchData();
    }, [productId]);

    const addOrUpdateProduct = () => {
        if (name.trim() !== '' && price > 0 && product.selectedType) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', `${price}`);
            formData.append('img', file || productData.img); // Используем текущее фото, если файл не выбран
            formData.append('typeId', product.selectedType.id);
            formData.append('info', JSON.stringify(info));

            if (editing) {
                updateProduct(productId, formData).then(data => onHide());
                window.location.reload();
            } else {
                createProduct(formData).then(data => onHide());
            }
        }
    };

    // const addInfo = () => {
    //     const newInfo = { title: '', description: '', number: Date.now() };
    //     console.log('Adding info:', newInfo); // Лог добавления новой характеристики
    //     setInfo([...info, newInfo]);
    // };

    const addInfo = () => {
        const newInfo = { title: '', description: '', number: Date.now() };
        console.log('Adding info:', newInfo); // Лог добавления новой характеристики
        setInfo([...info, newInfo]);
    };
    

    const removeInfo = (number) => {
        console.log('Removing info with number:', number); // Лог удаления характеристики
        setInfo(info.filter(i => i.number !== number));
    };

    const changeInfo = (key, value, number) => {
        console.log('Changing info:', key, value, number); // Лог изменения характеристики
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
    };

    const selectFile = e => {
        setFile(e.target.files[0]);
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
                    {editing ? 'Редактировать товар' : 'Добавить товар'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle variant={"outline-dark"}>
                            {product.selectedType.name || "Выберите тип"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => product.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название товара"
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость товара"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    {file && (
                        <Form.Text className="text-muted">
                            Файл не будет изменен. Выберите новый файл, если хотите изменить изображение.
                        </Form.Text>
                    )}

                    <hr />
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить новую характеристику
                    </Button>
                    {info.map(i =>
                        <Row className="mt-3" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введите описание"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>Закрыть</Button>
                <Button 
                    variant="outline-success" 
                    onClick={addOrUpdateProduct} 
                    disabled={name.trim() === '' || price <= 0 || !product.selectedType}
                >
                    {editing ? 'Редактировать ' : 'Добавить '}
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProduct;


// import React, { useContext, useEffect, useState } from "react";
// import { Col, Dropdown, Form, Row } from "react-bootstrap";
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import { createProduct, fetchTypes, fetchOneProduct, updateProduct } from "../../http/productAPI";
// import {observer} from "mobx-react-lite";
// import { Context } from "../..";

// const CreateProduct = observer(({ show, onHide, productId }) => {
//     const { product } = useContext(Context);
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState(0);
//     const [file, setFile] = useState(null);
//     const [info, setInfo] = useState([]);
//     const [editing, setEditing] = useState(false);
//     const [productData, setProductData] = useState({});

//     useEffect(() => {
//         const fetchData = async () => {
//             if (productId) {
//                 const productData = await fetchOneProduct(productId);
//                 setName(productData.name);
//                 setPrice(productData.price);
//                 setInfo(productData.info);
//                 await fetchTypes().then(data => product.setTypes(data));
//                 const selectedType = product.types.find(type => type.id === productData.typeId);
//                 product.setSelectedType(selectedType);
//                 setFile(productData.img);
//                 setEditing(true);
//             } else {
//                 await fetchTypes().then(data => product.setTypes(data));
//             }
//         };
//         fetchData();
//     }, [productId]);
    
//     const addOrUpdateProduct = () => {
//         if (name.trim() !== '' && price > 0 && product.selectedType) {
//             const formData = new FormData();
//             formData.append('name', name);
//             formData.append('price', `${price}`);
//             formData.append('img', file || productData.img); // Используем текущее фото, если файл не выбран
//             formData.append('typeId', product.selectedType.id);
//             formData.append('info', JSON.stringify(info));
    
//             if (editing) {
//                 updateProduct(productId, formData).then(data => onHide());
//                 window.location.reload();

//             } else {
//                 createProduct(formData).then(data => onHide());
//             }   
//         }
//     };
    

//     const addInfo = () => {
//         setInfo([...info, { title: '', description: '', number: Date.now() }]);
//     }

//     const removeInfo = (number) => {
//         setInfo(info.filter(i => i.number !== number));
//     }

//     const changeInfo = (key, value, number) => {
//         setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
//     }

//     const selectFile = e => {
//         setFile(e.target.files[0]);
//     }
    
//     return (
//         <Modal
//             show={show}
//             onHide={onHide}
//             size="lg"
//             centered
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     {editing ? 'Редактировать товар' : 'Добавить товар'}
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Dropdown className="mt-2 mb-2">
//                         <Dropdown.Toggle
//                             variant={"outline-dark"}
//                         >
//                             {product.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
//                         <Dropdown.Menu>
//                             {product.types.map(type =>
//                                 <Dropdown.Item
//                                     onClick={() => product.setSelectedType(type)}
//                                     key={type.id}
//                                 >
//                                     {type.name}
//                                 </Dropdown.Item>
//                             )}
//                         </Dropdown.Menu>
//                     </Dropdown>
//                     <Form.Control
//                         value={name}
//                         onChange={e => setName(e.target.value)}
//                         className="mt-3"
//                         placeholder="Введите название товара"
//                     />
//                     <Form.Control
//                         value={price}
//                         onChange={e => setPrice(Number(e.target.value))}
//                         className="mt-3"
//                         placeholder="Введите стоимость товара"
//                         type="number"
//                     />
//                    <Form.Control
//                         className="mt-3"
//                         type="file"
//                         onChange={selectFile}
//                     />
//                     {file && (
//                         <Form.Text className="text-muted">
//                             Файл не будет изменен. Выберите новый файл, если хотите изменить изображение.
//                         </Form.Text>
//                     )}

//                     <hr />
//                     <Button
//                         variant={"outline-dark"}
//                         onClick={addInfo}
//                     >
//                         Добавить новую характеристику
//                     </Button>
//                     {info.map(i =>
//                         <Row className="mt-3" key={i.number}>
//                             <Col md={4}>
//                                 <Form.Control
//                                     value={i.title}
//                                     onChange={(e) => changeInfo('title', e.target.value, i.number)}
//                                     placeholder="Введите название"
//                                 />
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Control
//                                     value={i.description}
//                                     onChange={(e) => changeInfo('description', e.target.value, i.number)}
//                                     placeholder="Введите описание"
//                                 />
//                             </Col>
//                             <Col md={4}>
//                                 <Button
//                                     onClick={() => removeInfo(i.number)}
//                                     variant={"outline-danger"}
//                                 >
//                                     Удалить
//                                 </Button>
//                             </Col>
//                         </Row>
//                     )}
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="outline-secondary" onClick={onHide}>Закрыть</Button>
//                 <Button 
//                     variant="outline-success" 
//                     onClick={addOrUpdateProduct} 
//                     disabled={name.trim() === '' || price <= 0 || !product.selectedType || !file}
//                 >
//                     {editing ? 'Редактировать ' : 'Добавить '}
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     )
// });

// export default CreateProduct;