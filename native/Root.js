import React, { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { connect, useDispatch } from 'react-redux';
import { checkAuthenticated, loadUser } from './src/redux/actions';

import Login from './src/screens/Login';
import Dashboard from './src/screens/Dashboard';
import ReclamationsScreen from './src/screens/Reclamations';
import ReclamationDetail from './src/screens/ReclamationDetails';
import NavigationBar from './src/screens/Navbar'

const Stack = createNativeStackNavigator();

const App = ({ isAuthenticated }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthenticated());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        ) : (
          <React.Fragment>
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Reclamations"
            component={ReclamationsScreen}
            options={{
              headerShown: false,
            }}
          />    
          </React.Fragment>   
        )}
        {/* ReclamationDetail screen should be outside of the conditional rendering */}
        <Stack.Screen name="ReclamationDetail" component={ReclamationDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
