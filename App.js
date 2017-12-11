import React from 'react';
import { View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Expo from 'expo';
import { Provider } from 'react-redux';

import MapScreen from './src/screens/MapScreen';
import PlacesScreen from './src/screens/PlacesScreen';
import savedPlacesScreen from './src/screens/savedPlacesScreen';
import SettingScreen from './src/screens/SettingScreen';
import WebScreen from './src/screens/WebScreen';
import store from './src/store';

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({ // buat Tab, taroh dulu di variabel
      map: { screen: MapScreen },
      places: { screen: PlacesScreen },
      savedplaces: {
        screen: StackNavigator({
          savedplaces: { screen: savedPlacesScreen },  //tab di dalam tab
          web: { screen: WebScreen },
          setting: { screen: SettingScreen } 
        })
      }
    }, {
      tabBarPosition: 'bottom',
      lazy: true, //ngatasi bug tab didalam tab ga bisa dipencet
      swipeEnabled: false,
      animationEnabled: false
    });

    return (
      <Provider store={store}>
        <View style={{ flex: 1, paddingTop: Expo.Constants.statusBarHeight }}> 
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

