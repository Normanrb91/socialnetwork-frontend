import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../components/User';
import { loadFollowersProfileOther, refreshFollowersProfileOther } from '../store/actions/profileOther';
import { loadFollowersProfile, refreshFollowersProfile } from '../store/actions/profile';


export const ListUserFollowers = ({route}) => {

    const { id } = route.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [refresh, setRefresh] = useState(false);
    const {usuario} = useSelector(state => state.auth) 
    const { user, nextPage } = useSelector(state => id === usuario._id ? state.profile.followers : state.profileOther.followersOther) 

    
    useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Seguidores'
      })
    }, [])


    const handleOnEndReached = () => {
      if(nextPage && id === usuario._id){
        dispatch(loadFollowersProfile(nextPage))
      }else if(nextPage && id !== usuario._id){
        dispatch(loadFollowersProfileOther(nextPage, id))
      }
    }
  
    const handledRefreshPublication = () => {
      setRefresh(true)
      if(id === usuario._id){
        dispatch(refreshFollowersProfile())
      }else if(id !== usuario._id){
        dispatch(refreshFollowersProfileOther(id))
      }
      setRefresh(false)
    }
        
    return (
      <FlatList 
        style={{ flex: 1 }}
        data={ user } 
        showsVerticalScrollIndicator={ false }
        keyExtractor={ (user) => user.id }
        renderItem={ ({item}) => <User props={item} /> } 
        extraData={ user }
        onEndReached={ handleOnEndReached }
        ListFooterComponent={ nextPage && <ActivityIndicator style={{ height: 50 }} size={20} color="#FBA741" /> }
        refreshControl={ <RefreshControl refreshing={ refresh } onRefresh = { handledRefreshPublication }/> }
      />
    )
}

