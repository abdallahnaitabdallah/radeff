import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

const Login = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login(username, password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://onedrive.live.com/embed?resid=ADF4A063A5450601%213683&authkey=%21AO4ken-oujkrdO8&width=400&height=403' }}
          style={styles.logo}
        />
      </View>
      <View style={styles.formContainer}>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          containerStyle={styles.inputContainer}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          containerStyle={styles.inputContainer}
        />
        <Button
          title="Login"
          onPress={handleLogin}
          containerStyle={styles.buttonContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  formContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default connect(null, { login })(Login);
