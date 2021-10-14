import * as React from "react"
import { Button, StyleProp, TextStyle, View, ViewStyle, Text, Animated, TouchableOpacity, Dimensions, Easing } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { flatten } from "ramda"
import { DrawerItem } from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign'

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 20,
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
  const length = React.useRef(new Animated.Value(0)).current;
  const turner = React.useRef(new Animated.Value(0)).current;

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

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(
        turner,
        {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: false
        }
      )
    ).start();

  })
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(length, {
          toValue: 1,
          duration: 1000,
          easing: Easing.bounce,
          useNativeDriver: false
        }),
        Animated.timing(length, {
          toValue: 0,
          duration: 1000,
          easing: Easing.bounce,
          useNativeDriver: false
        }),
      ])
    ).start();
  });

  const spin = turner.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  function COMMON({ num, name }) {
    return (
      <View style={{ marginHorizontal: 5 }}>
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateX: length.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-num, num],
                  }),
                },
              ],
            },
          ]}>
          <TouchableOpacity onPress={onLogout}>
            <Text style={TEXT}>{name}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
  function IconCom() {
    return (
      <Animated.View
        // style={[
        //   {
        //     transform: [
        //       {
        //         translateY: length.interpolate({
        //           inputRange: [0, 1],
        //           outputRange: [0, -30],
        //         }),
        //       },
        //     ],
        //   },
        // ]}
        style={{
          transform: [{ rotate: spin }]
        }}
      >
        <AntDesign name='logout' size={20} onPress={onLogout} />
      </Animated.View>
    )
  }
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
      {/* <Animated.View style={{ position: 'absolute', bottom: 50, right: 10, flexDirection: 'row' }}>
        <COMMON num={15} name="L " />
        <IconCom />
        <COMMON num={15} name=" G " />
        <IconCom />
        <COMMON num={15} name=" U T" />
      </Animated.View> */}
      {/* <View style={{ position: 'absolute', bottom: 30, right: 10, flexDirection: 'row' }}>
        <AntDesign name='logout' size={20} onPress={onLogout} />
        <COMMON num={10} name=" LOGOUT " />
        <AntDesign name='logout' size={20} onPress={onLogout} style={{
          transform: [
            {
              rotate: '180deg'
            }
          ], marginBottom: 10
        }} />
      </View> */}
      <Animated.View style={{ position: 'absolute', bottom: 20, right: 10, flexDirection: 'row' }}>
        <Text style={TEXT}>L </Text>
        <IconCom />
        <Text style={TEXT}> G </Text>
        <IconCom />
        <Text style={TEXT}> U T </Text>
      </Animated.View>
    </View>
  )
})
