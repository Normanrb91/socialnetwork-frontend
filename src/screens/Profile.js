import React from 'react';
import {View} from 'react-native';

import { useDispatch } from 'react-redux';
import { startLogout } from '../store/actions/auth';

import { CustomButton } from '../components/CustomButton';

export const Profile = () => {


  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(startLogout('logout'))
  }

  const onLogoutAll = () => {
    dispatch(startLogout('logoutAll'))
  }

  return (
    <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
        <CustomButton 
            backColor='#FBA741' 
            color='#fff' 
            onPress={onLogout}
            text='Logout' 
        />
        
        <CustomButton 
            backColor='#FBA741' 
            color='#fff' 
            onPress={onLogoutAll}
            text='Logout All' 
        />
    </View>

    

  )
}
