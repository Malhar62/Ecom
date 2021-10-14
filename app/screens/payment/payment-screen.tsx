import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, View, ViewStyle, Text, Button, TouchableOpacity, StyleSheet } from "react-native"
import { Header, Progresser, Screen } from "../../components"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import { COD, ONLINE, PAYTM } from "../../constants/iconlist"
import { FlatList } from "react-native-gesture-handler"
import { RadioButton } from "react-native-paper"
import { HEIGHT, WIDTH } from "../../theme/scale"
import BagBottom from "../bag/bagbottom"
import RBSheet from "react-native-raw-bottom-sheet"
import { homeStyles } from "../home/homeStyles"
import { paymentStyles } from "./paymentstyles"

const ROOT: ViewStyle = {
  backgroundColor: '#f1f1f1',
  flex: 1,
}

export const PaymentScreen = observer(function PaymentScreen() {
  // Pull in one of our MST stores
  const { shopStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  React.useEffect(() => {
    if (isFocused) {
      setMark(0.99)
      setNum(3)
    }
  }, [isFocused])
  const [mark, setMark] = useState(0.1)
  const [num, setNum] = useState(0)
  const refRBSheet: any = React.useRef();

  const datalist = [
    { name: 'Cash On Delivery', icon: COD, extra: '' },
    { name: 'Online Payment', icon: ONLINE, extra: 'Debit Card, Credit Card, Net Banking, UPI' },
    { name: 'Paytm', icon: PAYTM, extra: 'Wallet, Debit Card,Net Banking, UPI' }
  ]
  function Method() {
    return (
      <FlatList
        data={datalist}
        contentContainerStyle={{ marginTop: 20, marginHorizontal: 10, backgroundColor: '#fff' }}
        renderItem={({ item, index }) => (
          <View style={[paymentStyles.top, { borderBottomWidth: index != 2 ? 1 : 0 }]}>
            <View>
              <Image resizeMode='contain' source={item.icon} style={{ width: 30, height: 30 }} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 15, fontFamily: typography.ray }}>{item.name}</Text>
              <Text style={{ fontSize: 13, color: 'grey', fontFamily: typography.ray }}>{item.extra}</Text>
            </View>
            <View style={{ position: 'absolute', right: 0 }}>
              <RadioButton
                value="first"
                color='#5a8ab8'
                status={item ? 'checked' : 'unchecked'}
                onPress={() => {

                }}
              />
            </View>
          </View>
        )}
        ListHeaderComponent={
          <View style={{ height: HEIGHT(40), justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, fontFamily: typography.primary, marginLeft: 10 }}>Select a Payment Method</Text>
          </View>
        }
        keyExtractor={index => 'index' + Math.random() + index.toString()}
      />
    )
  }
  function Bottom() {
    return (
      <View style={paymentStyles.bottom}>
        <View>
          <Text>₹{shopStore.discountedamount}</Text>
          <TouchableOpacity onPress={() => refRBSheet.current.open()} >
            <Text style={{ color: '#ed4cc8', fontSize: 15 }}>VIEW PRICE DETAILS</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: WIDTH(150), height: HEIGHT(50), borderRadius: 7 }}>
          <Button
            title='continue'
            color='#ed4cc8'
            onPress={() => { }}
          />
        </View>
      </View>
    )
  }
  function Price() {
    return (
      <View style={paymentStyles.midle}>
        <Text>Price Details</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text>Product Charges</Text>
          <Text>{shopStore.amount}</Text>
        </View>
        <View style={paymentStyles.discount}>
          <Text>Discount</Text>
          <Text>- ₹{shopStore.amount - shopStore.discountedamount}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Order Total</Text>
          <Text>₹{shopStore.discountedamount}</Text>
        </View>
      </View>
    )
  }
  function Insider({ item, index }) {
    return (
      <View style={{ paddingHorizontal: 10, backgroundColor: '#d7dde0', marginTop: 20, paddingVertical: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ width: WIDTH(250) }}>
            <Text numberOfLines={3} style={styles.txt}>{item.name}</Text>
            <Text style={styles.txt}>₹ {item.price[0] == '$' ? item.price.substr(1) : item.price}</Text>
            <Text>Delivery on {item.delivery.toString().substr(0, 15)}</Text>
            {(item.offer) && countPrice(item.offer, item.price)}
            <Text>Qty:{item.quantity}</Text>
          </View>
          <View>
            {(isNaN(item.img)) ?
              <Image resizeMode='contain' source={{ uri: item.img }} style={homeStyles.bottomimg} />
              :
              <Image resizeMode='contain'
                source={item.img}
                style={homeStyles.bottomimg} />
            }
          </View>
        </View>
        {/** */}
      </View>
    )
  }
  function countPrice(data: string, price: string) {
    let Length = data == undefined ? 0 : data.length
    var str = []
    for (var i = 0; i < Length; i++) {
      if (data[i] != '%') {
        str.push(data[i])
      } else {
        break;
      }
    }
    var ans = str.join('')
    var number = parseInt(ans, 10);
    var pricefinal = parseInt(price, 10)
    var pre = (pricefinal * (100 - number)) / 100;//Number((pricefinal - pre).toFixed(1))
    return (
      <Text>-{Number((pricefinal - pre).toFixed(0))} {'\n'}₹ {Number((pre).toFixed(0))}</Text>
    )
  }
  function OwnComponent() {
    return (
      <View>
        <FlatList
          data={shopStore.bags.toJSON()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Insider item={item} index={index} />
          )}
          keyExtractor={index => 'index' + Math.random() + index.toString()}
        />
      </View>
    )
  }
  return (
    <Screen style={ROOT} preset="fixed">
      <Header
        leftIcon={'back'}
        headerText="Payment Method"
        onLeftPress={() => navigation.goBack()}
        titleStyle={{ color: 'black', position: 'absolute', left: 10 }}
        style={{ backgroundColor: '#f1f1f1', borderBottomWidth: 1 }}
      />
      <Progresser
        range={mark}
        done={num}
      />
      <Method />
      <Price />
      <Bottom />
      <RBSheet
        height={600}
        closeOnPressBack={true}
        ref={refRBSheet}
        closeOnPressMask={true}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center"
          },
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.8)'
          },
        }}
      >
        <OwnComponent />
      </RBSheet>
    </Screen>
  )
})
const styles = StyleSheet.create({
  txt: {
    fontSize: 18, fontFamily: typography.ray
  },

})
