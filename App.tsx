import React from 'react';
import Root from './src/screens/Root';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import {LogBox, StatusBar} from 'react-native';
import {MD3LightTheme, PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {LogLevel, OneSignal} from 'react-native-onesignal';

function App(): React.JSX.Element {
  OneSignal.initialize('36ba4e67-6a5f-4bae-9269-4ccdededab2d');

  OneSignal.Notifications.requestPermission(true);

  console.log(OneSignal.User.pushSubscription.getPushSubscriptionId());

  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={MD3LightTheme}>
            <StatusBar />
            <Root />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
