import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextInput, ScrollView, StyleSheet, Button, Keyboard, Platform, KeyboardAvoidingView, Text, Alert } from "react-native"
import { Header, Screen } from "../../components"
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native"
import Modal from "react-native-modal";
import { useStores } from "../../models"
import { color, typography } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const AddAddressScreen = observer(function AddAddressScreen() {
  // Pull in one of our MST stores
  const { addressStore } = useStores()
  // Pull in navigation via hook
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [visible, setVisible] = useState(false)
  const isFocused = useIsFocused()
  const route = useRoute<any>()

  React.useEffect(() => {
    if (isFocused) {
      if (route.params) {
        setState(route.params.data)
      }
    }
  }, [isFocused])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const navigation = useNavigation()
  let obj = {
    pin: '',
    firstname: '',
    lastname: '',
    landmark: '',
    address: '',
    city: '',
    state: '',
    phone: ''
  }
  const [state, setState] = useState(obj)
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  const [once, setOnce] = React.useState(false)
  const [text, setText] = useState('')

  function onDone() {
    navigation.goBack()
    setVisible(false)
  }

  return (
    <Screen style={ROOT} preset="fixed">
      <ScrollView>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
          <Header
            leftIcon='back'
            headerText={`${route.params ? 'Edit' : 'Add'} Address`}
            onLeftPress={() => navigation.goBack()}
            titleStyle={{ position: 'absolute', left: 10, color: 'black' }}
            style={{ borderBottomWidth: 1, borderBottomColor: 'grey' }}
          />
          <View style={{ marginTop: 0 }}>
            <TextInput
              value={state.pin}
              maxLength={6}
              keyboardType={'numeric'}
              placeholder={`Enter PIN code *`}
              onChangeText={data => setState({ ...state, pin: data })}
              style={[styles.txt, { borderColor: ((once) && state.pin == '') ? 'red' : 'black' }]}
            />
            <TextInput
              value={state.firstname}
              placeholder={`First Name*`}
              onChangeText={data => setState({ ...state, firstname: data })}
              style={[styles.txt, { borderColor: ((once) && state.firstname == '') ? 'red' : 'black' }]}
            />
            <TextInput
              value={state.lastname}
              placeholder={`Last Name*`}
              onChangeText={data => setState({ ...state, lastname: data })}
              style={[styles.txt, { borderColor: ((once) && state.lastname == '') ? 'red' : 'black' }]}
            />
            <TextInput
              value={state.address}
              placeholder={`Address*`}
              onChangeText={data => setState({ ...state, address: data })}
              style={[styles.txt, { borderColor: ((once) && state.address == '') ? 'red' : 'black', height: 100 }]}
            />
            <TextInput
              value={state.landmark}
              placeholder={`Landmark*`}
              onChangeText={data => setState({ ...state, landmark: data })}
              style={[styles.txt, { borderColor: ((once) && state.landmark == '') ? 'red' : 'black' }]}
            />
            <TextInput
              value={state.state}
              placeholder={`State*`}
              onChangeText={data => setState({ ...state, state: data })}
              style={[styles.txt, { borderColor: ((once) && state.state == '') ? 'red' : 'black' }]}
            />
            <TextInput
              value={state.city}
              placeholder={`City*`}
              onChangeText={data => setState({ ...state, city: data })}
              style={[styles.txt, { borderColor: ((once) && state.city == '') ? 'red' : 'black' }]}
            />
            <TextInput
              value={state.phone}
              maxLength={10}
              keyboardType={'numeric'}
              placeholder={`your Phone number*`}
              onChangeText={data => setState({ ...state, phone: data })}
              style={[styles.txt, { borderColor: ((once) && state.phone == '') ? 'red' : 'black' }]}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      {(!isKeyboardVisible) &&
        <View style={{
          position: 'absolute',
          bottom: 10, left: 10, right: 10, height: 50
        }}>
          <Button
            title={route.params ? 'edit' : 'SAVE'}
            color='#567391'
            onPress={() => {
              setOnce(true)
              var remaining = []
              for (var address of Object.keys(state)) {
                if (state[address] == '') {
                  remaining.push(address)
                }
              }
              console.log(remaining)
              if (remaining.length == 0) {
                if (route.params) {
                  Alert.alert('Address Edited!',
                    '',
                    [
                      {
                        text: 'ok',
                        onPress: () => onDone()
                      }
                    ])
                  addressStore.editAddress(state, route.params.point)
                } else {
                  Alert.alert('Address Added!',
                    '',
                    [
                      {
                        text: 'ok',
                        onPress: () => onDone()
                      }
                    ])
                  addressStore.addAddress(state)
                }
              } else {
                var str = remaining.join(',')
                console.log(str)
                Alert.alert(`Marked * fields are mandetory`)
              }
            }}
          />
        </View>}
      {/* <Modal
        isVisible={visible}
        onBackdropPress={onDone}
        onModalHide={onDone}
        onBackButtonPress={onDone}
        style={{
          justifyContent: 'center', alignItems: 'center', flex: 1
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.MainAlertView}>
            <Text
              style={{
                marginHorizontal: 20, fontSize: 18, fontFamily: typography.ray
              }}>{text}</Text>
          </View>
        </View>
      </Modal> */}
    </Screen>
  )
})
const styles = StyleSheet.create({
  txt: { borderWidth: 1, width: '90%', marginTop: 10, alignSelf: 'center', height: 50 },
  MainAlertView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff",
    height: 200,
    width: '100%',
    borderColor: '#fff',
  },
})