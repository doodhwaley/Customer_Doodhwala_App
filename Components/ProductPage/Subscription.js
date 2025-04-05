import React from 'react'
import {View,FlatList,Image,Text,ActivityIndicator,Dimensions,StyleSheet, Touchable, Alert} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {getSubscriptions} from '../../Services/Product'
import DateTimePicker from '@react-native-community/datetimepicker';
import {Formik} from 'formik'
import * as yup from 'yup';
import { EvilIcons } from '@expo/vector-icons';
import { Dialog, Portal, RadioButton,Button } from 'react-native-paper';
import moment from 'moment'
import {Picker} from '@react-native-picker/picker';
import { Config } from '../../Constants';
import CustomDate from '../AuthStack/CustomDate';
import CustomDropDown from '../AuthStack/CustomDropDown';




const {width,height} = Dimensions.get("window")

class Categories extends React.Component {
    state = {
        loading : true,
        showStart : false,
        showEnd : false,
        time_slot : null,
        visible : false,
        startTime : new Date(),
        endTime : new Date(),
        payment_method : "CASH"
    }
    async componentDidMount() {
        await getSubscriptions().then(response => this.setState({subscriptions : response, loading : false}))
    }

    handleSubscription = (values) => {
        values.quantity = this.props.state.quantity,
        values.item = this.props.state.detail,
        values.time_slot = this.state.time_slot
        if (this.state.startTime > this.state.endTime) {
            Alert.alert("Incorrect","End Time can't be less than start Time")
            return;
        }

        if (moment(this.state.startTime).format("YYYY-MM-DD") <= moment().format("YYYY-MM-DD")) {
            Alert.alert("Incorrect Date","The start Date should not be today or past date")
            return;
        }

        if (values.time_slot == null) {
            Alert.alert("Required","Please select a time slot")
            return;
        }
        values.startTime = this.state.startTime
        values.endTime = this.state.endTime
        values.payment_method = this.state.payment_method || "CASH"
        values.subscriptionType2 = this.state.subscriptions.filter(item => item.id === values.subscription && item.name)[0]
        this.props.navigation.navigate("Subscription Detail",{order : values})
    }
    showModal = () => this.setState({visible : true});
    hideModal = () => this.setState({visible : false});
    render() {
        if (this.state.loading) {
            return(
                <View>
                    <ActivityIndicator size="large" color="green" style={{justifyContent:"center",alignItems:"center"}}/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Subscribe {this.props.state.detail.name} @ Rs.{this.props.state.detail.price}</Text>
                <Formik
                    initialValues={{ 
                        timing: new Date(),
                        subscription : 1, 
                        }}
                        onSubmit={values => this.handleSubscription(values)}
                        validationSchema={yup.object().shape({
                            subscription : yup
                            .number()
                            .positive()
                            .required()
                        })}
                >
                    {({ values, handleChange, errors, setFieldTouched, touched,setFieldValue, isValid, handleSubmit }) => (
                    <View style={styles.formContainer}>
                    <View style={{
                        backgroundColor : 'white',
                        padding : 8,
                        marginVertical : 8,
                        borderRadius : 4
                    }} >

                    <View style={styles.cell}>
                        <View>
                            <Text style={{fontFamily : Config.font,color : Config.secondColor}}>Start Time:</Text>
                            <CustomDate 
                                onPress={() => this.setState({showStart : true})}
                                value={this.state.startTime}
                                show={this.state.showStart}
                                onChange={(e, selectedDate) => this.setState({showStart : false,startTime : selectedDate})}
                            /> 
                        </View>  

                        <View>
                            <Text style={{fontFamily : Config.font,color : Config.secondColor}}>End Time:</Text>
                            <CustomDate 
                                onPress={() => this.setState({showEnd : true})}
                                value={this.state.endTime}
                                show={this.state.showEnd}
                                onChange={(e, selectedDate) => this.setState({showEnd : false,endTime : selectedDate})}
                            />  
                        </View>                
                    </View>

                    <View style={{...styles.date,width:'100%',paddingTop : 10}} >
                        <Text style={{fontSize:14,fontFamily:`${Config.font}`}}>Time Slot: </Text>
                        <View style={{width:'50%'}} >
                            <TouchableOpacity 
                                style={{
                                    backgroundColor : Config.baseColor,
                                    borderRadius : 2,
                                    padding : 4
                                }}
                                onPress={() => this.showModal()} >
                                <Text style={{alignSelf : 'center',color : "white"}} >
                                    {this.state.time_slot == null ? "Select" : this.state.time_slot ==1 ? "Morning 9AM-11AM" : "Evening 03PM-05PM"}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={{...styles.date,width:'100%',paddingTop : 10}} >
                        <Text style={{fontSize:14,fontFamily:`${Config.font}`}}>Payment Method: </Text>
                        <View style={{width:'50%'}} >
                            <CustomDropDown 
                                mode="dialog"
                                data={[{name : "EWALLET",id: "JAZZ"},{name : "CASH",id: "CASH"}]}
                                value={this.state.payment_method}
                                onValueChange={itemVal => this.setState({payment_method : itemVal})}
                                label="Select Your Payment Method"
                            />
                        </View>
                    </View>

                    </View>

                    <View   
                        style={{
                            backgroundColor : 'white',
                            borderRadius : 4,
                            padding: 8
                        }}
                    >
                        <Text style={{fontSize:17,fontFamily:`${Config.font}_bold`,marginBottom:5}}>Select Delivery:</Text>
                            <View
                                style={{
                                flexDirection : 'row',
                                flexWrap:"wrap",
                                
                            }}
                            >
                            {this.state.subscriptions.map((item,index) => {
                                return(
                                    <TouchableOpacity 
                                    key={index}
                                    style={{
                                        backgroundColor: values.subscription === item.id ? `${Config.baseColor}` : "grey",
                                        padding : 8,
                                        borderRadius : width/2,
                                        paddingHorizontal : 20,
                                        margin : 5,
                                        justifyContent : 'center',
                                        // width : width/2
                                    }}
                                    onPress={() => setFieldValue('subscription', item.id)}
                                    >
                                        <Text style={{color:"white",textAlign : 'center'}}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                            </View>

                        {touched.subscription && errors.subscription &&
                        <Text style={{ fontSize: 12, color: "white",textAlign:"center" }}>{errors.subscription}</Text>
                        }                  
                    </View>




                        <View style={{alignItems:"center",marginTop: 10}} >
                            <TouchableOpacity style={{
                                backgroundColor : Config.baseColor,
                                width : width*0.75,
                                padding: 8,
                                justifyContent : 'center',
                                borderRadius : 4
                            }} disabled={!isValid} onPress={handleSubmit} >
                                <Text style={{color: Config.secondaryColor, fontSize : 16,textAlign: "center",fontFamily: `${Config.font}_bold`}} >
                                    SUBSCRIBE
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    )}
                </Formik>
                </View>
                <Portal>
                    <Dialog visible={this.state.visible} onDismiss={() => this.hideModal()}>
                    <Dialog.Title>Select Time Slot</Dialog.Title>
                    <Dialog.Content>
                        <RadioButton.Group onValueChange={newValue => this.setState({time_slot :newValue})} value={this.state.time_slot}>
                            <View style={{flexDirection : "row",alignItems : 'center'}} >
                                <RadioButton value={1} />
                                <Text>Morning 9AM-11AM</Text>
                            </View>
                            <View style={{flexDirection : "row",alignItems : 'center'}} >
                                <RadioButton value={2} />
                                <Text>Evening 03PM-05PM</Text>
                            </View>
                        </RadioButton.Group>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => this.hideModal()}>Done</Button>
                    </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        )
    }
}

export default Categories

const styles = StyleSheet.create({
    container : {
        // backgroundColor:"white",
        borderRadius : 10,
        padding : 8,
        // shadowColor: 'grey',
        // shadowOffset: { width: 2, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 8,
        // elevation: 5,
        paddingHorizontal: 10,
        justifyContent : "space-between"
    },
    date : {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    title : {
        textAlign:"center",
        fontFamily:`${Config.font}_bold`,
        fontSize: 25,
        color : `${Config.baseColor}`
    },
    cell : {flexDirection:"row",justifyContent:"space-around",paddingTop:10},
})
