import React, {useState} from 'react';
import {Text, TextInput, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const CustomInput = ({ icon, placeholder, secureTextEntry, control, name,  rules = {}, }) => {

    const [focus, setFocus] = useState(false)
    const [showPass, setShowPass] = useState(secureTextEntry)
  
    return (
       
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({field: {value, onChange}, fieldState: {error}}) => (

            <>
                <View style={[
                    styles.inputContainer, 
                    {borderBottomColor: error ? 'red' : focus ? '#FBA741' : '#ccc'},
                ]}>

                    <Icon
                        color="#000"
                        name={icon} 
                        size={20}
                        style={styles.icon} 
                    />

                    <TextInput 
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={onChange}
                        onFocus={()=> setFocus(true)}
                        onBlur={()=> setFocus(false)}
                        placeholder={placeholder}
                        placeholderTextColor='rgba(0,0,0,0.4)'
                        secureTextEntry={showPass}
                        style={styles.input}
                        value={value}             
                    />

                {(icon === 'lock-outline' && focus) &&(
                    <TouchableOpacity 
                        activeOpacity={0.5} 
                        onPress={() => setShowPass(!showPass)}>

                        <Icon
                            color="#000"
                            name={showPass ? "eye-outline" : "eye-off-outline"} 
                            size={20} 
                            style={styles.iconPass} 
                        />
                    </TouchableOpacity>
                )}
            
                </View>

                {error && (
                    <Text style={styles.textError}>{error.message || 'Error'}</Text>
                )} 
            </>
            )}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        paddingRight: 10,
        paddingLeft: 2,
        fontSize: 18,
        color: 'black',
        fontWeight: '600'
    },
    inputContainer:{
        height: 50,
        width: '100%',
        marginVertical: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    icon:{
       paddingHorizontal: 10,
       color: '#9b9b9b'
    },
    iconPass:{
        paddingRight: 20,
        color: '#9b9b9b'
    },
    textError:{
        color: 'red', 
        alignSelf: 'stretch'
    }
})
