import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getReclamationDetail } from '../redux/actions';
import { Button, ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReclamationDetail = ({ route, access, reclamationDetail, user, getReclamationDetail }) => {
  const { reclamation } = route.params;
  const [status, setStatus] = useState(reclamation.status);
  const [reclameurName, setReclameurName] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [technicianName, setTechnicianName] = useState('');

  useEffect(() => {
    setStatus(reclamation.status);
  }, [reclamation.status]);

  useEffect(() => {
    if (reclamationDetail) {
      axios
      .get(`http://127.0.0.1:8000/api/reclameurs/`, {
        headers: {
          'Authorization': `JWT ${access}`,
          'Accept': 'application/json',
        },
      })
      .then((response) => {
        const matchingReclameur = response.data.find(reclameur => reclameur.id === reclamationDetail.reclameur);
        if (matchingReclameur) {
          setReclameurName(matchingReclameur);
        }
      })
      .catch((error) => {
        console.error('Error fetching reclameur:', error);
      });
      
      // Fetch service name
      axios
        .get(`http://127.0.0.1:8000/api/services/${reclamationDetail.service}/`, {
          headers: {
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json',
          },
        })
        .then((response) => {
          setServiceName(response.data.nom);
        })
        .catch((error) => {
          console.error('Error fetching service:', error);
        });
    }
  }, [access, reclamationDetail]);

  useEffect(() => {
    if (user && user.role === 'Technicien') {
      setTechnicianName(user.username);
    }
  }, [user]);

  const handleUpdateStatus = async () => {
    try {
      const access = await AsyncStorage.getItem('access');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${access}`,
          'Accept': 'application/json'
        }
      };
      const response = await axios.put(
        `http://127.0.0.1:8000/api/reclamation-detail/${reclamation.id}/`,
        {
          ...reclamation,
          status: 'closed', // Update the status to 'closed'
        },config
      );

      // If the update was successful, update the status in the state
      if (response.status === 200) {
        setStatus('closed');
      }
    } catch (error) {
      console.log('Error updating status:', error);
    }
  };

  useEffect(() => {
    // Fetch the reclamation detail when the component mounts
    if (access) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${access}`,
          Accept: 'application/json',
        },
      };

      getReclamationDetail(reclamation.id, config);
    }
  }, [access, getReclamationDetail, reclamation.id]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Reclamation Details</Text>
        {reclamationDetail && (
          <React.Fragment>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title style={styles.label}>Reclamation ID:</ListItem.Title>
                <ListItem.Subtitle style={styles.value}>{reclamationDetail.id}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title style={styles.label}>Description:</ListItem.Title>
                <ListItem.Subtitle style={styles.value}>{reclamationDetail.description}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title style={styles.label}>Status:</ListItem.Title>
                <ListItem.Subtitle style={styles.value}>{status}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title style={styles.label}>Reclameur:</ListItem.Title>
                <ListItem.Subtitle style={styles.value}>{reclameurName.nom}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title style={styles.label}>adress:</ListItem.Title>
                <ListItem.Subtitle style={styles.value}>{reclameurName.adresse}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title style={styles.label}>numero:</ListItem.Title>
                <ListItem.Subtitle style={styles.value}>{reclameurName.telephone}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title style={styles.label}>Service:</ListItem.Title>
                <ListItem.Subtitle style={styles.value}>{serviceName}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title style={styles.label}>Technician:</ListItem.Title>
                <ListItem.Subtitle style={styles.value}>{technicianName}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title style={styles.label}>Date Affectation:</ListItem.Title>
                <ListItem.Subtitle style={styles.value}>{reclamationDetail.date_affectation}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title style={styles.label}>Date Saisie:</ListItem.Title>
                <ListItem.Subtitle style={styles.value}>{reclamationDetail.date_saisie}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </React.Fragment>
        )}
        {status !== 'closed' && (
          <View style={styles.buttonContainer}>
            <Button
              title="Close Reclamation"
              onPress={handleUpdateStatus}
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  access: state.auth.access,
  reclamationDetail: state.auth.reclamationDetail,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getReclamationDetail })(ReclamationDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'blue', // Customize the button background color
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
