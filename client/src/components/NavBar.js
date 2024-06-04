import React, { useContext, useState } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { ABOUT_ROUTE, ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, ORDER_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { FaBars } from 'react-icons/fa'; 
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink} from 'mdb-react-ui-kit';
import { FaShoppingBasket, FaUser} from 'react-icons/fa'; // Import the shopping cart icon
import { Context } from "..";

const NavBar = observer(() => {
    const history = useHistory();
    const { user } = useContext(Context);
    const [openNavNoTogglerSecond, setOpenNavNoTogglerSecond] = useState(false);

    const logOut = () => {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
        user.setIsAdmin(false);
        history.push(SHOP_ROUTE);
    }

    const BasketClick = () => {
        history.push(BASKET_ROUTE);
    }

    const AdminClick = () => {
        history.push(ADMIN_ROUTE);
    }

    const OrderClick = () => {
        history.push(ORDER_ROUTE);
    }

    return (
        <>
        <MDBNavbar sticky expand='lg' light bgColor='light' >
            <MDBContainer fluid>
                <MDBNavbarBrand style={{ fontSize: '23px' }}>
                    <NavLink style={{ textDecoration: 'none', color: 'black' }} to={SHOP_ROUTE}>Торт и Кофе </NavLink>
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    type='button'
                    data-target='#navbarTogglerDemo02'
                    aria-controls='navbarTogglerDemo02'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setOpenNavNoTogglerSecond(!openNavNoTogglerSecond)}
                >
                    <FaBars />
                </MDBNavbarToggler>
                <MDBCollapse navbar open={openNavNoTogglerSecond}>
                    <MDBNavbarNav className='ml-auto my-2' style={{ fontSize: '17px', display: 'flex', alignItems: 'center' }}>
                        <MDBNavbarItem className='d-none d-lg-block'> 
                            <div className='mx-2'></div>
                        </MDBNavbarItem >
                        {user.isAuth && user.isRole === "USER" &&(
                            <MDBNavbarItem className="nav-link" onClick={BasketClick} style={{ display: 'flex', alignItems: 'center' }}>
                                <FaShoppingBasket size={23} />
                            </MDBNavbarItem>
                        )}
                       
                        <MDBNavbarItem>
                            <NavLink to={ABOUT_ROUTE} className="nav-link mx-2">О нас</NavLink>
                        </MDBNavbarItem>
                        
                        {user.isAdmin && (
                            <>
                                <MDBNavbarItem className="nav-link mx-1" onClick={OrderClick}>Заказы</MDBNavbarItem>
                                <MDBNavbarItem className="nav-link mx-2" onClick={AdminClick}>Админ панель</MDBNavbarItem>
                            </>
                        )}
                        {user.isAuth ? (
                                <MDBNavbarItem>
                                    <MDBNavbarLink onClick={logOut} style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaUser size={18}/>  Выйти
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                        ) : (
                                <MDBNavbarItem>
                                    <NavLink to={LOGIN_ROUTE} className="nav-link" style={{ display: 'flex', alignItems: 'center' }}>
                                    <FaUser size={18}/>  Войти
                                    </NavLink>
                                </MDBNavbarItem>
                        )}
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
        </>
    );
});

export default NavBar;
