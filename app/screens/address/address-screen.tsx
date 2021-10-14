import React, { } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Text, FlatList, TextStyle, Button, Alert } from "react-native"
import { Header, Screen } from "../../components"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RadioButton } from 'react-native-paper';
import { TouchableOpacity } from "react-native-gesture-handler"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const TEXT: TextStyle = {
  fontSize: 18,
  fontFamily: typography.ray
}
const Main: ViewStyle = { paddingHorizontal: 10, paddingVertical: 10, borderColor: 'grey', width: '80%', backgroundColor: '#cad8e6' }
export const AddressScreen = observer(function AddressScreen() {
  // Pull in one of our MST stores
  const { addressStore } = useStores()
  const route = useRoute<any>()
  // Pull in navigation via hook
  const navigation = useNavigation()
  const [value, setValue] = React.useState(addressStore.defaultAddress)

  function Bottom() {
    return (
      <View elevation={5} style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }}>
        {(route.params) && <Button
          title='DONE'
          color='#487f94'
          onPress={() => {
            if (addressStore.defaultAddress == {}) {
              Alert.alert('select address from list!')
            } else {
              navigation.goBack()
            }
          }}
        />}
        <View style={{ position: 'absolute', bottom: route.params ? 50 : 20, right: 10 }}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('addaddress')
          }}>
            <Ionicons
              name='add-circle'
              size={60}
              color='#4d67bd'
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  function Insider({ item, index }) {
    return (
      <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
        <View style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: '#cad8e6',
          justifyContent: 'center', alignItems: 'center',
          borderTopRightRadius: 0, borderBottomRightRadius: 0
        }}>
          <RadioButton
            value="first"
            color='#5a8ab8'
            status={item == value ? 'checked' : 'unchecked'}
            onPress={() => {
              addressStore.makeDefault(item)
              setValue(addressStore.defaultAddress)
            }}
          />
        </View>
        <View style={Main}>
          <Text style={TEXT}>{item.firstname} {item.lastname}</Text>
          <Text style={TEXT}>{item.address}</Text>
          <Text style={TEXT}>{item.city},{item.state}</Text>
          <Text style={TEXT}>PIN-{item.pin}</Text>
          <View style={{ position: 'absolute', bottom: 1, right: 10, flexDirection: 'row', justifyContent: 'space-between', width: 60 }}>
            <AntDesign name='edit' size={25} onPress={() => navigation.navigate('addaddress', { data: item, point: index })} />
            <AntDesign name='delete' size={20} onPress={() => addressStore.removeAddress(index)} />
          </View>
        </View>
      </View>
    )
  }
  return (
    <Screen style={ROOT} preset="fixed">
      <Header
        leftIcon='back'
        headerText={`${route.params ? 'Select' : ''} Address`}
        onLeftPress={() => navigation.goBack()}
        titleStyle={{ position: 'absolute', left: 10, color: 'black' }}
        style={{ borderBottomWidth: 1, borderBottomColor: 'grey' }}
      />
      {
        (addressStore.addresses.length == 0)
          ?
          (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>No Addresses saved in your list</Text>
            </View>
          )
          :
          (
            <View>
              <FlatList
                data={addressStore.addresses.toJSON()}
                renderItem={({ item, index }) => (
                  <Insider item={item} index={index} />
                )}
                keyExtractor={index => 'inedx' + Math.random() + index.toString()}
              />
            </View>
          )
      }
      <Bottom />
    </Screen>
  )
})
