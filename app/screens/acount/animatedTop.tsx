import React from "react"
import { View, Animated } from "react-native"
import { images } from '../../constants/images'
import { typography } from "../../theme"
import { HEIGHT, WIDTH } from "../../theme/scale"

export default function AnimeTop({ name, max, min, scroll, length }) {
    const imgH = HEIGHT(70);
    const imgW = WIDTH(70);
    const bord = (imgH + imgW) / 4
    return (
        <Animated.View style={{
            position: 'absolute', top: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center',
            height: length.interpolate({
                inputRange: [0, scroll],
                outputRange: [max, min],
                extrapolate: 'clamp',
            }), backgroundColor: length.interpolate({
                inputRange: [0, scroll],
                outputRange: ['#9fc0f5', '#5e7bab'],
                extrapolate: 'clamp',
            })
        }}>
            <Animated.Image
                source={{ uri: images.PROFILE }}
                style={{
                    width: imgW, height: imgH, borderRadius: bord, overflow: 'hidden',
                    transform: [
                        {
                            translateX: length.interpolate({
                                inputRange: [HEIGHT(200), (scroll)],
                                outputRange: [0, WIDTH(-100)],
                                extrapolate: 'clamp',
                            })
                        },
                        {
                            translateY: length.interpolate({
                                inputRange: [HEIGHT(20), (scroll)],
                                outputRange: [0, HEIGHT(10)],
                                extrapolate: 'clamp',
                            })
                        },
                    ]
                }}
            />
            <Animated.Text
                style={{
                    fontSize: 20, fontFamily: typography.code,
                    transform: [
                        {
                            translateY: length.interpolate({
                                inputRange: [HEIGHT(200), scroll],
                                outputRange: [0, HEIGHT(-40)],
                                extrapolate: 'clamp',
                            })
                        }
                    ]
                }}
            >
                {name}
            </Animated.Text>

        </Animated.View>
    )
}