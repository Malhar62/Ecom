/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React, { useState, useEffect } from "react"
import { BagScreen, AcountScreen, BrandScreen, CategoryScreen, HomeScreen, AddressScreen, ProductDetailScreen, SearchScreen } from "../screens"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation, CommonActions, NavigationAction } from '@react-navigation/native';
import { AppState } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { ProductListScreen } from "../screens/product-list/product-list-screen";
import { ImageDetailScreen } from "../screens/image-detail/image-detail-screen";
import { MyTab } from "../components";

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  welcome: undefined
  demo: undefined
  demoList: undefined
  home: undefined
  category: undefined
  search: undefined
  address: undefined
  bag: undefined
  brand: undefined
  account: undefined
  main: undefined
  drawers: undefined
  next: undefined
  cart: undefined
  productlist: undefined
  tab: undefined
  productdetail: undefined
  second: undefined
  extra: undefined
  imagedetail: undefined
  tabs: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<PrimaryParamList>()
const Tab = createBottomTabNavigator<PrimaryParamList>()
const Drawer = createDrawerNavigator<PrimaryParamList>()

export function MainNavigator() {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'tab',
          },
        ],
      })
    )
  }, [])
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="main" component={MainStack} />
    </Stack.Navigator>
  )
}
function MainStack({ route }) {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#fff',
      }}
      drawerContentOptions={{
        activeTintColor: 'maroon',
        activeBackgroundColor: '#f0ceeb',
        inactiveTintColor: 'grey',
      }}
      initialRouteName={'tab'}
    //drawerContent={(props) => <CustomDrawer {...props} />}>
    >
      <Drawer.Screen name='drawers' component={DrawerStack} options={{ title: 'Home' }} />
    </ Drawer.Navigator>
  )
}
function DrawerStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='tab' component={TabStack} options={{ title: 'Home' }} />
      <Stack.Screen name='productlist' component={ProductListScreen} options={{ title: 'Products' }} />
      <Stack.Screen name='category' component={CategoryScreen} options={{ title: 'Categories' }} />
      <Stack.Screen name='address' component={AddressScreen} options={{ title: 'Address' }} />
      <Stack.Screen name='account' component={AcountScreen} options={{ title: 'Account' }} />
    </Stack.Navigator>
  )
}
function TabStack() {
  const navigation = useNavigation()
  const state = navigation.dangerouslyGetState();
  let actualRoute: any = state.routes[state.index];
  while (actualRoute.state) {
    actualRoute = actualRoute.state.routes[actualRoute.state.index];
  }

  function checker(props) {
    var path = actualRoute.name;
    if (path != 'home' && path != 'tab' && path != 'drawers') {
      return null;
    } else {
      return <MyTab {...props}
        onNavi={(data) => navigation.navigate(data)}
      />
    }

  }
  //npx react-codemod rename-unsafe-lifecycles
  return (
    <Tab.Navigator
      tabBar={(props) => checker(props)}
    // tabBarOptions={{
    //   activeTintColor: '#0a0a0a',
    //   activeBackgroundColor: '#58afdb',
    //   labelStyle: {
    //     fontSize: 15,
    //   },
    //   keyboardHidesTabBar: true,
    //   style: {
    //     backgroundColor: '#f7f7f7',
    //     height: 60,
    //     //borderTopWidth: 1,
    //     //borderTopColor: 'red'
    //   },
    // }}
    >
      <Tab.Screen name='extra' component={Extra} />

    </Tab.Navigator>
  )
}
function Extra() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='tabs' component={Tabs} />
    </Stack.Navigator>
  )
}

// options={{
//   tabBarVisible: false,
//   tabBarLabel: 'Categories',
//   tabBarIcon: ({ focused }) => (
//     <Image source={CATEGORY} style={{ width: 30, height: 30, opacity: focused ? 1 : 0.5 }} />
//   )
// }}
function Tabs() {
  return (
    <Stack.Navigator
      initialRouteName={'home'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='home' component={HomeScreen} />
      <Stack.Screen name='productdetail' component={ProductDetailScreen} />
      <Stack.Screen name='category' component={CategoryScreen} />
      <Stack.Screen name='productlist' component={ProductListScreen} />
      <Stack.Screen name='brand' component={BrandScreen} />
      <Stack.Screen name='account' component={AcountScreen} />
      <Stack.Screen name='bag' component={BagScreen} />
      <Stack.Screen name='search' component={SearchScreen} />
      <Stack.Screen name='imagedetail' component={ImageDetailScreen} />
    </Stack.Navigator>
  )
}
//import { createNativeStackNavigator } from "react-native-screens/native-stack"

// function SecondStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name='home' component={HomeScreen} />
//       <Stack.Screen name='productdetail' component={ProductDetailScreen} />
//       <Stack.Screen name='imagedetail' component={ImageDetailScreen} />
//     </Stack.Navigator>
//   )
// }
/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["home"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
