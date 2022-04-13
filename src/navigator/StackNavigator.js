import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import { checkToken } from '../store/actions/auth';

import { Login } from '../screens/Login';
import { Register } from '../screens/Register';
import { TabsNavigator } from './TabsNavigator';
import { Loading } from '../screens/Loading';



const Stack = createStackNavigator();

export const StackNavigator = () => {

    const dispatch = useDispatch();
    const {status} = useSelector( state => state.auth);

    useEffect(() => {
      dispatch(checkToken())
    }, [dispatch])

    if(status === 'cheking') return <Loading />
    
    return (
        <Stack.Navigator 
          screenOptions={{
            headerShown: false,
            headerStyle:{elevation: 0, shadowColor: 'transparent'},
            cardStyle: {backgroundColor: '#fff'}
          }}>

          {
            (status === 'authenticated') 
              ? (
                <Stack.Screen name="Tabs" component={TabsNavigator} /> )
              :(
                <>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Register" component={Register} />
                </>
              )
          }

        </Stack.Navigator>
    )
}
