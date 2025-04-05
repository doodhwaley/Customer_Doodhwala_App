import React, { Component } from 'react';
import { Dimensions, StyleSheet ,Alert} from 'react-native';
import {View,Text,Button, ActivityIndicator} from 'react-native'
import {socketBoy} from '../../Services/WebSocket'
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import MapTile from '../../Components/Order/MapTile'
import moment from 'moment'
import Header from '../../Components/Header';
import { Config } from '../../Constants';
import { Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import CancelOrder from '../../Components/Sheets/CancelOrder'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyD-S-cuUziy083ZS2a2X_Btnr-msbXJFnw';

class Example extends Component {

  constructor(props) {
    super(props);

    this.state = {
      coordinates: [
        {
          latitude: 37.3317876,
          longitude: -122.0054812,
        },
        {
          latitude: 37.771707,
          longitude: -122.4053769,
        },
      ],
      showMap : false,
      loading : true,
      customer : {}
    };

    this.mapView = null;
  }

  onMapPress = (e) => {
    this.setState({
      coordinates: [
        ...this.state.coordinates,
        e.nativeEvent.coordinate,
      ],
    });
  }

  checkDate = () => {
    let order = moment(this.props.route.params.order.created_at).add(1,'day').format('LL')
    let current = moment().format('LL')
    if (current == order) {
      this.setState({
        showMap : true
      })
    }
  }

  componentDidMount() {  
    this.checkDate()
    let chatsocket = socketBoy(this.props.route.params.order.delivery_boy)
    this.setState({
      location : {
        latitude : this.props.route.params.order.delivery_boy_detail.zone_latitude,
        longitude : this.props.route.params.order.delivery_boy_detail.zone_longitude,
      },
      customer : this.props.route.params.order.customer_detail.user,
      loading : false
    })
    chatsocket.onmessage = function(e) {
        this.setState({
            location : JSON.parse(e.data).location,
            customer : this.props.route.params.order.customer_detail.user,
            loading : false,
        })
      }.bind(this)
    chatsocket.onclose = function(e) {
      console.error('Chat socket closed unexpectedly',e.message);
    };
  }

  render() {

    if (this.state.loading) {
        return <ActivityIndicator size="large" color="red" style={{flex:1,justifyContent:"center",alignItems:"center"}} />
    }

    return (
    <SafeAreaView style={styles.container}>
      <Header 
        navigation={this.props.navigation} 
        title="Order Detail"
        backButton={true}
        goBack={() => this.props.navigation.goBack()}  
      />
      <View style={{paddingHorizontal : 20,paddingVertical : 5}} >
        <View style={{flexDirection:"row",justifyContent:"space-around",alignItems : "center"}}>
            <Text style={{fontSize:18,fontFamily:`${Config.font}_bold`,color:`${Config.baseColor}`}}>ORDER ID:</Text>
            <Text style={{fontSize:18,fontFamily:`${Config.font}_medium`,color:"grey"}}>{this.props.route.params.order.id}</Text>
        </View>
      </View>
      <Chip
        style={{
          alignSelf : "center",
          backgroundColor : "white",
          marginVertical : 10
        }} 
        mode="outlined"
        textStyle={{
          color : Config.secondColor
        }}
      >{this.props.route.params.order.status}</Chip>
{this.state.showMap &&
      <View style={{paddingHorizontal : 20,paddingVertical : 10}}>
        <View style={styles.parent}>
            <Text style={styles.left}>Distance Left:</Text>
            <Text style={styles.right}>{this.state.distance} kms</Text>
        </View>

        <View style={styles.parent}>
            <Text style={styles.left}>Time Left:</Text>
            <Text style={styles.right}>{this.state.duration && Math.round(this.state.duration)} mins</Text>
        </View>
      </View>}


        {true && ( 
        <MapView
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            style={{
              height : height*0.30
            }}
            ref={c => this.mapView = c}
            onPress={this.onMapPress}
          >
            <MapView.Marker coordinate={this.state.location} >
                <MaterialIcons name="delivery-dining" size={24} color="black" />
                <MapView.Callout tooltip>
                    <View style={styles.InfoCard}>
                        <Text style={{textAlign:"center",fontSize: 18,marginBottom:5,fontWeight: "900"}}>Delivery Boy</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Name:</Text>
                            <Text>{this.props.route.params.order.delivery_boy_detail.user.username}</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Phone:</Text>
                            <Text>{this.props.route.params.order.delivery_boy_detail.user.phone}</Text>
                        </View>
                    </View>
                </MapView.Callout>
            </MapView.Marker>

            <MapView.Marker coordinate={{
                     latitude : this.state.customer.latitude,
                     longitude : this.state.customer.longitude
            }} >
                <Ionicons name="person" size={24} color="black" />
                <MapView.Callout tooltip>
                    <View style={styles.InfoCard}>
                        <Text style={{textAlign:"center",fontSize: 18,marginBottom:5,fontWeight: "900"}}>Customer</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Name:</Text>
                            <Text>{this.state.customer.username}</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Phone:</Text>
                            <Text>{this.state.customer.phone}</Text>
                        </View>
                    </View>
                </MapView.Callout>
            </MapView.Marker>

          <MapViewDirections
          lineDashPattern={[1]}
          origin = {this.state.location}
          destination={
                     {
                     latitude : this.state.customer.latitude,
                     longitude : this.state.customer.longitude
                     }
                 }
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            onStart={(params) => {
              // console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
                this.setState({distance : result.distance,duration : result.duration})

              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: (width / 20),
                  bottom: (height / 20),
                  left: (width / 20),
                  top: (height / 20),
                }
              });
            }}
            onError={(errorMessage) => {
            }}
          />
      </MapView>) }

      <View style={styles.overlay}>
        <MapTile item={this.props.route.params.order} 
            duration={this.state.distance} 
            distance={this.state.duration}
            navigation={this.props.navigation}
            orderTrack={this.state.showMap}
        />
      </View>


      </SafeAreaView>
    );
  }
}

export default Example;

const styles = StyleSheet.create({
    InfoCard : {
        width: Dimensions.get('window').width*0.5,
        backgroundColor : "white",
        padding : 10
      },
    container: {
        flex: 1,
        backgroundColor : Config.secondaryColor
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        // position: 'absolute',
        bottom: 0,
        width:width,
      },
    left : {fontFamily:`${Config.font}_bold`,color:Config.secondColor},
    right : {fontFamily:`${Config.font}_medium`,color:"grey"},
    parent : {flexDirection:"row",paddingTop:5,justifyContent:"space-between"}
})

