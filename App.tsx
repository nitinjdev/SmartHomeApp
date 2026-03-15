/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { setPersistenceEnabled } from '@react-native-firebase/database';
import { db } from './src/services/firebase/dbConstant';

setPersistenceEnabled(db, true);

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <Provider store={store}>
        <SafeAreaProvider>
          <PersistGate loading={null} persistor={persistor}>
            <AppNavigator />
          </PersistGate>
        </SafeAreaProvider>
      </Provider>
    </>
  );
}


export default App;
