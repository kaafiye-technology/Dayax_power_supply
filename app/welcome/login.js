import React, { useState } from "react";
import { SafeAreaView,View,Text,StyleSheet,Image, TextInput, TouchableOpacity } from "react-native";
import { form, Button } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';


export default function Login(){
    const url = 'http://dayaxpowers.com/api/report'
    const [values, setValues] = useState({
        sp: 811,
        username: '',
        password: ''
    })


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [error, setError] = useState(null);
    const clearUserData = async () => {
        try {
          await AsyncStorage.removeItem('user');
          console.log('User data removed');
        } catch (error) {
          console.error('Error removing user data:', error);
        }
      };

     // clearUserData();
    const handleLogin = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(url,values);
            if(response.data.result.length == 0){
                setError('ID-ga iyo Password-ka waa qalad');
            }else{
                setData(response.data.result);
                const result = response.data.result[0];
                     try {
         await AsyncStorage.setItem('user', JSON.stringify({result }));
                        
                        //Alert.alert('Data saved');
                    } catch (error) {
                        console.error('Error saving data', error);
                    }
              router.push('/')  ;
            }

            console.log('url:', url, 'values:', values, 'response:', response.data)

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    


    console.log('values:', values, 'data:', data);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#42a3c9'}}>
        <View style={styles.container}>
    
        <View style={styles.header}>
      
    <Image source={require('../../assets/logodayax.png')} style={styles.headerImg} alt='Logo' />
    <Text style={styles.title}>Log In</Text>
        </View>
    
    <View style={styles.form}>
    
    <View style={styles.input}> 
        <Text style={styles.inputLabel}>ID / User </Text>
        <TextInput style={styles.inputControl} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" placeholder="ID / user " placeholderTextColor="#6b7280"  onChangeText={(val) => setValues({...values, username : val})}/>
    </View>
    
    
    <View style={styles.input}> 
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput style={styles.inputControl} secureTextEntry placeholder="********" placeholderTextColor="#6b7280"  onChangeText={(val) => setValues({...values, password : val})}/>
    </View>
    <View style={styles.formAction}>
 <Button title="Soogal" buttonStyle={styles.btn} onPress={handleLogin} />
       {error && <Text style={styles.error}>Error: {error}</Text>}

    </View>
 
    </View>
    
      </View>
        </SafeAreaView>
      );
}


const styles = StyleSheet.create({
    container:{
        padding: 24,
        flex: 1,
    },
    header:{
    marginVertical: 36,
    },
    text:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '900',
        color:'white'
      }, 
    headerImg:{
        width: 100,
        height: 100,
        alignSelf: 'center',
       marginBottom:36,
       borderRadius: 60,
    },
    title:{
        fontSize: 27,
        fontWeight: '700',
        color: '1e1e1e',
        marginBottom: 6,
        textAlign: 'center',
        color: 'white',
        textShadowColor: '#6979C9', // Shadow color
        textShadowOffset: { width: 0, height: 9 }, // Offset for the shadow
        textShadowRadius: 1, // Blur radius for the shadow
        
    },
    input:{
        marginBottom: 16,
    },
    inputLabel:{
        fontSize:  17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
        color: 'white',
        marginLeft: 22, // Adjust as needed
        marginRight: 22, // Adjust as needed
        
    },
    inputControl:{
        height: 44,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',

        marginLeft: 20, // Adjust as needed
        marginRight: 20, // Adjust as needed
       

    },
    form:{
       marginBottom: 24,
       flex: 1,

    },
    formAction:{
        marginVertical: 24,
    },
    btn:{
        backgroundColor: '#075eec',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FF8C00',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: '#FF8C90',

        marginLeft: 50, // Adjust as needed
        marginRight: 50, // Adjust as needed
       

        },
        error:{
            paddingVertical: 7,
            textAlign: 'center',
            marginTop: 1,
            borderRadius: 12,
            color: 'red',
            fontWeight: '700'
               },
        btnText: {
            fontSize: 18,
            fontWeight: '600',
            color: '#',
        }

    
});