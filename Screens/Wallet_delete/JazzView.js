import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import Loader from '../../Components/Loader';
import { baseURL } from '../../Constants';
import { getUserData } from '../../Services/User';
import { customerState } from '../../State/Customer';

const {width} = Dimensions.get("window")

export default function JazzView(props) {
    let [cust,setCust]= React.useState(null)
    let [loading,setLoading]= React.useState(true)
    let customer = customerState.useValue()
    React.useEffect(() => {
        (async () => {
            customer = customer.id
            setCust(customer)
        })()
    },[])

    React.useEffect(() => {
        setTimeout(() => setLoading(false),3000)
    },[])
    const amount = props.route.params.amount*100 || 100000

    if (loading) return <Loader visible={loading} />
    return(
        <SafeAreaView style={styles.container} >
        <WebView
            onNavigationStateChange={(navState) => {
                if (navState.url == `http://${baseURL}/payment_result/`) {
                    getUserData().then(res => {
                        props.navigation.goBack();
                    })
                }
            }}
            source={{ uri: `${baseURL}/jazz_cash/${amount}/${cust}` }}
            style={{width}}
        />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex :1,
        justifyContent : "center",
        alignItems : "center"
    }
})