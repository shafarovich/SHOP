import React, { useState } from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { PRODUCT_ROUTE } from '../utils/consts';

const ProductItem = ({ product }) => {
    const history = useHistory();

    return (
        <Col md={4} className='mb-5' onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id)}>
            <Card
                style={{ width: 350, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                border={'light'}
            >
                {product.isHidden && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1
                    }}>
                        <span>Товар скрыт</span>
                    </div>
                )}
                <Image width={350} height={450} src={process.env.REACT_APP_API_URL + product.img} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>Цена: {product.price} руб.</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ProductItem;