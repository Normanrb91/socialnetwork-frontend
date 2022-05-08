import React, { useState } from 'react';
import { SafeAreaView, View, Image, Dimensions } from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel'


export const CarruselImage = ({images}) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const { width } = Dimensions.get('screen');

    const renderItem = (item) => {
        return(
            <View>
                <Image
                    style={{ width, minHeight: 400, resizeMode: 'cover', marginBottom: 10}}
                    source={{
                        uri: item.secure_url,
                    }}
                    key={item._id}/>
            </View>
        )
    }

    return (

        <SafeAreaView style={{flex: 1}}>
            <Carousel 
                data={images}
                renderItem={({item}) => renderItem(item) }
                itemWidth={width}
                sliderWidth={width}
                layout= 'default'
                onSnapToItem={ (index)=> { setActiveIndex(index)} }
            />

            <Pagination 
                dotsLength={images.length}
                containerStyle={{backgroundColor: 'transparent', zIndex: 1, position: 'absolute', bottom: 0, alignSelf: 'center'}}
                dotStyle={{width: 10, height: 10, borderRadius: 10, backgroundColor: '#FBA741', marginHorizontal: 2}}
                inactiveDotStyle={{width: 10, height: 10, borderRadius: 10, backgroundColor: '#fff', marginHorizontal: 2}}
                inactiveDotOpacity={0.6}
                inactiveDotScale={0.6}
                activeDotIndex={activeIndex}
            />

        </SafeAreaView>

    )

}

