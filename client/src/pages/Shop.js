import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import ProductList from '../components/ProductList';
import { observer } from "mobx-react-lite";
import { fetchProducts, fetchProductsAdmin, fetchTypes } from '../http/productAPI';
import Pages from '../components/Pages';
import { Context } from '..';

const Shop = observer(() => {
    const { product, user } = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data));
        const fetchInitialProducts = async () => {
            if ( user.isRole === 'ADMIN') {
                fetchProductsAdmin(null, 1, 6).then(data => {
                    product.setProducts(data.rows);
                    product.setTotalCount(data.count);
                });
            } else {
                fetchProducts(null, 1, 6).then(data => {
                    product.setProducts(data.rows);
                    product.setTotalCount(data.count);
                });
            }
        };
        fetchInitialProducts();
    }, [product, user.role]);

    useEffect(() => {
        const fetchFilteredProducts = async () => {
            if ( user.isRole === 'ADMIN') {
                fetchProductsAdmin(product.selectedType?.id, product.page, 6).then(data => {
                    product.setProducts(data.rows);
                    product.setTotalCount(data.count);
                });
            } else {
                fetchProducts(product.selectedType?.id, product.page, 6).then(data => {
                    product.setProducts(data.rows);
                    product.setTotalCount(data.count);
                });
            }
        };
        fetchFilteredProducts();
    }, [product.page, product.selectedType?.id, user.role]);

    return (
        <Container>
            <Row className='mt-5'>
                <Col md={12}>
                    <TypeBar />
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col md={12}>
                    <ProductList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;

// import React, { useContext, useEffect } from 'react'
// import { Col, Container, Row } from 'react-bootstrap';
// import TypeBar from '../components/TypeBar';
// import ProductList from '../components/ProductList';
// import { observer } from "mobx-react-lite";
// import { fetchProducts, fetchTypes } from '../http/productAPI';
// import Pages from '../components/Pages';
// import { Context } from '..';

// const Shop = observer(() => {
//     const { product } = useContext(Context)

//     useEffect(() => {
//         fetchTypes().then(data => product.setTypes(data));
//         fetchProducts(null, 1, 6).then(data => {
//             product.setProducts(data.rows);
//             product.setTotalCount(data.count);
//         });
//     }, [product]);
    

//     useEffect(() => {
//         fetchProducts(product.selectedType?.id, product.page, 6).then(data => {
//             product.setProducts(data.rows)
//             product.setTotalCount(data.count)
//         })
//     }, [product.page, product.selectedType?.id])
    

//     return (
//         <Container>
//             <Row className='mt-5'>
//                 <Col md={12}>
//                     <TypeBar />
//                 </Col>
//             </Row>
//             <Row className='mt-5'>
//                 <Col md={12}>
//                     <ProductList />
//                     <Pages />
//                 </Col>
//             </Row>
//         </Container>
//     )
// })

// export default Shop;
