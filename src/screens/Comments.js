import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../components/User';



export const Comments = ({route}) => {

    const { id } = route.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [refresh, setRefresh] = useState(false);
    const { listComments, pageComments, publicationId } = useSelector(state => state.publicationActive) 


    useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Comentarios'
      })
    }, [])

    useEffect(() => {

        if( id !== publicationId){
            //dispatch(cleanProfileOther())
        }
       // dispatch(loadInfoOther(id))

    }, [dispatch, id])
    


    const handleOnEndReached = () => {
        if(pageComments){
          //dispatch(loadPublicationsHome(nextPageHome))
        }
    }


    const handledRefreshComments = () => {
        setRefresh(true)
        dispatch(refreshPublicationsHome())
        setRefresh(false)
    }

          
    return (
        <FlatList 
            style={{ flex: 1 }}
            data={ listComments } 
            showsVerticalScrollIndicator={ false }
            keyExtractor={ (listComments) => listComments.id }
            //renderItem={ ({item}) => <User props={item} /> } 
            extraData={ listComments }
            onEndReached={ handleOnEndReached }
            ListFooterComponent={ pageComments && <ActivityIndicator style={{ height: 50 }} size={20} color="#FBA741" /> }
            refreshControl={ <RefreshControl refreshing={ refresh } onRefresh = { handledRefreshComments }/> }
        />
    )
}