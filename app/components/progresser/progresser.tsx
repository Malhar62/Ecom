import * as React from "react"
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { flatten } from "ramda"
import * as Progress from 'react-native-progress'
import { WIDTH } from "../../theme/scale"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface ProgresserProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  range: number
  done: any
}

/**
 * Describe your component here
 */
const circle: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  width: 20,
  height: 20,
  borderRadius: 10,
}
export const Progresser = observer(function Progresser(props: ProgresserProps) {
  const { style, range, done } = props
  const styles = flatten([CONTAINER, style])

  return (
    <View style={{ height: 40, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }}>
      <Progress.Bar
        progress={range}
        width={320}
        height={3}
        color='blue'
        style={{ marginTop: 10, alignSelf: 'center' }}
      />
      <View style={{ width: '85%', justifyContent: 'space-between', position: 'absolute', flexDirection: 'row', top: 3, alignSelf: 'center' }}>
        <View>
          <View style={[circle, { backgroundColor: done > 1 ? 'green' : 'blue' }]}>
            <Text>{done > 1 ? '✓' : '1'}</Text>
          </View>
        </View>
        <View style={[circle, { backgroundColor: done > 2 ? 'green' : 'blue' }]}>
          <Text>{done > 2 ? '✓' : '2'}</Text>
        </View>
        <View style={[circle, { backgroundColor: done > 3 ? 'green' : 'blue' }]} >
          <Text>{done > 3 ? '✓' : '3'}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, width: WIDTH(370) }}>
        <Text style={{ color: 'black' }}>Bag</Text>
        <Text style={{ color: 'black' }}>Address</Text>
        <Text style={{ color: 'black' }}>Payment</Text>
      </View>
    </View >
  )
})
