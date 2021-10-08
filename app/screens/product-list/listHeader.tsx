import React, { useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Text, TouchableOpacity, FlatList, Image, Dimensions, TextStyle, ImageBackground, Animated } from "react-native"
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function ListHeader({ length, onBack, SCROLL, HEADER_LOW, HEADER_HEIGHT }) {

    return (
        <Animated.View
            style={{
                height: length.interpolate({
                    inputRange: [0, SCROLL],
                    outputRange: [HEADER_HEIGHT, HEADER_LOW],
                    extrapolate: 'clamp'
                }),
                justifyContent: 'center',
                position: 'absolute', top: 0, left: 0, right: 0,
                backgroundColor: '#f1f1f1',
                paddingLeft: 10
            }}
        >
            <View>
                <FontAwesome name='arrow-left' size={20} color='grey' onPress={onBack} />
            </View>
            <Animated.Text style={{
                position: 'absolute', left: 40, opacity: length.interpolate({
                    inputRange: [0, SCROLL],
                    outputRange: [1, 0],
                    extrapolate: 'clamp'

                })
            }}>ProductList</Animated.Text>
        </Animated.View>
    )
}