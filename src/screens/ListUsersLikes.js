import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../components/User';


export const ListUSersLikes = ({route}) => {

    const { id } = route.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { listLikes, pageLikes, publicationId } = useSelector(state => state.publicationActive) 


    useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Me gusta'
      })
    }, [])

    useEffect(() => {

        if( id !== publicationId){
            //dispatch(cleanProfileOther())
        }
       // dispatch(loadInfoOther(id))

    }, [dispatch, id])
    


    const handleOnEndReached = () => {
        if(pageLikes){
          //dispatch(loadPublicationsHome(nextPageHome))
        }
    }
          
    return (
        <FlatList 
            style={{ flex: 1 }}
            data={ listLikes } 
            showsVerticalScrollIndicator={ false }
            keyExtractor={ (listLikes) => listLikes.id }
            renderItem={ ({item}) => <User props={item} /> } 
            extraData={ listLikes }
            onEndReached={ handleOnEndReached }
            ListFooterComponent={ pageLikes && <ActivityIndicator style={{ height: 50 }} size={20} color="#FBA741" /> }
        />
    )
}

