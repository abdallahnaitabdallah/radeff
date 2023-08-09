import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchReclamations } from '../redux/actions';

const ReclamationsScreen = ({ access,user }) => {
  const[reclamations,setReclamations] = useState([])
  useEffect(async() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
        Accept: 'application/json',
      },
    };
    const response = await fetch(`http://localhost:8000/api/technicien-reclamations/${user.id}/`, config);
    const data = await response.json();
    setReclamations(data)
  }, [access,user]);
  const handleReclamationDetail = (reclamation) => {
    navigation.navigate('ReclamationDetail', { reclamation });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Reclamations</Text>
      <FlatList
        data={reclamations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleReclamationDetail(item)}>

          <View style={styles.reclamationItem}>
            <Text style={styles.reclamationId}>Reclamation ID: {item.id}</Text>
            <Text style={styles.description}>Description: {item.description}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
          </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  access: state.auth.access,
  user : state.auth.user
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reclamationItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  reclamationId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
  },
});

export default connect(mapStateToProps)(ReclamationsScreen);
