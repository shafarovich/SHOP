import React, { useContext, useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../'; 
// import { updateUserProfile, cancelOrder, logout } from '../http/userAPI';


const UserProfile = observer(() => {
    const { user, product } = useContext(Context);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setAddress(user.address);
    }, [user]);

    // const handleUpdateProfile = async () => {
    //     try {
    //         await updateUserProfile({ name, email, address });
    //         setError('');
    //     } catch (error) {
    //         setError('Произошла ошибка при обновлении профиля.');
    //     }
    // };

    // const handleCancelOrder = async (orderId) => {
    //     try {
    //         await cancelOrder(orderId);
    //         setError('');
    //     } catch (error) {
    //         setError('Произошла ошибка при отмене заказа.');
    //     }
    // };

    // const handleLogout = async () => {
    //     try {
    //         await logout();
    //         setError('');
    //     } catch (error) {
    //         setError('Произошла ошибка при выходе из учетной записи.');
    //     }
    // };

    // const handleSubmitPasswordChange = async (e) => {
    //     e.preventDefault();
    //     if (newPassword !== confirmPassword) {
    //         setError('Пароли не совпадают.');
    //         return;
    //     }
    //     try {
    //         await updateUserProfile({ password, newPassword });
    //         setError('');
    //         setPassword('');
    //         setNewPassword('');
    //         setConfirmPassword('');
    //     } catch (error) {
    //         setError('Произошла ошибка при изменении пароля.');
    //     }
    // };

    return (
        <Container>
            <h1>Личный кабинет</h1>
            <div>
                <h2>Профиль пользователя</h2>
                <Form >
                    <Form.Group controlId="formName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email адрес</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formAddress">
                        <Form.Label>Адрес доставки</Form.Label>
                        <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Текущий пароль</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formNewPassword">
                        <Form.Label>Новый пароль</Form.Label>
                        <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Подтвердите новый пароль</Form.Label>
                        <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Изменить пароль
                    </Button>
                </Form>
                {error && <p className="text-danger">{error}</p>}
                <Button >Сохранить изменения</Button>
            </div>
            <div>
                <h2>История заказов</h2>
                {/* Отобразите историю заказов здесь */}
            </div>
            <div>
                <h2>Действия</h2>
                <Button >Выйти из учетной записи</Button>
            </div>
        </Container>
    );
});

export default UserProfile;
