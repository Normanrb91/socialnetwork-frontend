import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileUser } from '../screens/ProfileUser';
import { Home } from '../screens/Home';

const Stack = createStackNavigator();

export const DashBoardNavigatorHome = () => {

    return (
        <Stack.Navigator
        screenOptions={{
            
            headerStyle:{elevation: 0, shadowColor: 'transparent'},
            cardStyle: {backgroundColor: '#fff'}
        }}>
            <Stack.Screen name="Home" component={Home} /> 
            <Stack.Screen name="ProfileUser" component={ProfileUser} /> 
        </Stack.Navigator>
    )
}



