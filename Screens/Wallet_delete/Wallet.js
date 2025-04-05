import React, { useEffect } from 'react'
import {View, StyleSheet,Image, Dimensions,Text,ScrollView, Touchable, Alert} from 'react-native'
import Header from '../../Components/Header'
import {SafeAreaView} from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons';
import { Config } from '../../Constants'
import { Fontisto } from '@expo/vector-icons';
import MoneyBank from '../../SVGs/money-bank'
import { Button, TextInput, Dialog, Paragraph, Portal, Provider, Snackbar, Avatar, TouchableRipple } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker';
import { requestAddition } from '../../Services/Wallet'
import { getUserData } from '../../Services/User'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { walletState } from '../../State/WalletState'
import { customerState } from '../../State/Customer'


const {width,height} = Dimensions.get("window")

  

export default function Wallet(props) {
    const [amount,setAmount] = React.useState(0)
    const [balance,setBalance] = React.useState(0)

    const [visible, setVisible] = React.useState(false);
    const [fun, setFun] = React.useState(null);
    const [msg, setMsg] = React.useState(null);
    const [transaction, setTransaction] = React.useState(null);
    const [image, setImage] = React.useState(null);
    const bottomHeight = useBottomTabBarHeight()

    const showDialog = (msg,func=false) => {
        setMsg(msg)
        setFun(func)
        setVisible(true)
    }
    let [wallet,setWallet] = walletState.use()
    const hideDialog = () => setVisible(false);

    const loginFun =async ()=> {
        await AsyncStorage.clear();
        props.navigation.replace("AuthStack",{screen : "Login"})
    }
    let user = customerState.useValue()  
    useEffect(() => {
        (async () => {
            try {
                await getUserData();
                setBalance(user.balance && user.balance);
            }
            catch(e) {
                if(e.status ==401) {
                    if (e.status == 401) {
                        Alert.alert("Timeout","You need to Login Again!",[
                            {
                                text : "Login",
                                onPress : () => loginFun()
                            }
                        ])
                    }

                }
                else {
                    Alert.alert('Login Please!','You need to Login To Check Wallet',[
                        { text: "Login", onPress: () => loginFun() }
                    ])
                    
                }

            }
        })()
        // payment()
       // pay()
    }, []);

    const [sVisible, setsVisible] = React.useState(false);
    const [msg2, setMsg2] = React.useState(false);

    const onToggleSnackBar = () => setsVisible(!sVisible);
  
    const onDismissSnackBar = () => setsVisible(false);
    const submitRequest = () => {
        let data={}
        if (parseInt(amount) <=0 ) {
            setMsg2("Please enter a valid Amount")
            onToggleSnackBar();
            return;
        }
        if (image == null ) {
            setMsg2("Please select an Image to Continue")
            onToggleSnackBar();
            return;
        }
        if (transaction.length <3) {
            setMsg2("Please enter a Valid Transaction ID")
            onToggleSnackBar();
            return;
        }
        data.image = image;
        data.transaction_id = transaction;
        data.amount = amount;
        hideDialog()
        requestAddition(data).then(res => {
            setMsg2("Request Sent!")
            onToggleSnackBar();
        })
    }

    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
      
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
      
        if (pickerResult.cancelled === true) {
          return;
        }
        setImage(pickerResult)
    }

        return (
            <SafeAreaView style={styles.container}>
                <Provider>
                <ScrollView style={{paddingBottom : bottomHeight}} >
                <Header title="My Wallet" navigation={props.navigation} goBack={props.navigation.goBack} />
                <View style={styles.iconHolder}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => props.navigation.navigate("RechargeHistory")} >
                        <FontAwesome5 name="money-check-alt" size={35} color={Config.baseColor} />
                        <Text style={{fontFamily : `${Config.font}_bold`,paddingTop:10}} >Recharge History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} >
                        <Fontisto name="history" size={35} color={Config.baseColor} />
                        <Text style={{fontFamily : `${Config.font}_bold`,paddingTop:10}} >Billing History</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.base} >
                    <View style={styles.child} >
                        <MoneyBank width={80} height={80} />
                        <View style={{paddingLeft:10}}>
                            <Text style={{fontFamily : `${Config.font}_bold`,fontSize: 24}}>Rs.{wallet.balance}</Text>
                            <Text style={{fontFamily : `${Config.font}_bold`,color: "grey"}}>WALLET BALANCE</Text>
                        </View>
                    </View>
                </View>

                <View>
                    <TextInput
                        label="Enter Amount"
                        value={(amount)}
                        onChangeText={text => setAmount(text)}
                        mode="outlined"
                        theme={{ colors: { primary: 'grey'}}}   
                        style={{margin:10}}                 
                    />

                    <View style={{flexDirection:"row",marginHorizontal:10,justifyContent : "space-between"}} >
                        <Button  mode="outlined" theme={{ colors: { primary: 'grey'}}} onPress={() => setAmount((parseInt(amount)+500).toString())} >
                            +500
                        </Button>

                        <Button  mode="outlined" theme={{ colors: { primary: 'grey'}}} onPress={() => setAmount((parseInt(amount)+1000).toString())} >
                            +1000
                        </Button>

                        <Button  mode="outlined" theme={{ colors: { primary: 'grey'}}} onPress={() => setAmount((parseInt(amount)+2000).toString())} >
                            +2000
                        </Button>

                        <Button  mode="outlined" theme={{ colors: { primary: 'grey'}}} onPress={() => setAmount((parseInt(amount)+3000).toString())} >
                            +3000
                        </Button>
                    </View>

                    <View style={{justifyContent : "center",alignItems : "center"}} >
                        <TouchableRipple
                            onPress={() => showDialog(`Are You Sure, You want to add Rs.${amount} from Your Jazz Cash Account`)}
                        >
                            <Image 
                                // labelStyle={{color : "white"}}
                                style={styles.jazz}

                                mode="rounded" 
                                theme={{ colors: { primary: Config.baseColor}}}
                                source={require('../../assets/images/jazzcash.png')}
                            />
                        </TouchableRipple>
                        <Text style={{color:"grey",fontSize:24}} >
                            OR
                        </Text>

                        <Button 
                            labelStyle={{color : "black"}}
                            style={styles.button}
                            mode="contained" 
                            onPress={() => {
                                
                                showDialog(`Please Submit Rs.${amount} in our bank account and then we will update Your Balance After Verification.`,1)
                            }}
                            theme={{ colors: { primary: Config.secondaryColor}}}
                        >
                            CASH RECHARGE
                        </Button>
                    </View>
                </View>
                
            <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Confirm</Dialog.Title>
            <Dialog.Content>
                <Paragraph>{msg}</Paragraph>
{ fun &&            (
                <>
                    <TextInput
                            label="Enter Transaction ID"
                            value={(transaction)}
                            onChangeText={text => setTransaction(text)}
                            mode="outlined"
                            theme={{ colors: { primary: 'grey'}}}   
                            style={{margin:10}}                 
                    />
                    <View>
                        <Button 
                            onPress={pickImage} 
                            style={styles.button}
                            labelStyle={{color:"white"}}
                            mode="contained" 
                            theme={{ colors: { primary: Config.baseColor}}}
                        >
                            {image !==null ? "Image Selected" :"Select Image"}
                        </Button>
                    </View>
                </> ) 
}            
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={hideDialog}>Cancel</Button>
                {!fun ? (
                <Button 
                onPress={() => props.navigation.navigate("JazzView",{amount})}
                >Done</Button>
                ) 
                    : 
                    (<Button onPress={submitRequest}>Done</Button>)
                }
                
            </Dialog.Actions>
            </Dialog>
        </Portal>
        </ScrollView>
        </Provider>

        <Snackbar
            visible={sVisible}
            onDismiss={onDismissSnackBar}
        >
        {msg2}
      </Snackbar>
            </SafeAreaView>
        );

}


const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    base : {
        backgroundColor : "#bdbebf",
        padding : 30,
        borderRadius : 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        
        elevation: 13,
        margin:10
    },
    child : {
        backgroundColor : "#d4d5d6",
        padding : 15,
        borderRadius : 5,
        flexDirection : "row",
        alignItems : "center"
    },
    iconHolder : {
        flexDirection:'row',
        justifyContent : "space-around",
        alignItems : 'center',
        paddingVertical : 30
    },
    iconButton : {
        justifyContent : "space-around",
        alignItems : "center"
    },
    button : {
        width : width*0.6,
        marginVertical : 20,
        alignSelf : "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        
        elevation: 13,

    },
    jazz : {
        width : width*0.3,
        height : 100,
        alignSelf : "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        
        elevation: 13,
        resizeMode : "contain"
    }
})
