import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { loadPublications } from '../store/actions/publications';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { Search } from '../screens/Search';
import { Loading } from '../screens/Loading';
import { IconProfile } from '../components/IconProfile';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { DashBoardNavigator } from './DashBoardNavigator';
import { StackNavigator } from './StackNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileUser } from '../screens/ProfileUser';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const TabsNavigator = () => {

    const dispatch = useDispatch();
    const { usuario } = useSelector(state => state.auth);
    const { loading } = useSelector(state => state.publications);

    useEffect(() => {
        dispatch(loadPublications(1))
    }, [dispatch])
    
    
    return loading ? 
        <Loading />
    : (
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

            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="ProfileUser" component={ProfileUser} initialParams={{id: usuario?._id}} options={{tabBarIcon: ({focused}) => 
                <IconProfile focused={focused} image={usuario?.avatar} />  
            }} />
    
        </Tab.Navigator>
    );
}