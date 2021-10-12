import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, TextStyle, ImageBackground, TextInput, View, Button, Alert } from "react-native"
import { Screen } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  const { authStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [name, setName] = React.useState('')
  const [pass, setPass] = React.useState('')
  console.log(authStore.isLogin)
  return (
    <Screen style={ROOT} preset="fixed">
      <ImageBackground
        resizeMode='cover'
        source={require('../../../assets/images/splashscreen.jpg')}
        style={{ height: '100%', width: '100%', opacity: 0.3 }} >

      </ImageBackground>
      <View style={{ position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 300 }}>
          <TextInput
            value={name}
            onChangeText={data => setName(data)}
            placeholder='Enter name...'
            style={{ borderBottomColor: 'black', borderBottomWidth: 1 }}
          />
          <TextInput
            placeholder='Enter password...'
            value={pass}
            onChangeText={data => setPass(data)}
            style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginVertical: 20 }}
          />
          <Button
            title='LOGIN'
            color='#6f91bd'
            onPress={() => {
              if (name != '' && pass != '') {
                authStore.onLogin(name, pass)
                navigation.reset({
                  index: 1,
                  routes: [{ name: 'main' }]
                })
              } else {
                Alert.alert(
                  'Enter name and password'
                )
              }
            }} />
        </View>
      </View>

    </Screen>
  )
})
