import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextInput, Text, FlatList, TouchableOpacity, Dimensions, Button } from "react-native"
import { Header, Screen } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RadioButton } from 'react-native-paper';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const Main: ViewStyle = { marginHorizontal: 10, paddingHorizontal: 10, paddingVertical: 10, borderWidth: 1, marginTop: 10, borderColor: 'grey' }
export const AddressScreen = observer(function AddressScreen() {
  // Pull in one of our MST stores
  const { addressStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  function Bottom() {
    return (
      <View elevation={5} style={{ position: 'absolute', bottom: 10, right: 10 }}>
        <Ionicons
          name='add-circle'
          size={60}
          color='#4d67bd'
          onPress={() => {
            navigation.navigate('addaddress')
          }}
        />
      </View>
    )
  }
  console.log(addressStore.defaultAddress)
  function Insider({ item, index }) {
    return (
      <TouchableOpacity
        style={{}}
        onPress={() => addressStore.removeAddress(index)}>
        <RadioButton
          value="first"
          status={item == addressStore.defaultAddress ? 'checked' : 'unchecked'}
          onPress={() => addressStore.makeDefault(item)}
        />
        <View style={Main}>
          <Text>{item.firstname} {item.lastname}</Text>
          <Text>{item.address}</Text>
          <Text>{item.city},{item.state}</Text>
          <Text>PIN-{item.pin}</Text>
          <View style={{ position: 'absolute', bottom: 1, right: 10, flexDirection: 'row', justifyContent: 'space-between', width: 60 }}>
            <AntDesign name='edit' size={25} onPress={() => navigation.navigate('addaddress', { data: item, point: index })} />
            <AntDesign name='delete' size={20} onPress={() => addressStore.removeAddress(index)} />
          </View>
        </View>

      </TouchableOpacity>
    )
  }
  return (
    <Screen style={ROOT} preset="fixed">
      <Header
        leftIcon='back'
        headerText='Address'
        onLeftPress={() => navigation.goBack()}
        titleStyle={{ position: 'absolute', left: 10, color: 'black' }}
        style={{ borderBottomWidth: 1, borderBottomColor: 'grey' }}
      />

      {/* <Progress.Bar
        progress={0.5}
        width={350}
        height={3}
        style={{ marginTop: 10, alignSelf: 'center' }}
      /> */}
      <View>
        <FlatList
          data={addressStore.addresses.toJSON()}
          renderItem={({ item, index }) => (
            <Insider item={item} index={index} />
          )}
          keyExtractor={index => 'inedx' + Math.random() + index.toString()}
        />
      </View>
      <Bottom />
    </Screen>
  )
})
