import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from "expo-router";
const Dashboard = () => {

 

  const [user, setUser] = useState([]);

  // Function to load data
  const getStorage = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue != null) {
            const userData = JSON.parse(jsonValue);
            
            console.log('userdata', userData.result.usertype);
            setUser(userData);
        } else {
          router.push('/welcome/welcome');
        }
    } catch (error) {
        console.error('Error loading data', error);
    }
  };


  const [update, setUpdate] = useState(null);
  const [values, setValues] = useState({
    sp: 551,
    version: 1,
})
  const CheckVersion = async () => {
    try {
      const res = await axios.post('https://dayaxpowers.com/api/save'
, 
        values,
      );
      setUpdate(res.data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log('val',values)

console.log('version update',update)

if( update== 'Not Updated' ){
  router.push('/update')
}

  useEffect(() => {
    getStorage();
    CheckVersion();
  }, []);

  console.log('usertype', user?.result?.usertype);


  return (
    <View style={styles.container}>
      {/* University Logo */}

      
      <View style={styles.logoContainer}>

        <Image source={{uri: 'https://dayaxpowers.com/uploads/ktc_edit_sp/logo/logodayax.png_ktceditsp_20240925200242.png' }} style={styles.headerImg} alt='Logo' />
                <Text style={styles.logoText}>App DPS</Text>


      </View>

      {/* Features */}
      <View style={styles.featuresContainer}>


    {user?.result?.usertype == "customer"  && 
      <Pressable style={styles.feature}  onPress={() => router.push('/Customers/customer_home')}>
          <Icon name="cash" size={30} color="#FF9800" />
          <Text style={styles.featureText}>Bill Customer</Text>
        </Pressable>
}


       
    {user?.result?.usertype == "colleter"  && 
        <Pressable style={styles.feature}  onPress={() => router.push('/Collectors/coll_home')}>
          <Icon name="account-outline" size={30} color="#4CAF50" />
          <Text style={styles.featureText}>  Collectors  </Text>
        </Pressable>

}


      
        <Pressable style={styles.feature} onPress={() => router.push('/users/profile')}>
          <Icon name="account" size={30} color="#9C27B0"  />
          <Text style={styles.featureText}>Info Company / Profile</Text>
        </Pressable>

      


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#42a3c9',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 21,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  featuresContainer: {
    marginTop: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    marginVertical: 10,
    borderRadius: 13,
    elevation: 2,
  },
  featureText: {
    fontSize: 18,
    marginLeft: 20,
    color: '#333',
  },
  headerImg:{
    width: 150,
    height: 150,
    alignSelf: 'center',
   marginBottom:36,
   borderRadius: 60,
}
});

export default Dashboard;


