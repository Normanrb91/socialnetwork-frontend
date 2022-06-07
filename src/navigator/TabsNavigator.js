import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

import { Home } from '../screens/tabs/Home';
import { ProfileUser } from '../screens/tabs/ProfileUser';
import { Search } from '../screens/tabs/Search';
import { IconProfile } from '../components/IconProfile';

import Icon from 'react-native-vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator();

export const TabsNavigator = () => {

    const { usuario } = useSelector(state => state.auth);

    return(
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: '#fff',
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

            <Tab.Screen options={{ title: 'Status200',  }} name="Home" component={Home} />
            <Tab.Screen options={{ title: 'Buscar usuarios'  }} name="Search" component={Search} />
            <Tab.Screen name="ProfileUser" component={ProfileUser} 
                        options={{title: usuario?.name, tabBarIcon: ({focused}) => 
                <IconProfile focused={focused} image={usuario.avatar?.secure_url || null} />  
            }} />
    
        </Tab.Navigator>
    );
}