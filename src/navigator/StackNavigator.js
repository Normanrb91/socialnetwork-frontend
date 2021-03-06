import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import { checkToken } from '../store/actions/auth';

import { Login } from '../screens/auth/Login';
import { Register } from '../screens/auth/Register';
import { TabsNavigator } from './TabsNavigator';
import { Loading } from '../screens/Loading';
import { ProfileOtherUser } from '../screens/ProfileOther';
import { ListUserFollowers } from '../screens/ListUsersFollowers';
import { ListUsersFollowings } from '../screens/ListUsersFollowings';
import { New } from '../screens/New';
import { EditProfile } from '../screens/EditProfile';
import { ListUSersLikes } from '../screens/ListUsersLikes';
import { Comments } from '../screens/Comments';


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
            headerStyle:{elevation: 0, shadowColor: 'transparent'},
            cardStyle: {backgroundColor: '#fff'}
          }}>

          {
            (status === 'authenticated') 
              ? (
                <>
                  <Stack.Screen options={{ headerShown: false }} name="Tabs" component={TabsNavigator} /> 
                  <Stack.Screen name="ProfileOtherUser" component={ProfileOtherUser} /> 
                  <Stack.Screen name="ListUsersFollowers" component={ListUserFollowers} /> 
                  <Stack.Screen name="ListUsersFollowings" component={ListUsersFollowings} />
                  <Stack.Screen name="ListLikes" component={ListUSersLikes} /> 
                  <Stack.Screen name="ListComments" component={Comments} /> 
                  <Stack.Screen name="New" component={New} /> 
                  <Stack.Screen name="EditProfile" component={EditProfile} /> 
                </>
                )
              :(
                <>
                  <Stack.Screen  options={{ headerShown: false }} name="Login" component={Login} />
                  <Stack.Screen  options={{ headerShown: false }} name="Register" component={Register} />
                </>
              )
          }

        </Stack.Navigator>
    )
}
