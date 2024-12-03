import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { Card } from 'react-native-elements';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const TableComponent = () => {
  const [secondData, setSecondData] = useState([]);  
  const url = 'https://dayaxpowers.com/api/report';
  const fetchBalance = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue != null) {
        const userData = JSON.parse(jsonValue);
        
     
          const values = {
            sp: 818,
          cust_id: 1009,
          from_p: '0000-00-00',
          to_p: '0000-00-00',
          co_p: 1,
          user_p: 1, // Pass the actual description here
           };
       
  
        const response = await axios.post(url, values);
        setSecondData(response.data.result);

        console.log(response.data.result)

     

       
      }
    } catch (err) {
      setError(err.message);
    }

  };



  useEffect(() => {
    fetchBalance();
  }, []);
  return (
    <ScrollView horizontal style={styles.container}>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.row}>
        
          <Text style={[styles.headerCell, styles.firstCell]}>Date</Text>
          <Text style={styles.headerCell}>A.hore</Text>
          <Text style={styles.headerCell}>A.Dambe</Text>
          <Text style={styles.headerCell}>Farqi</Text> 
          <Text style={styles.headerCell}>Rate</Text>
          <Text style={styles.headerCell}>Dalacad</Text>
          <Text style={styles.headerCell}>Bixin</Text>
          <Text style={styles.headerCell}>Q.dhimis</Text>
          <Text style={styles.headerCell}>Haraa</Text>
        </View>

        {/* Row 1 */}

        {secondData.map((row) => (

     
        <View style={styles.row}>
          <Text style={[styles.cell, styles.firstCell]}>  {row.Tar} </Text>
          <Text style={styles.cell}> {row.AHore} </Text>
          <Text style={styles.cell}> {row.ADambe} </Text>
          <Text style={styles.cell}> {row.Farqi} </Text>
          <Text style={styles.cell}> {row.Rate} </Text>
          <Text style={styles.cell}> {row.Dalacan} </Text>
          <Text style={styles.cell}> {row.Bixin} </Text>
          <Text style={styles.cell}> {row.QDhimis} </Text>
          <Text style={styles.cell}> {row.Haraa} </Text>


     
         
        </View>
   ))}
    
     


          
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerCell: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'yellow',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    width: 150, // Fixed width for header cells
  },
  firstCell: {
    borderLeftWidth: 1,  // Add border to the left side of the first column
  },
  cell: {
    textAlign: 'center',
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    width: 150, // Fixed width for cells, you can adjust this for wider columns
  },
});

export default TableComponent;
