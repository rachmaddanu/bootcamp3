import React, { Component } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import qs from 'qs';

import * as actions from './../actions';

const NO_IMAGE = 'http://vignette3.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png/revision/latest?cb=20130527163652';
const IMAGE = 'https://maps.googleapis.com/maps/api/place/photo?';
const IMAGE_QUERY_PARAMS = {
    photoreference: '',
    key: 'AIzaSyDsaEYzEfYDFmD8QjRgy4SPhaJftg4_l9w ',
    maxwidth: 400,
    maxheight: 400
};

class savedPlacesScreen extends Component {
	//static is the class property, not instance property
	//static is ReviewScreen configurations
   static navigationOptions = ({ navigation }) => {
		return {
			title: 'Review Jobs',
			headerTitleStyle: {
				alignSelf: 'center'
			},
			headerRight: (
				<Button
					title='Setting'
					backgroundColor='rgba(0,0,0,0)'
					color='rgba(0, 122, 255, 1)'
					onPress={() => navigation.navigate('setting')}
				/>
			)
		};
   }

   onButtonPress = ({ data }) => {
        this.props.navigation.navigate('web', { data });
   }

   OpenClose(data) {
    try {
        const open = data.opening_hours.open_now;
        if (open === true) {
            return (
             <Text>Open</Text>
            );
        } else {
            return (
             <Text>Close</Text>
            );  
        }
    } catch (error) {
        return (
        <Text>No Info</Text>
     );
    }
}

imageSource(data, i) {
 try {
     const params = qs.stringify({
         ...IMAGE_QUERY_PARAMS,
         photoreference: data.photos[0].photo_reference,
     }); 
     const uri = IMAGE + params;
     console.log(i, uri);
     return {
         uri
     };
 } catch (error) {
     return {
         uri: NO_IMAGE
     };
 }
}

renderMaps() {
   // console.log(this.props.jobs);
   return this.props.likedPlaces.map((data, index) => {
      return (
         <Card key={index} title={data.name}>
             <Text>{data.name}</Text>
             <View>
                 {this.OpenClose(data)}
                 <Text>{data.rating}</Text>
             </View>

             <Image
                 style={{ width: 300, height: 300 }}
                 source={this.imageSource(data, index)}
             />

             <Text>{data.vicinity}</Text>
             <Text>{data.types[0]}</Text>
             <Text>{data.types[1]}</Text>
             <Text>{data.types[2]}</Text>
             <Text>{data.types[3]}</Text>

            <Button
               buttonStyle={styles.buttonStyle}
               title='View on Map'
               backgroundColor='rgba(0, 122, 255, 1)'
               onPress={
                   this.onButtonPress.bind(this, { data })}
            />
         </Card>
      );
   });
}

render() {
   return (
      <ScrollView>
         {this.renderMaps()}
      </ScrollView>
   );
}
}

const styles = {
   detailContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
      marginTop: 10
   },
   textStyle: {
      fontWeight: 'bold'
   },
   buttonStyle: {
      marginTop: 10
   }
};

const mapStateToProps = (state) => {
   return {
      likedPlaces: state.likedPlaces
   };
};

export default connect(mapStateToProps, actions)(savedPlacesScreen);
