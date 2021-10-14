import * as React from "react"
import { Animated, StyleProp, TextStyle, View, ViewStyle, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { flatten } from "ramda"
import { useStores } from "../../models"
const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 15,
  color: color.primary,
}

export interface MessageShowerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const MessageShower = observer(function MessageShower(props: MessageShowerProps) {
  const { style } = props
  const styles = flatten([CONTAINER, style])
  const length = React.useRef(new Animated.Value(0)).current
  const { addressStore } = useStores()
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    if (count != 0) {
      Anime()
    }
    setCount(count + 1)
  }, [addressStore.defaultAddress])


  function Anime() {
    Animated.timing(length, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false
    }).start()
    setTimeout(() => {
      Animated.timing(length, {
        toValue: 0,
        duration: 700,
        useNativeDriver: false
      }).start()
    }, 1500)
  }

  return (
    <Animated.View elevation={5} style={{
      position: 'absolute', bottom: 100, backgroundColor: '#f1f1f1', alignSelf: 'center', borderRadius: 5,
      opacity: length.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp'
      })
    }}>
      <Text style={{ paddingHorizontal: 5, paddingVertical: 5, ...TEXT }}>{'changed'}</Text>
    </Animated.View>
  )
})
