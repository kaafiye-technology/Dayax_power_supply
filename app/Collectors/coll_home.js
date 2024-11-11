import { StyleSheet, Text, View, Pressable, Image, Dimensions, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');  // Get screen width and height

const Semesters = () => {
  const url = 'http://dayaxpowers.com/api/report';

  const [balance, setBalance] = useState([]);
  const [secondData, setSecondData] = useState([]); // For the second API response
  const [error, setError] = useState(null); // To handle errors
  
  const fetchBalance = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue != null) {
        const userData = JSON.parse(jsonValue);
        
        const values1 = {
          sp: 540,
          std_id: userData.result.auto_id
        };

        const values2 = {
          sp: 585,
          std_id: userData.result.auto_id
        };
  
        const response1 = await axios.post(url, values1);
        const result1 = response1.data.result[0];
        setBalance(result1);
  
        const response2 = await axios.post(url, values2);
        const result2 = response2.data.result[0];
        setSecondData(result2); 
        console.log('fee::',response2.data.result);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.feature1} >
        <Image source={require('../../assets/images(6).jpeg')} style={styles.image} />
        <Text style={styles.title}> DPS </Text>
        {/* <Text style={styles.subtitle}> DPS </Text> */}
      </View>


      <Pressable style={styles.feature} onPress={() => router.push('/Collectors/customer_search')}>
        <Icon name="calendar-blank" size={30} color="#9C27B0" />
        <Text style={styles.featureText}>  Search By  Customer   </Text>
        <Icon name="arrow-right" size={25} color="black" style={styles.icon1} />
      </Pressable>

      <Pressable style={styles.feature} onPress={() => router.push('/Collectors/customer_statement')}>
        <Icon name="calendar-blank" size={30} color="#9C27B0" />
        <Text style={styles.featureText}>  Customer Statement   </Text>
        <Icon name="arrow-right" size={25} color="black" style={styles.icon1} />
      </Pressable>

       
      {/* <Pressable style={styles.feature}    onPress={() => router.push('/Collectors/pending_problem')}>
        <Icon name="dots-grid" size={30} color="#FF9800" />
        <Text style={styles.featureText}>  Pending Problem Customer  </Text>
        <Icon name="arrow-right" size={25} color="black" style={styles.icon} />
      </Pressable> */}
     

      <Pressable style={styles.feature}   onPress={() => router.push('/Collectors/process_problem')}> 
        <Icon name="dots-grid" size={30} color="#FF9800" />
        <Text style={styles.featureText}>  Process Problem Customer  </Text>
        <Icon name="arrow-right" size={25} color="black" style={styles.icon} />
      </Pressable>

      



   
    </View>
  );
};

export default Semesters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#42a3c9',
  },
  image: {
    width: '100%',   
    height: '100%',   
    position: 'absolute',  
    top: 0,
    left: 0,
    borderRadius: 25, 
  },
  feature1: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 25,
    width: width * 0.9,   // Responsive width (90% of the screen width)
    height: height * 0.25, // Responsive height (25% of the screen height)
    justifyContent: 'center', 
    alignItems: 'center',     
    marginBottom: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: Platform.OS === 'ios' ? 20 : 13,  // Different padding for iOS and Android
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
    
  },
  title: {
    fontSize: width * 0.12,  // Responsive font size
    fontWeight: 'bold',
    color: '#FFFF00',
    padding: 10,
    textShadowColor: '#6979C9', // Set the shadow color (black with 50% opacity)
    textShadowOffset: { width: 0, height: 8 }, // Set the offset for the shadow
    textShadowRadius: 3, // Set the blur radius of the shadow



  },
  subtitle: {
    fontSize: width * 0.04,  // Responsive font size
    color: '#FFFF00',
  },
  featureText: {
    fontSize: width * 0.045,  // Responsive font size
    marginLeft: 40,
    color: '#333',
  },
  icon: {
    marginLeft: 'auto',   // Align to right dynamically
  },
  icon1: {
    marginLeft: 'auto',   // Align to right dynamically
  }
});
