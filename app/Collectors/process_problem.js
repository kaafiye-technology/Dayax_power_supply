import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';  // For dropdown menus


// Helper function to get the current date
const getCurrentDate = () => {
  const today = new Date();
  const date = today.getDate();
  const month = today.toLocaleString('default', { month: 'short' });
  const year = today.getFullYear();
  return `${date} ${month} ${year}`;  // Fixed string interpolation
};

// Helper function to get the current day
const getCurrentDay = () => {
  const today = new Date();
  const options = { weekday: 'long' };
  return today.toLocaleDateString('en-US', options);
};

const SemesterSubjects = () => {
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [ratings, setRatings] = useState({});  // Track ratings and descriptions
  const [subjects, setSubjects] = useState([]);
  const [description, setDescription] = useState('');
  

  const [semesters, setSemesters] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]); // Store dynamic dropdown values

  useEffect(() => {
    setCurrentDate(getCurrentDate());
    setCurrentDay(getCurrentDay());
    fetchSemesters();
  }, []);

  // Fetch semesters and subjects from API
  const fetchSemesters = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue) {
        const userData = JSON.parse(jsonValue);

        // Define the values to be sent in the first POST request
        const values1 = { sp: 814, user_id: userData.result.auto_id, typ: 'Process' };
        const values2 = { sp: 815, user_id: userData.result.auto_id};

        // Make Axios POST request for values1 (subjects)
        const response1 = await axios.post('http://dayaxpowers.com/api/report', values2);  
        const result1 = response1.data.result;
        setSemesters(result1);
        console.log('Semester (Response 1):', result1);

        // Make Axios POST request for values2 (dropdown options)
        const response2 = await axios.post('http://dayaxpowers.com/api/report', values1);  
        const result2 = response2.data.result;
        setSubjects(result2);
        console.log('Subjects (Response 2):', result2);

        // Assuming response1 contains dropdown values (ratings)
        setDropdownOptions(response1.data.dropdownOptions || []); // Set dropdown options
      }
    } catch (err) {
      console.log('Error:', err);
    }
  };

  // Toggle subject expansion
  const toggleExpand = (id) => {
    setExpandedSubject(expandedSubject === id ? null : id);
  };

  // Handle dropdown change
  const handleDropdownChange = (subjectId, semesterId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [`${subjectId}-${semesterId}`]: rating,  // Fixed string interpolation
    }));
  };

  // Handle input change for description
  const handleInputChange = (text, subjectId, semesterId) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [`${subjectId}-${semesterId}`]: text,  // Fixed string interpolation
    }));
    setDescription(text)
  };

  // Check if any description has been written
  const isAnyDescriptionWritten = () => {
    return Object.values(ratings).some((value) => typeof value === 'string' && value.trim().length > 0);
  };

  // Handle save functionality
  const handleSave = async (id_pro) => {
    // if (!isAnyDescriptionWritten()) {
    //   Alert.alert('Description Required', 'Please write a description for at least one subject before saving.');
    //   return;
    // }

    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue) {
        const userData = JSON.parse(jsonValue);

        // Loop through the semesters and subjects to send ratings and descriptions
   
        
           
           
            // Only send the description if it's not empty
          //  if (description.trim().length > 0) {
              console.log ('loob3')
              const values3 = {
                sp: 817,
                id_pro: id_pro,
                type_p: 'Process',
                emp_p: userData.result.employee_id,
                _done_description: description,  // Pass the actual description here
                user_p: userData.result.auto_id,
              };

              // Make the POST request for saving the description
              console.log ('request',values3)
              const response3 = await axios.post('http://dayaxpowers.com/api/report', values3);
              console.log('Description submitted:', response3.data);  // Log the response data
        //    }
       
        alert('Qiimayntada Wa La Diwangaliyay!');
      //  reloadScreen();
      fetchSemesters();
      }
    } catch (err) {
      console.log('Save Error:', err);
      alert('An error occurred while saving.');
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dateText}>{currentDate}</Text>
        <Text style={styles.dayText}>{currentDay}</Text>
      </View>

      <View style={styles.semesterContainer}>
        <FontAwesome name="bookmark" size={24} color="blue" />
        <Text style={styles.semesterText}>Cabashooyinka Process ah</Text>
      </View>

      {subjects.map((subject) => (
        <View key={subject.id}>
          <TouchableOpacity
            style={styles.subjectContainer}
            onPress={() => toggleExpand(subject.id)}
          >
            <View style={styles.subjectIcon}>
              <FontAwesome name="file-text" size={24} color="orange" />
            </View>
            <Text style={styles.subjectText}>{subject.Gurino}</Text>

            <FontAwesome
              name={expandedSubject === subject.id ? 'chevron-up' : 'chevron-down'}
              size={18}
              color="gray"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>

          {expandedSubject === subject.id && (
            <View style={styles.expandedContainer}>
                 <View style={styles.tableRow}>
                <Text style={styles.rowLabel}>Problem ID:</Text>
                <Text style={styles.rowValue}>{subject.id || 'No lecturer assigned'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.rowLabel}>Magaca:</Text>
                <Text style={styles.rowValue}>{subject.Magaca || 'No lecturer assigned'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.rowLabel}>Tell:</Text>
                <Text style={styles.rowValue}>{subject.tell2 || 'No lecturer assigned'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.rowLabel}>Tell2 :</Text>
                <Text style={styles.rowValue}>{subject.tell || 'No lecturer assigned'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.rowLabel}>Xarunta:</Text>
                <Text style={styles.rowValue}>{subject.Branch || 'No lecturer assigned'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.rowLabel}>Zone:</Text>
                <Text style={styles.rowValue}>{subject.Zone || 'No lecturer assigned'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.rowLabel}>Deriska:</Text>
                <Text style={styles.rowValue}>{subject.Deriska || 'No lecturer assigned'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.rowLabel}>Cabashada:</Text>
                <Text style={styles.rowValue}>{subject.Problem || 'No lecturer assigned'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.rowLabel}>Nuuca Cabasho:</Text>
                <Text style={styles.rowValue}>{subject.Cabashada || 'No lecturer assigned'}</Text>
              </View>

              <TextInput
                style={styles.inputField}
                placeholder="FaaFaahin Sogalis..."
                value={ratings[`${subject.id}-${subject.id}`] || ''}
                onChangeText={(text) => handleInputChange(text, subject.id, subject.id)}
              />

<TouchableOpacity
        style={[styles.saveButton, { backgroundColor: isAnyDescriptionWritten() ? '#0044cc' : '#cccccc' }]}
        onPress={() => handleSave(subject.id)}
        disabled={!isAnyDescriptionWritten()}
      >
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
            </View>
          )}
        </View>
      ))}

     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dayText: {
    fontSize: 16,
    color: 'gray',
  },
  semesterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  semesterText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  subjectIcon: {
    marginRight: 10,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  expandedContainer: {
    padding: 15,
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
  inputField: {
    marginTop: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,
    backgroundColor: 'white',
    color: 'black',
    fontFamily: 'Roboto',
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
});

export default SemesterSubjects;
