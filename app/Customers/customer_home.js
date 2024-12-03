import { StyleSheet, Text, View, Pressable, Image, Dimensions, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');  // Get the screen width for responsive design

const semesters = () => {
  const url = 'https://dayaxpowers.com/api/report';

  const [balance, setBalance] = useState([]);
  const [secondData, setSecondData] = useState([]); 
  const [ThirdData, setThirdData] = useState([]); 
  const [error, setError] = useState(null); 
  
  const fetchBalance = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue != null) {
        const userData = JSON.parse(jsonValue);
        
        const values1 = {
           sp: 812, 
           cust_id: userData.result.cust_id, 
           action_p: 'cust_balance',
          };
          const values2 = {
            sp: 812, 
            cust_id: userData.result.cust_id, 
            action_p: 'cust_name',
           };
       
  
        const response1 = await axios.post(url, values1);
        setBalance(response1.data.result[0]);

        const response2 = await axios.post(url, values2);
        setSecondData(response2.data.result[0]);

       
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
   

   <Text style={styles.logoText}> Dayax Power Supply  </Text>

<Text style={styles.featureTextw2}> Mudane/Marwo  </Text>
      <View style={styles.expandedContainer}>
                
                 <View style={styles.tableRow}>
                <Text style={styles.rowLabel}>Magaca:</Text>
                <Text style={styles.rowValue}>{secondData.name || 'No Data'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.rowLabel}>Guri no:</Text>
                <Text style={styles.rowValue}>{secondData.cust_id || 'No Data'}</Text>
              </View> 

              <View style={styles.tableRow}>
                <Text style={styles.rowLabel}>Xarunta:</Text>
                <Text style={styles.rowValue}>{secondData.branch || 'No Data'}</Text>
              </View> 

              <View style={styles.tableRow}>
                <Text style={styles.rowLabel}>Zone:</Text>
                <Text style={styles.rowValue}>{secondData.zone || 'No Data'}</Text>
              </View> 

              <View style={styles.tableRow}>
                <Text style={styles.rowLabel}>KW Saacada:</Text>
                <Text style={styles.rowValue}>{secondData.kw || 'No Data'}</Text>
              </View> 

              



      

              
              
              
          
              </View>



              <View style={styles.expandedContainer2}>
              <Text style={styles.textmarch1}> Fadlan ku Bixi lacagta Biilka Merchentiga  </Text>

              <View style={styles.tableRow2}>
                <Text style={styles.rowLabel2}>Merchentiga:</Text>
                <Text style={styles.rowValue2}>{secondData.accnumber || 'No Data'}</Text>
              </View> 
              </View>




      

      


      <Pressable style={styles.feature} >
        <Icon name="cash" size={30} color="#FF9800" />
        <Text style={styles.featureText}>Balance</Text>
        <Text style={styles.resultText1}>${balance?.cust_id}</Text>


      </Pressable>

  

      <Pressable style={styles.feature} onPress={() => router.push('/Customers/statement')}>
        <Icon name="percent" size={30} color="#9C27B0" />
        <Text style={styles.featureText}>Your Statement Detail</Text>
        <Icon name="arrow-right" size={25} color="black" style={styles.icon} />
      </Pressable>


      {/* <Pressable style={styles.feature} onPress={() => router.push('/Customers/test')}>
        <Icon name="percent" size={30} color="#9C27B0" />
        <Text style={styles.featureText}>Your Statement Detail</Text>
        <Icon name="arrow-right" size={25} color="black" style={styles.icon} />
      </Pressable> */}


    </View>
  );
};

  


export default semesters;

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
    backgroundColor: 'rgb(250, 255, 248)',
    borderRadius: 25,
    width: '100%', // Use percentage-based width
    height: width * 0.5,  // Responsive height based on screen width
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
   
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
    top: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  subtitle: {
    fontSize: 24,
    color: '#000000',
  },
  featureText: {
    fontSize: 18,
    marginLeft: 20,
    color: '#333',
  },
  resultText: {
    fontSize: 18,
    marginLeft: 'auto',  // Automatically adjust spacing
    color: 'blue',
    fontWeight: 'bold',
  },
  resultText1: {
    fontSize: 18,
    marginLeft: 'auto',
    color: '#236b17',
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 'auto',  // Automatically move the icon to the right
  },
  icon1: {
    marginLeft: 'auto',
  },

  featureTextw2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f9f5e8',
    textAlign: 'center',


  },


  resultTextcut1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#23164ds',
    
    
    borderWidth: 2, // Set the width of the border
    borderColor: '#EEE2B5', // Set the color of the border
    borderRadius: 5, // Optional: set rounded corners
    padding: 10, // Optional: add some padding inside the border
    textAlign: 'right', // Align text to the left
   
  },

  
 

  custsly: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left', // Align text to the left
    width: '100%', // Optional: set width if needed
   
  
  },

  custsly2:{
     fontSize: 15,
    textAlign: 'right', // Align text to the left
    width: '100%', // Optional: set width if needed
    color: 'black',
    

  },

  expandedContainer: {
    padding: 30,
    backgroundColor: '#f9f9f9',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

 
  tableRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066cc',
    flex: 1,
    minWidth: 120,
  },
  rowValue: {
    fontSize: 16,
    color: '#333',
    flex: 2,
    minWidth: 150,
    textAlign: 'left',
    fontWeight: 'bold'
  },



  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 21,
  },
  logoText: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#fff',
     textAlign: 'center',
  },


  expandedContainer2: {
    padding: 30,
    backgroundColor: '#f9f9f9',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    top: 8,
    
  },
  textmarch1: {
    
    fontSize: 20,              // Font size of the text
    color: 'black',          // Text color (blue in this case)
    textAlign: 'center',       // Center the text horizontally
 
   
    fontWeight: 'bold',        // Makes the font bold (optional)
    textDecorationLine: 'underline',  // Underlines the text

    padding: 2,  // Full margin around the page
  
  
  
  },

  tableRow2: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  rowLabel2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066cc',
    flex: 1,
    minWidth: 120,
  },
  rowValue2: {
    fontSize: 18,                 // Font size of the text
    color: '#1d2838',             // Text color (dark grayish blue)
    flex: 2,                      // Flex property to control the width proportion
    minWidth: 150,                // Minimum width of the cell
    textAlign: 'left',            // Left-align the text
    fontWeight: 'bold',           // Make the text bold
    borderWidth: 1,               // Border width for the cell
    borderColor: '#2c384a',          // Border color (light gray)
    borderRadius: 5,              // Rounded corners for the border (optional)
    padding: 8,                   // Padding inside the cell for spacing
  },

});
