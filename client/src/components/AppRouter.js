import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import {authRoutes, publicRoutes, adminRoutes} from '../routes'
import { Context } from '..';
import { SHOP_ROUTE } from "../utils/consts";
import { Switch, Redirect } from 'react-router-dom';


const AppRouter = () => {
    const {user} = useContext(Context)

    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {user.isAdmin && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={SHOP_ROUTE}/>
        </Switch>
    )
}

export default AppRouter
