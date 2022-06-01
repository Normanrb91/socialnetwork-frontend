import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet} from 'react-native'

export const CustomButtonFollow = ({ backColor = "#ccc", color, onPress, text }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={{backgroundColor: '#ccc', borderRadius: 10}}
            onPress = {onPress}>

            <View style={{
                ...styles.button,
                backgroundColor: backColor,
            }}>
                <Text style={{
                    ...styles.text,
                    color: color
                }}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        minWidth: 100,
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        paddingVertical: 3
    }
});
  