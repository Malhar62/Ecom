import * as React from "react"
import { Button, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { flatten } from "ramda"
import { DrawerItem } from '@react-navigation/drawer';

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface MyDrawerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  navigation: any
  onLogout: () => void
}

/**
 * Describe your component here
 */
export const MyDrawer = observer(function MyDrawer(props: MyDrawerProps) {
  const { style, navigation, onLogout } = props
  const styles = flatten([CONTAINER, style])
  let array = [
    { name: ['home'], paper: 'Home' },
    { name: ['category'], paper: 'Category' },
    { name: ['productlist'], paper: 'Products' },
    { name: ['addressstack', 'address', 'addaddress'], paper: 'Address' },
    { name: ['account'], paper: 'Account' },
  ];
  const state = navigation.dangerouslyGetState();
  let actualRoute: any = state.routes[state.index];
  while (actualRoute.state) {
    actualRoute = actualRoute.state.routes[actualRoute.state.index];
  }
  console.log('---' + actualRoute.name)
  return (
    <View style={{ flex: 1 }}>
      {array.map((item, index) => {
        return (
          <View key={index}>
            <DrawerItem
              label={item.paper}
              labelStyle={{ fontFamily: typography.land }}
              onPress={() => { navigation.navigate(item.name[0]) }}
              activeTintColor='maroon'
              activeBackgroundColor='#f0ceeb'
              inactiveTintColor='grey'
              style={{ marginTop: 20, marginHorizontal: 10 }}
              focused={item.name.includes(actualRoute.name)}
            />
          </View>
        )
      })}
      <View style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }}>
        <Button
          title='LOGOUT'
          color='#f0ceeb'
          onPress={onLogout}
        />
      </View>
    </View>
  )
})
