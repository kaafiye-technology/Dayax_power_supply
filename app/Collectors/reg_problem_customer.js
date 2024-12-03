import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';  // For dropdown menus

const ComplaintRegistrationScreen = () => {
  const [title, setTitle] = useState('');
  const [tell, setTell] = useState('');
  const [deris, setderis] = useState('');
  const [problem, setproblem] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [selectedFarsamo, setSelectedFarsamo] = useState(''); // For the new dropdown
  const [selectedcabasho, setSelectedcabasho] = useState(''); // For the new dropdown

  const [searchText, setSearchText] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const date = new Date().toISOString().split("T")[0];
  //const [farsamo, setFarsamo] = useState(['Type 1', 'Type 2', 'Type 3']); // Add your farsamo types here
  const [farsamo, setFarsamo] = useState([]);
  const [cabasho, setcabasho] = useState([]);
  const fetchDropdownOptions = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue !== null) {
        const userData = JSON.parse(jsonValue);
        const values = {
          sp: 5,
          action_p: "customer_app",
          prefix_p: " ",
          co_p: 1,
          userId: userData.result.auto_id,
        };
     


        const response = await axios.post('https://dayaxpowers.com/api/report', values); 
        const result = response.data.result;
        setOptions(result);
        setLoading(false);

       

        const values2 = { sp: 819};

        // Make Axios POST request for values1 (subjects)
        const response1 = await axios.post('https://dayaxpowers.com/api/report', values2);  
        const result1 = response1.data.result;
    
        setFarsamo(result1)

            /// new drop cabsho //

            const values3 = { sp: 20,  action_p: "c_care", id_p:  "0",   user_p:  userData.result.auto_id,  co_p: 1,};

        // Make Axios POST request for values1 (subjects)
        const response2 = await axios.post('https://dayaxpowers.com/api/report', values3);  
        const result2 = response2.data.result;
    
        setcabasho(result2)


        ///  end dropd cabasho//

      }


   
     


    } catch (err) {
      console.error('Error fetching dropdown options:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDropdownOptions();
  }, []);

  const handleSelect = (option) => {
    setSelectedOffice(option);
    setSearchText(option.name); // Set the selected item name
    setDropdownVisible(false);  // Hide the dropdown after selection
  };

  const filteredOptions = options.filter(option => 
    option.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const checkDuplicateDescription = async () => {
    try {
      const response = await axios.post('https://dayaxpowers.com/api/report', { description });  
      return response.data.isDuplicate;
    } catch (error) {
      console.error('Error checking for duplicates:', error);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!problem || !selectedcabasho || !selectedFarsamo) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    try {
      const isDuplicate = await checkDuplicateDescription();
      if (isDuplicate) {
        Alert.alert('Duplicate Entry', 'This description already exists. Please provide a unique description.');
        return;
      }



      const jsonValue = await AsyncStorage.getItem('user');
      const userData = JSON.parse(jsonValue);
      const complaintData = {
        sp: 820,
        cust_p: searchText,
        tell_p: tell,
        deris_p: deris,
        co_p: 1,
        problem_p: problem,
        problem_category_p: selectedcabasho,
        nuuca:  selectedFarsamo,
        user_id: userData.result.auto_id, 
      };

      const response11 = await axios.post('https://dayaxpowers.com/api/report', complaintData); 

      if (response11.status === 200) {
        console.log('registered successfully:', response11.data);
        Alert.alert('Success', 'registered successfully!');
        setDescription('');
        setSelectedOffice(null);
        setSearchText(''); // Clear the search field after submission
        setSelectedFarsamo(''); // Reset farsamo dropdown after submission
        setSelectedcabasho(''); // Reset farsamo dropdown after submission
        setderis(''); // Reset farsamo dropdown after submission
        setTell(''); // Reset farsamo dropdown after submission
        setproblem(''); // Reset farsamo dropdown after submission
      } else {
        console.log('Failed to register complaint');
      }
    } catch (error) {
      console.error('Error registering complaint:', error);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Magaca Macamiilka</Text>
      <TextInput
        style={styles.input}
        placeholder="Search Office"
        value={searchText}
        onChangeText={setSearchText}
        onFocus={() => setDropdownVisible(true)} // Show dropdown when input is focused
      />
 
      {isDropdownVisible && searchText ? (
       <View style={styles.flatList}>
        <FlatList
          data={filteredOptions}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}  // Ensure it's a string
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => handleSelect(item)} // Set the selected office and clear suggestions
            >
              <Text style={styles.optionText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        </View>
      ) : null}

      {/* Input Fields in One Line */}
      <View style={styles.inputRow}>

        <TextInput
          style={[styles.input, styles.textArea, { flex: 1, marginRight: 10 }]} // First input field
          placeholder="Tell"
          value={tell}
          onChangeText={setTell}
        />
       

       
        <TextInput
         
          style={[styles.input, styles.textArea, { flex: 1 }]} // Second input field
          placeholder="Deris"
          value={deris}
          onChangeText={setderis}
          multiline={true}
        />
      </View>


         {/* Input Fields in One Line */}
         <View style={styles.inputRow}>
        
        <TextInput
        
          style={[styles.input1, styles.textArea, { flex: 1, marginRight: 10 }]} // First input field
          placeholder="Problem"
          value={problem}
          onChangeText={setproblem}
        />
         
       
      </View>



      <Text style={styles.label}>Cabashada</Text>
      <Picker
        selectedValue={selectedcabasho}
        onValueChange={(itemValue) => setSelectedcabasho(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Cabashada" value="" />
        {cabasho.map((option) => (
          //<Picker.Item key={option.v} label={f} value={f} />
          <Picker.Item key={option.id} label={option.name} value={option.id} />
        ))}
      </Picker>




    


      <Text style={styles.label}>Xiliga</Text>
      <Picker
        selectedValue={selectedFarsamo}
        onValueChange={(itemValue) => setSelectedFarsamo(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Xiliga" value="" />
        {farsamo.map((option) => (
          <Picker.Item key={option.v} label={option.t} value={option.v} />
        ))}
      </Picker>

      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: '#016b0c' }]}
        onPress={handleSubmit}
      >
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#42a3c9',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 55,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
    textAlign: 'left',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop: 13,
  },

  input1: {
    
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: '#fff',
      padding: 10,
      color: '#333',         // Text color
      fontWeight: 'bold',    // Bold text
    
  },
  textArea: {
    height: 40,
    textAlign: 'left',
  },
  picker: {
    height: 60,
    width: '100%',          // Ensures the picker takes full width
    borderColor: '#ccc',    // Border color
    borderWidth: 1,         // Border thickness
    borderRadius: 5,        // Rounded corners
    backgroundColor: '#fff',// Background color
    marginBottom: 30,       // Margin below the picker
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  flatList: {
    backgroundColor: '#a6a6a6',  // Set the background color to white
    borderColor: '#ccc',      // Light gray border color
    borderWidth: 1,           // Border width
    borderRadius: 8,          // Rounded corners
    maxHeight: 200,           // Optional: Set maximum height for better visibility
    marginBottom: 10,         // Add some spacing below the FlatList
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',  // Light gray separator between items
  },
  optionText: {
    fontSize: 20,
    color: '#faf7f7',
  },
  
  inputRow: {
    flexDirection: 'row',         // Align label and input horizontally
    alignItems: 'center',         // Vertically center label and input
    marginBottom: 20,
  },
  
  inlineLabel: {
    fontSize: 16,
    color: '#fff',                // Change this color to match your design
    marginRight: 10,              // Space between label and input field
  },
  
 
});

export default ComplaintRegistrationScreen;
