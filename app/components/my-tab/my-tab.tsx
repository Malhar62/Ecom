import * as React from "react"
import { Dimensions, StyleProp, TextStyle, View, ViewStyle, Image, TouchableOpacity, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { ACCOUNT, BAG, BRAND, CATEGORY, HOME } from "../../constants/iconlist"
import { HEIGHT } from "../../theme/scale"



export interface MyTabProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onNavi?: (arg: any) => void
}

/**
 * Describe your component here
 */
export const MyTab = observer(function MyTab(props: MyTabProps) {
  const { onNavi } = props;
  let array = [
    { name: 'Home', url: HOME },
    { name: 'Category', url: CATEGORY },
    { name: 'Brand', url: BRAND },
    { name: 'Account', url: ACCOUNT },
    { name: 'My Bag', url: BAG }
  ]
  const tabWidth = Dimensions.get('screen').width / 5;
  return (
    <View style={{ width: '100%', height: HEIGHT(60), flexDirection: 'row' }}>
      {array.map((item, index) => {
        return (
          <View key={index} style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => onNavi(item.name.toLowerCase())}>
              <Image source={item.url} style={{ height: 30, width: 30, alignSelf: 'center' }} />
              <Text style={{ fontFamily: typography.moon, color: 'grey' }}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )
      })}
    </View>
  )
})
