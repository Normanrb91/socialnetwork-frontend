import React, { useLayoutEffect, useState } from 'react';
import { FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../components/User';
import { loadFollowingsProfileOther, refreshFollowingsProfileOther } from '../store/actions/profileOther';
import { loadFollowingsProfile, refreshFollowingsProfile } from '../store/actions/profile';


export const ListUsersFollowings = ({route}) => {

    const { id } = route.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [refresh, setRefresh] = useState(false);
    const {usuario} = useSelector(state => state.auth) 
    const { user, nextPage } = useSelector(state => id === usuario._id ? state.profile.followings : state.profileOther.followingsOther) 


    useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Siguiendo'
      })
    }, [])


    const handleOnEndReached = () => {
      if(nextPage && id === usuario._id){
        dispatch(loadFollowingsProfile(nextPage))
      }else if(nextPage && id !== usuario._id){
        dispatch(loadFollowingsProfileOther(nextPage, id))
      }
    }
  
    const handledRefreshPublication = () => {
      setRefresh(true)
      if(id === usuario._id){
        dispatch(refreshFollowingsProfile())
      }else if(id !== usuario._id){
        dispatch(refreshFollowingsProfileOther(id))
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

