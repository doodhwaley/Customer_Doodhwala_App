import React from 'react';
import {View,Text, StyleSheet, Alert} from 'react-native'

import {updateSubscriptionTiming} from '../../Services/Subscriptions'

import CustomButton from '../../Components/AuthStack/CustomButton'
import CustomDropDown from '../../Components/AuthStack/CustomDropDown'

import { Config } from '../../Constants';
import { Avatar, Chip } from 'react-native-paper';
import CustomDate from '../../Components/AuthStack/CustomDate';
import Counter from '../../Components/Counter/Counter';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';

class Subscribe extends React.Component {
    constructor() {
        super();
        this.state = {
            detail : {},
            loading : false,
            quantity : 1,
            item : {
                subscription_type_detail : {
                    name : ""
                }
            },
            start_time : new Date(),
            end_time : new Date(),
            time_slot : null,
            showTime : false,
            payment_method : "CASH"
        }
    }
    componentDidMount() {
        let item = this.props.route.params.item
        this.setState({
            item : item,
            quantity :  item.quantity,
            start_time : item.start_time,
            end_time : item.end_time,
            time_slot : item.time_slot,
            payment_method : item.payment_method
        })
    }
    handleSubscribe = () => {
        var obj={};
        obj.id = this.state.item.id
        obj.quantity = this.state.quantity
        obj.price = this.state.quantity*this.props.route.params.item.product_detail.price
        obj.subscription = this.state.subscription
        obj.startTime = this.state.startTime
        obj.endTime = this.state.endTime
        obj.time_slot = this.state.time_slot
        obj.payment_method = this.state.payment_method
        this.setState({loading : true})
        updateSubscriptionTiming(obj.id,obj).then(response => {
            this.setState({loading : false})
            Alert.alert("Success","Updated Successfully")
        }).catch(e => {
            this.setState({loading : false})
            alert(e.message)
        })
    }
    
    render() {
        let item = this.props.route.params.item
        if (this.state.loading) return <Loader visible={this.state.loading} />
            
        return(
            <SafeAreaView style={styles.container}> 
                <Header 
                    navigation={this.props.navigation} 
                    title="Subscription"
                    backButton={true}
                    goBack={() => this.props.navigation.goBack()}  
                />

                <View style={styles.header}>
                    <Text style={styles.title}>{item.product_detail.name}</Text>
                    <Avatar.Image source={{uri : item.product_detail.image}} />
                </View>

                <View style={styles.description}>
                    <Text style={styles.headline}>Subscription Detail</Text>

                    <View style={{paddingTop : 20}} >
                        <CustomDropDown 
                            data={[{name:'Morning 9AM-11AM', id:1},{name:'Evening 03PM-05PM', id:2}]}
                            label="Select your Time Slot"
                            value={this.state.time_slot}
                            onValueChange={itemValue => this.setState({time_slot: itemValue})}
                            mode='dialog'
                        />

                        <View style={styles.cell}>
                            <View>
                                <Text style={{fontFamily : Config.font,color : Config.secondColor}}>Start Time:</Text>
                                <CustomDate 
                                    onPress={() => this.setState({showStart : true})}
                                    value={this.state.start_time}
                                    show={this.state.showStart}
                                    onChange={(e, selectedDate) => this.setState({showStart : false,start_time : selectedDate})}
                                /> 
                            </View>  

                            <View>
                                <Text style={{fontFamily : Config.font,color : Config.secondColor}}>End Time:</Text>
                                <CustomDate 
                                    onPress={() => this.setState({showEnd : true})}
                                    value={this.state.end_time}
                                    show={this.state.showEnd}
                                    onChange={(e, selectedDate) => this.setState({showEnd : false,end_time : selectedDate})}
                                />  
                            </View>                
                        </View>

                        <View style={styles.cell}>
                            <Text style={{fontFamily : `${Config.font}_bold`,color : Config.secondColor}}>Type:</Text>
                            <Text style={{fontFamily : Config.font,color : 'grey'}}>{this.state.item.subscription_type_detail.name  || null}</Text>
                        </View>


                        <View style={{flexDirection:"row",paddingTop:5,justifyContent:"space-evenly",alignItems : "center"}}>
                            <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>Payment Method:</Text>
                            <Chip 
                                icon="cash"
                                textStyle= {{
                                    color : "green"
                                }}
                                mode="outlined"
                                onPress={() => this.setState({payment_method : this.state.payment_method == "CASH" ? "JAZZ" : "CASH"})}
                            >{this.state.payment_method}</Chip>
                        </View>
                        
                        <Counter 
                            quantity={this.state.quantity}
                            selected={item.product_detail}
                            setQuantity={item => this.setState({quantity : item})}
                        />
                    </View>
                </View>
                    
                <CustomButton 
                    onPress={() => this.handleSubscribe()}
                    title="Update"
                />
                    
            </SafeAreaView>
        )
    }
}
export default Subscribe;

const styles= StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"white"
    },
    description : {
        backgroundColor:"white",
        padding : 8,
        paddingVertical : 30
    },

    title :{
        textAlign:"center",
        zIndex:10,
        color:Config.secondaryColor,
        fontFamily:`${Config.font}_bold`,
        fontSize: 20,
        alignSelf:"center"

    },
    header : {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding : 30,
        backgroundColor : Config.secondColor
    },
    cell : {flexDirection:"row",justifyContent:"space-around",paddingTop:10},
    headline : {
        fontFamily:`${Config.font}_bold`,
        color : Config.baseColor,
        fontSize : 20,
        alignSelf : "center"
    }

})