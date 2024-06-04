import React, { useContext, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useLocation, NavLink, useHistory } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { observer } from "mobx-react-lite";
import { Context } from '..';

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState(null)
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(password);
    };
    
    const handleAuthSuccess = (data) => {
        user.setUser(data.role);
        user.setIsUser(data.id);
        user.setIsAuth(true);
        if (data.role === 'ADMIN') {
            user.setIsAdmin(true);
            console.log('admin true');
        }
        history.push(SHOP_ROUTE);
    };
    
    const handleValidationErrors = () => {
        setError(null);
        setEmailError('');
        setPasswordError('');
        if (!validateEmail(email)) {
            setEmailError('Пожалуйста, введите корректный email. Пример: example@example.com');
            return false;
        }
        if (!isLogin && !validatePassword(password)) {
            setPasswordError('Пароль должен содержать минимум 8 символов и включать только цифры и латинские буквы');
            return false;
        }
        return true;
    };
    
    const click = async () => {
        try {
            if (!handleValidationErrors()) {
                return;
            }
    
            if (isLogin) {
                const data = await login(email, password);
                handleAuthSuccess(data);
            } else {
                if (password !== repeatPassword) {
                    setError('Пароли не совпадают');
                    return;
                }
                const data = await registration(email, password, name);
                handleAuthSuccess(data);
            }
        } catch (e) {
            if (e.response && e.response.data && e.response.data.message) {
                setError(e.response.data.message);
            } else {
                setError('Произошла ошибка');
            }
        }
    };
    
    

    return (
        <div style={{ height: '100vh' }}>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ height: '100vh' }}
            >
                <Card style={{ width: 600 }} className="p-5">
                    <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                    <Form className="d-flex flex-column">
                        <Form.Group className="mt-3">
                            <Form.Label>Ваш email</Form.Label>
                            <Form.Control
                                placeholder="Введите ваш email..."
                                value={email}
                                onChange={e => {
                                    setEmail(e.target.value);
                                    setEmailError('');
                                }}
                                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                isInvalid={!!emailError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {emailError}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Ваш пароль</Form.Label>
                            <Form.Control
                                placeholder="Введите ваш пароль..."
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value);
                                    setPasswordError('');
                                }}
                                type='password'
                                isInvalid={!!passwordError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {passwordError}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {!isLogin &&
                            <Form.Group className="mt-3">
                                <Form.Label>Повторите пароль</Form.Label>
                                <Form.Control
                                    placeholder="Повторите ваш пароль..."
                                    value={repeatPassword}
                                    onChange={e => setRepeatPassword(e.target.value)}
                                    type='password'
                                />
                            </Form.Group>
                        }

                        {error &&
                            <Form.Text className="text-danger">{error}</Form.Text>
                        }

                        <div className="d-flex justify-content-between mt-3 ps-1">
                            {isLogin ?
                                <div className="text-start">
                                    Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                                </div>
                                :
                                <div className="text-start">
                                    Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                                </div>
                            }

                            <div className="text-end">
                                <Button
                                    variant={'outline-success'}
                                    onClick={click}
                                >
                                    {isLogin ? 'Войти' : 'Регистрация'}
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Card>
            </Container>
        </div>
    );
})

export default Auth;
