import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Text, ScrollView, Image, TouchableOpacity, FlatList, StyleSheet, Alert, Animated } from "react-native"
import { Header, Progresser, Screen } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import { homeStyles } from "../home/homeStyles"
import { HEIGHT, WIDTH } from "../../theme/scale"
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BagBottom from "./bagbottom"
import * as Progress from 'react-native-progress'

const ROOT: ViewStyle = {
  backgroundColor: '#fff',
  flex: 1,
}

export const BagScreen = observer(function BagScreen() {
  // Pull in one of our MST stores
  const { shopStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const onClick = async (item: any) => {
    navigation.navigate('productdetail', { item })
  }
  const keyGenerator = () => '_' + Math.random().toString(36).substr(2, 9)

  function Adder({ item, index }) {
    return (
      <View style={styles.view}>
        <Entypo
          name='minus'
          //name={item.quantity == 1 ? 'remove-user' : 'minus'}
          size={20}
          onPress={() => shopStore.removeQuantity(index)} />
        <Text style={styles.txt}>{item.quantity}</Text>
        <Entypo
          name='plus'
          size={20}
          onPress={() => shopStore.addQuantity(index)} />
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

  function Insider({ item, index }) {
    return (
      <View style={styles.in}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ width: '60%' }}>
            <Text numberOfLines={3} style={styles.txt}>{item.name}</Text>
            <Text style={styles.txt}>₹ {item.price[0] == '$' ? item.price.substr(1) : item.price}</Text>
            <Text>Delivery on {item.delivery.toString().substr(0, 15)}</Text>
            {(item.offer) && countPrice(item.offer, item.price)}
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => {
              var id = shopStore.favs.findIndex(x => (x.name == item.name && item.price == x.price))
              if (id == -1) {
                shopStore.addToFav(item)
              } else {
                Alert.alert('Already Saved!')
              }
            }}
          >
            <Text style={[styles.txt, { color: givecolor(item.name) }]}>{'#'} SAVE</Text>
            <MaterialIcons
              name='delete'
              size={25}
              color='#474b52'
              style={{ marginLeft: 10 }}
              onPress={() => shopStore.removeFromBag(index)}
            />
          </TouchableOpacity>
          <View>
            <Adder item={item} index={index} />
          </View>
        </View>
      </View>
    )
  }
  function givecolor(item: any) {
    var id = shopStore.favs.findIndex(x => (x.name == item))
    if (id == -1) {
      return 'grey'
    } else {
      return 'green'
    }
  }
  const length = React.useRef(new Animated.Value(0)).current;
  const MAX = HEIGHT(80);
  const MIN = HEIGHT(1);
  const SCROLL = MAX - MIN;
  return (
    <Screen style={ROOT} preset="fixed">
      <Header
        headerText="My Bag"
        titleStyle={{ color: 'black' }}
        style={{ backgroundColor: '#f1f1f1', borderBottomWidth: 1 }}
      />
      {(shopStore.bags.length != 0)
        ?
        (
          <Progresser
            range={0.1}
            done={0}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Your Bag is Empty</Text>
          </View>
        )
      }
      <View style={{ marginTop: 0, marginHorizontal: 10 }}>
        <FlatList
          data={shopStore.bags.toJSON()}
          contentContainerStyle={{ paddingBottom: 200 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: length } } }],
            { useNativeDriver: false }
          )}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Insider item={item} index={index} />
          )}
          keyExtractor={keyGenerator}
        />
      </View>
      {(shopStore.bags.length != 0)
        &&
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, marginHorizontal: 10 }}>
          <BagBottom
            amount={shopStore.amount}
            afterdiscount={shopStore.discountedamount}
            length={length}
            max={MAX}
            min={MIN}
            scroll={SCROLL}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('checkout')}
            style={styles.check}>
            <Text>CHECKOUT</Text>
          </TouchableOpacity>
        </View>}
    </Screen>
  )
})
const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    width: WIDTH(100),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 3,
    backgroundColor: '#f1f1f1',
    height: HEIGHT(30)
  },
  txt: {
    fontSize: 18, fontFamily: typography.ray
  },
  main: { flexDirection: 'row', borderBottomColor: '#f1f1f1', borderBottomWidth: 1, paddingVertical: 5, alignItems: 'center' },
  in: { paddingHorizontal: 10, backgroundColor: '#d7dde0', marginTop: 20, paddingVertical: 10 },
  check: { height: 60, backgroundColor: '#ebc231', justifyContent: 'center', alignItems: 'center' }
})