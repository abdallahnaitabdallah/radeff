import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../redux/actions';

const UserScreen = ({ user, logout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>User Details:</Text>
      {user && (
        <View>
          <Text>Username: {user.username}</Text>
          <Text>First Name: {user.first_name}</Text>
          <Text>Last Name: {user.last_name}</Text>
          <Text>Role: {user.role}</Text>
        </View>
      )}
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(UserScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
