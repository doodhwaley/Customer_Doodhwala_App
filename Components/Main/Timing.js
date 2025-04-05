import React from 'react'
import { Surface } from 'react-native-paper'
import { StyleSheet, Text } from 'react-native'
import { Config, TimingNote } from '../../Constants'

function Timing() {
    return (
        <Surface style={styles.container} >
            <Text style={styles.message} >
                {TimingNote}
            </Text>
        </Surface>
    )
}

export default Timing


const styles = StyleSheet.create({
    message : {
        fontFamily : `${Config.font}`,
        textAlign : "center",
        lineHeight : 25,
        color : "white"
    },
    container : {
        alignItems : "center",
        justifyContent : "center",
        paddingVertical : 15,
        paddingHorizontal : 30,
        backgroundColor : Config.secondColor
    }
})