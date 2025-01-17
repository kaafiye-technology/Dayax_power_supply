
import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
const ProfileScreen = () => {


  const url = 'https://dayaxpowers.com/api/report'
   
    const [user, setUser] = useState([]);
  
    
    const fetchProfile = async () => {
        
        try {
            const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue != null) {
            const userData = JSON.parse(jsonValue);
            const values = {
                sp: 537,
                std_id: userData.result.auto_id
            }

            const response = await axios.post(url,values);

            const result = response.data.result[0];
                setUser(result);
                console.log('yes:',  response.data.result);

            
        }
            

           
        } catch (err) {
            setError(err.message);
        } finally {
          //  setLoading(false);
        }
    };

    useEffect(()=>{
        fetchProfile();
    },[])
    


    console.log('user:', user);
  return (
    <ScrollView>
    <View style={styles.container}>
      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{uri: 'https://dayaxpowers.com/uploads/ktc_edit_sp/logo/logodayax.png_ktceditsp_20240925200242.png' }}
          style={styles.profileImage}


          
        />
      </View>

      {/* User Name */}
      <Text style={styles.userName}>{user?.name}</Text>

      {/* Student and Hemis IDs */}
      {/* <View style={styles.idContainer}>
        <View style={styles.idBox}>
        <MaterialCommunityIcons name="card-account-details" size={30} color="#4CAF50" style={styles.icon}/>
          <Text style={styles.idTitle}>{user?.auto_id}</Text>
          <Text style={styles.idSubtitle}>Student Id</Text>
        </View>
        <View style={styles.idBox}>
        <MaterialCommunityIcons name="card-account-details-outline" size={30} color="#4CAF50" style={styles.icon}/>
          <Text style={styles.idTitle}>{user?.id}</Text>
          <Text style={styles.idSubtitle}>Hemis Id</Text>
        </View>
      </View> */}

      {/* Additional Info: Class, Semester, Status */}
      {/* <View style={styles.infoContainer}>
                 <View>

       <Text style={styles.infoText3}>Class</Text>
        <Text style={styles.infoSubText}>{user?.class}</Text>
        </View>

                 <View>

        <Text style={styles.infoText}>Semester</Text>
        <Text style={styles.infoSubText1}>{user?.semester}</Text>
        </View>
         <View>
        <Text style={styles.infoText}>Status</Text>
         <Text style={styles.infoSubText2}>{user?.status}</Text>
</View>
      </View> */}

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/welcome/login')}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Academic Information */}
      {/* <View style={styles.academicInfoContainer}>
         <View style={styles.line}></View>
        <Text style={styles.academicInfoHeader}>Student Information</Text>
         <Text style={styles.infoText2}>Campus</Text>
        <Text style={styles.infoSubText4}>{user?.campus}</Text>
        <View style={styles.academicInfoContainer1}/>
        <Text style={styles.infoText2}>Faculty</Text>
        <Text style={styles.infoSubText3}>{user?.faculty}</Text>
        <View style={styles.academicInfoContainer1}/>
        <Text style={styles.infoText2}>Department</Text>
        <Text style={styles.infoSubText3}>{user?.department}</Text>
        <View style={styles.academicInfoContainer1}/>
        <Text style={styles.infoText2}>Shift</Text>
        <Text style={styles.infoSubText3}>{user?.shift}</Text>
        <View style={styles.academicInfoContainer1}/>
        <Text style={styles.infoText2}>Gender</Text>
        <Text style={styles.infoSubText3}>{user?.gender}</Text>
        <View style={styles.academicInfoContainer1}/>
        <Text style={styles.infoText2}>Date of Birth</Text>
        <Text style={styles.infoSubText3}>{user?.dob}</Text>
        <View style={styles.academicInfoContainer1}/>
        <Text style={styles.infoText2}>Place of Birth</Text>
        <Text style={styles.infoSubText3}>{user?.pob}</Text>
        <View style={styles.academicInfoContainer1}/>
        <Text style={styles.infoText2}>Mother Name</Text>
        <Text style={styles.infoSubText3}>{user?.mother}</Text>
        <View style={styles.academicInfoContainer1}/>
        <Text style={styles.infoText2}>Contact Name</Text>
        <Text style={styles.infoSubText3}>{user?.contact_name}</Text>
        <View style={styles.academicInfoContainer1}/>
        <Text style={styles.infoText2}>Contact Phone</Text>
        <Text style={styles.infoSubText3}>{user?.contact_tell}</Text>
        <View style={styles.academicInfoContainer1}/>
        <Text style={styles.infoText2}>Blood Type</Text>
        <Text style={styles.infoSubText3}>{user?.blood_group}</Text>
        <View style={styles.academicInfoContainer1}/>

      </View> */}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  profileImageContainer: {
    marginTop: 20,
    marginBottom: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  icon:{
    marginLeft:85,
    position: 'absolute',
    Top:40
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  idContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '87%',
    marginBottom: 20,           
  },
  idBox: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 15,
    borderWidth: 1,
     borderColor:'#9aacae',
  },
  icon: {
    marginBottom: 10,  // Adds spacing between the icon and the text
    marginLeft: 60
  },
  idTitle: {
    position: 'absolute',
    marginTop: 15,
    left: 10,
    fontSize: 16,
    fontWeight: 'bold', // Changed fontWeight to 'bold'
    color: '#343434',
  },
  idSubtitle: {
    paddingTop: 5, // Adjust spacing between title and subtitle
    fontSize: 12,
    color: '#666',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  infoText3: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft:8

  },
  infoSubText: {
    fontSize: 12,
  },
  infoSubText1: {
    fontSize: 12,
    marginLeft:35
  },
  infoSubText2: {
    fontSize: 12,
    marginLeft:8
    
  },
  infoSubText3: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 230
    
  },
  infoSubText5: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 260
    
  },
  infoSubText4: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 200
    
  },

 
  infoText2: {
    fontSize: 15,
    marginTop:20,
   color: "#FF9800",
   fontWeight: 'bold',

  },
  logoutButton: {
    marginBottom: 30,
    backgroundColor: '#236b17',
    borderRadius: 15,
     flexDirection: 'row',
       alignItems: 'center',
   justifyContent:'center',
    paddingVertical: 7,
      paddingHorizontal: 120,
       
  },
   line: {
    width: 2, // Line width
    height: 15, // Line height
    backgroundColor: 'green', // Line color
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  academicInfoContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
  },
  academicInfoContainer1: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 10
  },
  academicInfoHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    marginTop: 18,
    left: 5,
    color: "#236b17",

  },
  academicInfoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
});

export default ProfileScreen;
