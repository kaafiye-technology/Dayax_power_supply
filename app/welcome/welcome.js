import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, ImageBackground, StyleSheet } from 'react-native';
import axios from 'axios';

const reportUrl = `http:///api/report`;

const WelcomeScreen = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const values = {
    sp: 576,
    faculty_id: '%'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(reportUrl, values);
        setDepartments(response.data.result);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <ImageBackground source={require('../../assets/dd1.jpg')} style={styles.background}>
      {/* Additional content goes here */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

  background: {
    flex: 1,             // Ensures the ImageBackground fills the entire screen
    width: '100%',       // Ensures full width
    height: '120%',      // Ensures full height
    resizeMode: 'cover', // Scales the image to cover the entire area, avoiding blank spaces
    justifyContent: 'center', // Centers any children within the background image
    alignItems: 'center', // Center-aligns any children horizontally
  
  },


  
});

export default WelcomeScreen;
