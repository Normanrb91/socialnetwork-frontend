import React, { useEffect, useLayoutEffect } from 'react';
import { FlatList, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { cleanPublicationActive, loadListLikes } from '../store/actions/publication';
import { User } from '../components/User';


export const ListUSersLikes = ({route}) => {

    const { id } = route.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { listLikes, pageLikes, publicationId, loading } = useSelector(state => state.publicationActive) 


    useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Me gusta'
      })
    }, [])

    useEffect(() => {
        if( id !== publicationId){
            dispatch(cleanPublicationActive())
        }
       dispatch(loadListLikes(id, 1))

    }, [dispatch, id])
    


    const handleOnEndReached = () => {
        if(pageLikes){
            dispatch(loadListLikes(publicationId, pageLikes))
        }
    }
          
    console.log(loading);
    if(loading) return (<ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} size={50} color="#FBA741" />)

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

