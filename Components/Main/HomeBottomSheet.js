import React from 'react'
import {View,Text,Image} from 'react-native'

import Subscription from '../ProductPage/Subscription'


import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop} from '@gorhom/bottom-sheet'

import {  TouchableOpacity } from 'react-native-gesture-handler';
import { Config } from '../../Constants';
import { addToCart } from '../../Services/Cart';
import Counter from '../Counter/Counter';

export default function HomeBottomSheet(
    { selected, bottomSheetRef, setSelected, navigation, styles, quantity, setQuantity }
    ) {


  // variables
  const snapPoints = React.useMemo(() => ['0%','50%', '85%'], []);

  // callbacks
  const handleSheetChanges = React.useCallback((index) => {
      if (index == 0) setSelected(null)
  }, []);

  const handleCart = async () => {
      
      var obj={};
      obj.id = selected.id
      obj.quantity = quantity
      obj.price = (selected.price- ((selected.price*selected.discount)/100))*quantity
      obj.name = selected.name

      await addToCart(obj)
      bottomSheetRef.current.close()
  }


    return(
    <BottomSheet   
        backdropComponent={BottomSheetBackdrop}      
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges} 
        style={{
            backgroundColor:"transparent",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,

            elevation: 13,
        }}
    >
        {selected && (
        <View style={styles.container}>
            <BottomSheetScrollView > 
                {selected.action!="subscribe" && 
                <>        
                    <Image source={{uri : selected.image}} style={styles.image}/>
                    <Text style={styles.title}>{selected.name}</Text>
                    <Text style={{alignSelf:'center',fontSize:20,fontFamily : `${Config.font}`,color: Config.secondColor}}>Rs.{selected.price}/{selected.quantity}</Text>
                </>}

                {selected.action!="subscribe" &&
                <View style={styles.description}>
                    <Text style={{fontFamily:`${Config.font}_bold`,fontSize: 20}}>Description</Text>
                    <Text style={{fontFamily : `${Config.font}`,textAlign : 'justify'}} >{selected.description}</Text>
                </View>}

                {(selected.action == "subscribe" || selected.action == "all") && selected.can_subscribe && 
                <Subscription navigation={navigation} state={{
                    detail : selected,
                    quantity
                }}/>}

                {selected.action != "description" &&  

                    <Counter 
                        quantity={quantity}
                        setQuantity={setQuantity}
                        selected={selected}
                    />
                }
                {(selected.action == "buy" || selected.action == "all") && (
                    <View style={{width:'75%',alignSelf : 'center',marginBottom :20}}
                    >
                        <TouchableOpacity
                            onPress={handleCart} 
                            style={{
                                backgroundColor : Config.baseColor,
                                borderRadius : 4,
                                padding : 16,
                                justifyContent : "center"
                            }} 
                        >
                            <Text style={{textAlign:'center',fontFamily:`${Config.font}_medium`,color:'white'}} >ADD TO CART</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </BottomSheetScrollView>
    </View>
    )}
    </BottomSheet>
    )
}

