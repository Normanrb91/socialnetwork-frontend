import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { Search } from '../screens/Search';
import { IconProfile } from '../components/IconProfile';

import Icon from 'react-native-vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator();

export const TabsNavigator = () => {
    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: '#fff'
            }}
            screenOptions={ ({ route }) => ({
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#FBA741',
                tabBarInactiveTintColor: '#000',
                tabBarStyle: { height:  60},
                tabBarIcon: (props) => {
                    let iconName= '';
                    switch(route.name) {
                        case 'Home' :
                            iconName = 'home'
                        break;
    
                        case 'Search' :
                            iconName = 'search'
                        break;    
                    }
                    return <Icon  
                        color={props.color}
                        name={iconName} 
                        size={35}
                    />
                }
            })}>

            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: ({focused}) => 
                <IconProfile focused={focused} image={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}/> 
            }} />
        </Tab.Navigator>
    );
}