import { StyleSheet, Text, View,TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const profile = () => {
  return (
    <ScrollView>
    <SafeAreaView>

        <Text style={styles.log1}>Welcome to Dayax Power Supply</Text>
        <Text style={styles.log2}>Welcome to DPS.</Text>
  <TouchableOpacity style={styles.logout} onPress={() => router.push('/users/login')}>            
          <Text style={styles.log}>Login</Text>
</TouchableOpacity>   </SafeAreaView> </ScrollView>  
  )
}

export default profile

const styles = StyleSheet.create({
    logout:{
        backgroundColor: '#e1e1e6',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        paddingVertical: 7,
        paddingHorizontal: 65,
        
        borderColor:'#e1e1e6'
        },
    log:{
      fontSize: 15,
      fontWeight: 'bold',
      fontFamily:'arial',
    },
    log1:{
        fontSize: 20,
        color:'#214923',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily:'arial',
         
      },
      log2:{
        fontSize: 20,
        fontFamily:'arial',
        paddingLeft: 10
      },
})

