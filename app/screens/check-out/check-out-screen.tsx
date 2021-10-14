import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, Image, TouchableOpacity, View, Button, TextStyle } from "react-native"
import { Header, Progresser, Screen } from "../../components"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const TEXT: TextStyle = {
  fontSize: 18,
  fontFamily: typography.ray
}
export const CheckOutScreen = observer(function CheckOutScreen() {
  // Pull in one of our MST stores
  const { addressStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  React.useEffect(() => {
    if (isFocused) {
      setMark(0.5)
      setNum(2)
    }
  }, [isFocused])
  const [mark, setMark] = useState(0.1)
  const [num, setNum] = useState(0)
  function Copy({ txt }) {
    return (
      <Text style={TEXT}>{txt}</Text>
    )
  }
  var value = addressStore.defaultAddress.pin
  console.log(value)
  return (
    <Screen style={ROOT} preset="fixed">
      <Header
        leftIcon={'back'}
        headerText="Address Details"
        onLeftPress={() => navigation.goBack()}
        titleStyle={{ color: 'black', position: 'absolute', left: 10 }}
        style={{ backgroundColor: '#f1f1f1', borderBottomWidth: 1 }}
      />
      <Progresser
        range={mark}
        done={num}
      />
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        {(addressStore.defaultAddress.address != undefined)
          &&
          <View style={{ width: '90%' }}>
            <Text style={{ fontFamily: typography.code, fontSize: 20 }}>Your Address Detail :</Text>
          </View>}
        {(addressStore.defaultAddress.address == undefined)
          ?
          <Text style={{ color: 'grey', fontSize: 20, fontFamily: typography.code }}>Select address for delivery</Text>
          :
          <View style={{
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            backgroundColor: '#f1f1f1',
            paddingHorizontal: 10,
            paddingVertical: 10
          }}>

            <Copy
              txt={`${addressStore.defaultAddress.firstname} ${addressStore.defaultAddress.lastname}`}
            />
            <Copy
              txt={addressStore.defaultAddress.address}
            />
            <Copy
              txt={addressStore.defaultAddress.state}
            />
            <Copy
              txt={addressStore.defaultAddress.city}
            />
            <Copy
              txt={addressStore.defaultAddress.landmark}
            />
            <Copy
              txt={addressStore.defaultAddress.pin}
            />
            <Copy
              txt={addressStore.defaultAddress.phone}
            />
          </View>}

        <View style={{ width: '90%', marginTop: 20 }}>
          <Button
            title={addressStore.defaultAddress.address == undefined ? 'add address' : 'change address'}
            color='#487f94'
            onPress={() => {
              if (addressStore.defaultAddress.address == undefined) {
                navigation.navigate('addressstack', {
                  screen: 'address',
                })
              } else {
                navigation.navigate('addressstack', {
                  screen: 'address',
                  params: { userID: 1 }
                })
              }
            }}
          />
        </View>
        {(addressStore.defaultAddress.address != undefined)
          && <View style={{ width: '90%', marginTop: 20 }}>
            <Button
              title='proceed to pay'
              color='#e0d128'
              onPress={() => {
                navigation.navigate('payment')
              }}
            />
          </View>
        }
      </View>
    </Screen>
  )
})
