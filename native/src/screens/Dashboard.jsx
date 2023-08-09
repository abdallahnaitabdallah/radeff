import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchTechnicianData, logout } from '../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the logout and reclamations icons from react-native-vector-icons

const Dashboard = ({ access, user, technicianData, fetchTechnicianData, logout, navigation }) => {
  const [totalReclamations, setTotalReclamations] = useState(0);
  const [nonClosedReclamations, setNonClosedReclamations] = useState(0);
  const [lastNonClosedReclamations, setLastNonClosedReclamations] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${access}`,
          'Accept': 'application/json'
        }
      };

      fetchTechnicianData(user.id, config);
    }
  }, [user, access, fetchTechnicianData]);

  useEffect(() => {
    setTotalReclamations(technicianData.totalReclamations);
    setNonClosedReclamations(technicianData.nonClosedReclamations);
    setLastNonClosedReclamations(technicianData.lastNonClosedReclamations);
  }, [technicianData]);

  const handleReclamationDetail = (reclamation) => {
    navigation.navigate('ReclamationDetail', { reclamation });
  };

  const handleLogout = () => {
    logout();
  };

  const handleReclamations = () => {
    navigation.navigate('Reclamations');
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="sign-out" size={26} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [handleLogout, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.headerButtonsContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="sign-out" size={24} color="#111" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        {/* Add the "Reclamations" button with an icon */}
        <TouchableOpacity style={styles.reclamationsButton} onPress={handleReclamations}>
          <Icon name="file-text" size={24} color="#111" />
          <Text style={[styles.buttonText, { color: '#111' }]}>Reclamations</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <Text style={styles.gridItemTitle}>Non-Closed Reclamations</Text>
            <Text style={styles.gridItemValue}>{nonClosedReclamations}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridItemTitle}>Total Reclamations</Text>
            <Text style={styles.gridItemValue}>{totalReclamations}</Text>
          </View>
        </View>

        <Text style={styles.listViewTitle}>Non-Closed Reclamations</Text>
        {/* Use FlatList for the list */}
        <FlatList
          data={nonClosedReclamations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleReclamationDetail(item)}>
              <View style={styles.listItem}>
                <Text>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
        />        
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  access: state.auth.access,
  user: state.auth.user,
  technicianData: state.auth.technicianData
});

const mapDispatchToProps = {
  fetchTechnicianData,
  logout
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    margin: 5,
    flex: 1,
  },
  gridItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gridItemValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listViewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  reclamationsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    marginLeft: 5,
    color: '#111',
    fontSize: 16,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
