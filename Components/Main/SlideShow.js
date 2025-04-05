import React from 'react'
import {View,FlatList,Image,Text,ActivityIndicator,Dimensions,StyleSheet} from 'react-native'

const {width,height} = Dimensions.get("window")

class SlideShow extends React.Component {
    constructor() {
        super()
        this.state = {
            sliderIndex: 0,
            maxSlider: 0,
        }
    }
    setRef = (c) => {
        this.listRef = c;
      }
     
    scrollToIndex = (index, animated) => {
        this.listRef && this.listRef.scrollToIndex({ index, animated })
    }
    
    componentDidMount() {
        this.setState({maxSlider : this.props.data.length})
        setInterval(function() {
            let sliderIndex = this.state.sliderIndex
            let maxSlider = this.props.data.length-1
            let nextIndex = 0
        
            if (sliderIndex < maxSlider) {
            nextIndex = sliderIndex + 1
            }
        
            this.scrollToIndex(nextIndex, true)
            this.setState({sliderIndex: nextIndex})
        }.bind(this), 2500)
    }    
    render() {

        return (
                <FlatList
                data={this.props.data}
                // style={{ marginVerti: 10 }}
                renderItem={({ item , index }) => {
                    return(
                        <View key={index} style={styles.container}>
                            <Image style={styles.image} source={{uri : item.image}}/>
                            {/* <Text style={{textAlign:"center",fontSize:16,paddingVertical:10,fontFamily:`${Config.font}_medium`}}>{item.name}</Text> */}
                        </View>
                    )
                }}
                ref={this.setRef}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    let sliderIndex = event.nativeEvent.contentOffset.x ? event.nativeEvent.contentOffset.x/width : 0
                    this.setState({sliderIndex})
                }}
              />
        )
    }
}

export default SlideShow

const styles = StyleSheet.create({
    image : {
        width : width,
        height : 160,
        resizeMode : "cover",
        // borderRadius: 2,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
    },
    container : {
        borderRadius: 2,
        backgroundColor : "white",
        // marginHorizontal: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        marginBottom:0,
    }
})
