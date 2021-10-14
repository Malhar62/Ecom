import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, TextStyle, ImageBackground, TextInput, View, Button, Alert } from "react-native"
import { Screen } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager, LoginButton } from "react-native-fbsdk"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  const { authStore } = useStores()
  //5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
  //keytool -exportcert -alias androiddebugkey -keystore android/app/debug.keystore | "C:\OpenSSL\bin\openssl" sha1 -binary | "C:\OpenSSL\bin\openssl" base64
  //pswd: android
  // Pull in navigation via hook
  const navigation = useNavigation()
  const [name, setName] = React.useState('')
  const [pass, setPass] = React.useState('')
  console.log(authStore.isLogin)

  const getInfoFromToken = (token: any) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name,birthday,email,gender',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error: string, user: { name: any; email: any }) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          let user_Info = {
            name: user.name,
            email: user.email,
            dateOfBirth: "",
            url: ""
          }
          console.log('result:', user);
          authStore.onLogin(user.name, '')
          navigation.reset({
            index: 0,
            routes: [{ name: 'main' }]
          });
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };


  function initUser(token) {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,friends&access_token=' + token)
      .then(async (response) => {
        response.json().then(async (json) => {
          const ID = json.id
          console.log("ID " + ID);

          const EM = json.email
          console.log("Email " + EM);

          const FN = json.first_name
          console.log("First Name " + FN);
          authStore.onLogin(json.first_name, '')
          navigation.reset({
            index: 1,
            routes: [{ name: 'main' }]
          })
        })
      })
      .catch(() => {
        console.log('ERROR GETTING DATA FROM FACEBOOK')
      })
  }
  //   function initUser(token: string) {
  //   fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       // Some user object has been set up somewhere, build that user here
  //       // user.name = json.name
  //       // user.id = json.id
  //       // user.user_friends = json.friends
  //       // user.email = json.email
  //       // user.username = json.name
  //       // user.loading = false
  //       // user.loggedIn = true
  //       // user.avatar = setAvatar(json.id)
  //       console.log(json)
  //     })
  //     .catch(() => {
  //       Alert.alert('ERROR GETTING DATA FROM FACEBOOK')
  //     })
  // }
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
          <LoginButton
            publishPermissions={['publish_actions']}
            readPermissions={['public_profile']}
            onLoginFinished={
              (error: any, result: { error: any; isCancelled: any }) => {
                if (error) {
                  console.log('login has error: ', result.error)
                } else if (result.isCancelled) {
                  console.log('login is cancelled.')
                } else {
                  AccessToken.getCurrentAccessToken().then((data: { accessToken: any }) => {
                    const { accessToken } = data
                    initUser(accessToken)
                  })
                }
              }
            }
            onLogoutFinished={() => console.log("logout.")} />
        </View>
      </View>

    </Screen >
  )
})
