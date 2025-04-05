import React from 'react'
import {View,Text, Alert,StyleSheet} from 'react-native'
import { Button, Dialog, Portal, RadioButton, TextInput } from 'react-native-paper'
import { updateOrderCancel } from '../../Services/Order'


export default function HomeBottomSheet({ item , navigation,visible, setVisible, setLoading }) {
  const [message,setMessage] = React.useState('The Order was Late')
  const [message2,setMessage2] = React.useState('')


  const cancelOrder = async() => {
      let reason;
      if (message != 'Other') reason = message;
      else reason = message2
    setLoading(true);
    await updateOrderCancel(item.id,reason).then(res => {
        setLoading(false)
        setVisible(false)
        Alert.alert("Cancelled",`Your Order was Cancelled Successfully\n${item.payment_method=="CASH" ?"" : 'Soon we will refund the amount after verification'}`,[
            {
                text : "OK",
                onPress : () => {
                  navigation.replace("Home");
                } 
            }
        ])
    })
  }
    return(
          <Portal>
                <Dialog visible={visible} onDismiss={() => hideModal()}>
                <Dialog.Title>Select The Reason For Cancelling Order</Dialog.Title>
                <Dialog.Content>
                    <RadioButton.Group onValueChange={newValue => setMessage(newValue)} value={message}>
                        <View style={{flexDirection : "row",alignItems : 'center'}} >
                            <RadioButton value={'The Order was Late'} />
                            <Text>{'The Order was Late'}</Text>
                        </View>
                        <View style={{flexDirection : "row",alignItems : 'center'}} >
                            <RadioButton value={'Delivery Boy did not deliver on Time'} />
                            <Text>{'Delivery Boy did not deliver on Time'}</Text>
                        </View>
                        <View style={{flexDirection : "row",alignItems : 'center'}} >
                            <RadioButton value={'Urgent Reasons'} />
                            <Text>{'Urgent Reasons'}</Text>
                        </View>
                        <View style={{flexDirection : "row",alignItems : 'center'}} >
                            <RadioButton value={'Other'} />
                            <Text>{'Other'}</Text>
                        </View>
                        <View>
                        {message == 'Other' &&
                              <TextInput 
                                value={message2}
                                onChangeText={text => setMessage2(text)}
                                multiline
                                label="Reason"
                              />
                        }
                        </View>
                    </RadioButton.Group>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => cancelOrder()}>Submit</Button>
                </Dialog.Actions>
                </Dialog>
            </Portal>
    )
}

const styles = StyleSheet.create({
  container : {

  }
})