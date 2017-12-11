import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from './../actions';

class MapScreen extends Component {
    state={
        region: {
            longitude: 106.625,
            latitude: -6.241207,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        },
        keyword: '',
        locationGranted: false
    }

    async componentDidMount() {
       const result = await Permissions.askAsync(Permissions.LOCATION);

       if (result.status === 'granted') {
           this.setState({ locationGranted: true });
           this.getCurrentLocation();
       }
    }

    onRegionChangeComplete(region) {
        this.setState({ region });
    }

    onChangeText(text) {
        this.setState({ keyword: text });
    }

    async getCurrentLocation() {
        const location = await Location.getCurrentPositionAsync({});
        this.setState({ region: location });
    }

    buttonPress() {
        this.props.fetchMap(
            this.state.region, this.state.keyword, () => {
                //this.props.navigation.navigate('deck');
            });
    }

    toPlaces() {
        this.props.fetchMap(
            this.state.region, this.state.keyword, () => {
                this.props.navigation.navigate('places');
            });
    }

    renderMarker() {
        if (this.props.getLocations.length > 0) {
            return this.props.getLocations.map((data, i) => {
                return (
                <MapView.Marker 
                key={i}
                coordinate={{ 
                    latitude: data.geometry.location.lat, 
                    longitude: data.geometry.location.lng 
                }}
                pinColor={'green'}
                title={data.name}
                description={data.types[0] + ', ' + data.types[1]}
                />
                );
            });
        }
    }

    render() {
        console.log(this.props.getLocations.geometry)
        if (!this.state.locationGranted) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Permissions not Granted</Text>
                </View>
            );
        }

        return (
        <View style={{ flex: 1 }}>
            <MapView 
                style={{ flex: 1 }}
                region={this.state.region}
                onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
            >

                <MapView.Marker
                    coordinate={this.state.region}
                    title='Your Position'
                    description='your current position'
                />

                {this.renderMarker()}

            </MapView>

            <View style={styles.formInputContainer}>
                <FormLabel>Search Your Job Position</FormLabel>
                <FormInput
                    onChangeText={this.onChangeText.bind(this)}
                />
            </View>

            <View style={styles.buttonContainer}>
                <View style={styles.wrapper}>
                <Button
                    title='Search Places'
                    backgroundColor='#009688'
                    icon={{ name: 'search' }}
                    onPress={this.buttonPress.bind(this)}
                />

                <Button
                    title='View as List'
                    backgroundColor='#009688'
                    icon={{ name: 'list' }}
                    onPress={this.toPlaces.bind(this)}
                />
                </View>
            </View>
        </View>
        );
    }
}

const styles = {
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20
    },
    wrapper: {
        flexDirection: 'row'
    },
    formInputContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.8)',
        top: 20,
        left: 40,
        right: 40
    }
};

const mapStateToProps = (state) => {
    return {
       getLocations: state.getLocations
    };
 };

export default connect(mapStateToProps, actions)(MapScreen);
