import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
// Simulating a search API call (use a real API endpoint in production)

// const searchAPI = async (cust_id) => {



const App = () => {
  const [searchId, setSearchId] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
   
   setResults([]);
      // const cust_parms = { sp: 812, cust_id: cust_id, action_p: 'cust_name'};
      // console.log('search:',cust_parms);

      const values2 = { sp: 812, cust_id: searchId, action_p: 'cust_info'};

      //Make Axios POST request for values1 (subjects)
      const response1 = await axios.post('https://dayaxpowers.com/api/report', values2);  
      const result1 = response1.data.result;
    //  setSemesters(result1);
    setResults(result1);
    console.log('request:',values2, 'response:',result1);

    
 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search by Gurino / Tell</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Guri no or Tell"
        keyboardType='numeric'
        value={searchId}
        onChangeText={setSearchId}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity onPress={handleSearch} style={styles.button}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

     
        {results && results.length > 0 ? 

        (
        <View style={styles.expandedContainer}>
     
     <View style={styles.tableRow}>
       <Text style={styles.rowLabel}>Magaca:</Text>
       <Text style={styles.rowValue}>{results[0].name || 'Xogta Lamasoo helin'}</Text>
     </View>

     <View style={styles.tableRow}>
       <Text style={styles.rowLabel}>Tell:</Text>
       <Text style={styles.rowValue}>{results[0].Tell || 'Xogta Lamasoo helin'}</Text>
     </View> 
     <View style={styles.tableRow}>
       <Text style={styles.rowLabel}>Gurino:</Text>
       <Text style={styles.rowValue}>{results[0].cust_id || 'Xogta Lamasoo helin'}</Text>
     </View>
     <View style={styles.tableRow}>
       <Text style={styles.rowLabel}>Xarunta:</Text>
       <Text style={styles.rowValue}>{results[0].branch || 'Xogta Lamasoo helin'}</Text>
     </View>
     <View style={styles.tableRow}>
       <Text style={styles.rowLabel}>Zone:</Text>
       <Text style={styles.rowValue}>{results[0].zone || 'Xogta Lamasoo helin'}</Text>
     </View>

     <View style={styles.tableRow}>
       <Text style={styles.rowLabel}>Xalada:</Text>
       <Text style={styles.rowValue}>{results[0].Xalada || 'Xogta Lamasoo helin'}</Text>
     </View>
   
     <View style={styles.tableRow}>
       <Text style={styles.rowLabel}>Balance:</Text>
       <Text style={styles.rowValue}>${results[0].resto || 'Xogta Lamasoo helin'}</Text>
     </View>

     <View style={styles.tableRow}>
       <Text style={styles.rowLabel}>kw:</Text>
       <Text style={styles.rowValue}>{results[0].kw || 'Xogta Lamasoo helin'}</Text>
     </View>
   

    
</View>
        ) : (
          <Text>no data</Text>
        )}
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#42a3c9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#ddd',        // Light gray border
    borderWidth: 1,             // Border width
    borderRadius: 5,            // Rounded corners
    paddingLeft: 8,             // Padding on the left for better spacing
    marginBottom: 20,           // Space below the input field
    color: 'white',              // Text color inside the input (dark gray)
    fontSize: 15,               // Font size for text
    fontWeight: 'normal',       // Font weight for text (normal or bold)
    
   
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  resultItem: {
    backgroundColor: '#fff',
    padding: '100%',
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultStatus: {
    fontSize: 14,
    color: '#555',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
  },

  expandedContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',    // Centers content horizontally
    flex: 1,                // Ensures the container can take available space
    width: '100%',          // Makes the container full-width (optional)
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#0066cc',
    flex: 1,
    minWidth: 120,
  },
  rowValue: {
    fontSize: 18,
    color: '#333',
    flex: 2,
    minWidth: 150,
    textAlign: 'left',
    fontWeight: 'bold'
  },
});

export default App;
