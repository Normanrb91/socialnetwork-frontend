import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet} from 'react-native'

export const CustomButtonFollow = ({ backColor = "#ccc", color, onPress, text }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={{backgroundColor: '#ccc', borderRadius: 10,}}
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
        paddingHorizontal: 30,
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.25,
        paddingVertical: 5
    }
});
  