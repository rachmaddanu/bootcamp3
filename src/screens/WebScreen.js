import React, { Component } from 'react';
import { View } from 'react-native';
import { MapView } from 'expo';
import { Button } from 'react-native-elements';

class WebScreen extends Component {
   render() {
       console.log(this.props.navigation.state.params)
      return (
         <View style={{ flex: 1 }}>
            <MapView 
                style={{ flex: 1 }}
                region={{
                    latitude: this.props.navigation.state.params.data.geometry.location.lat,
                    longitude: this.props.navigation.state.params.data.geometry.location.lng,
                    longitudeDelta: 0.04,
                    latitudeDelta: 0.09
                }}
            >

                <MapView.Marker
                    coordinate={{
                        latitude: this.props.navigation.state.params.data.geometry.location.lat,
                        longitude: this.props.navigation.state.params.data.geometry.location.lng,
                        longitudeDelta: 0.04,
                        latitudeDelta: 0.09
                    }}
                    title={this.props.navigation.state.params.data.name}
                    description={this.props.navigation.state.params.data.types[0]}
                />

            </MapView>
         </View>
      );
   }
}

export default WebScreen;

