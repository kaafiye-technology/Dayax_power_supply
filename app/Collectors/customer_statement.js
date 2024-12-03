import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const CustomerStatement = () => {
  const [customerId, setCustomerId] = useState('');
  const [statement, setStatement] = useState([]);
  const [loading, setLoading] = useState(false);
  const [secondData, setSecondData] = useState([]);
  const url = 'https://dayaxpowers.com/api/report';

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const values = {
        sp: 818,
        cust_id: customerId,
        from_p: '0000-00-00',
        to_p: '0000-00-00',
        co_p: 1,
        user_p: 1,
      };
      const response = await axios.post(url, values);
      setSecondData(response.data.result);
      console.log('Search Result:', response.data.result);
    } catch (err) {
      console.error('Error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customerId) {
      fetchBalance();
    }
  }, [customerId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Statement</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Customer ID"
        value={customerId}
        onChangeText={setCustomerId}
      />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView style={styles.tableContainer} horizontal>
          <View>
            <View style={styles.header}>
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
            {secondData.map((row, index) => (
              <View style={styles.row} key={index}>
                <Text style={[styles.cell, styles.firstCell]}>{row.Tar}</Text>
                <Text style={styles.cell}>{row.AHore}</Text>
                <Text style={styles.cell}>{row.ADambe}</Text>
                <Text style={styles.cell}>{row.Farqi}</Text>
                <Text style={styles.cell}>{row.Rate}</Text>
                <Text style={styles.cell}>{row.Dalacan}</Text>
                <Text style={styles.cell}>{row.Bixin}</Text>
                <Text style={styles.cell}>{row.QDhimis}</Text>
                <Text style={styles.cell}>{row.Haraa}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  tableContainer: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headerCell: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'yellow',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    width: 105,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  cell: {
    textAlign: 'center',
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    width: 105,
    fontWeight: 'bold',
  },
});

export default CustomerStatement;
