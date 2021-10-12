import React, { useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Text, TouchableOpacity, FlatList, Image, Dimensions, TextStyle, ImageBackground, Animated } from "react-native"
import { useNavigation, useIsFocused, useRoute, StackActions } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import Modal from "react-native-simple-modal";
import ListHeader from "./listHeader"
import { SORT } from "../../constants/iconlist"
import { HEIGHT } from "../../theme/scale"
import RBSheet from "react-native-raw-bottom-sheet";

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const TEXT: TextStyle = {
  fontSize: 15, fontFamily: typography.ray
}
export const ProductListScreen = observer(function ProductListScreen() {
  // Pull in one of our MST stores
  const { shopStore } = useStores()
  // Pull in navigation via hook
  const navigation = useNavigation()
  const route = useRoute<any>()
  const isFocused = useIsFocused()
  const [list, setList] = React.useState([])
  const [state, setState] = React.useState<number>()
  React.useEffect(() => {
    if (isFocused) {
      // helpers.helper1()
      //   .then(data => {
      //     setList(data)
      //   })
      //   .catch(err => console.log(err))
      if (route.params) {
        setList(route.params.data)
      } else {
        setList(shopStore.listB)
      }
    }
  }, [isFocused])
  React.useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window }) => {
        if (window.width > window.height) {
          setState(60)
        } else {
          setState(1)
        }
      }
    );
    return () => subscription?.remove();
  });
  const VIEW: ViewStyle = { justifyContent: 'center', alignSelf: 'flex-start', marginTop: 10, marginLeft: state }

  function Insider({ item, index }) {
    return (
      <View style={{ width: '50%', height: 400, paddingHorizontal: 5, marginTop: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('productdetail', { item })
          }}
        >
          <View>
            <ImageBackground
              source={{ uri: item.img }}
              resizeMode='contain'
              style={{ width: '100%', height: 300 }} >
              {(item.offer) && (
                <View style={VIEW}>
                  <Image
                    resizeMode='contain'
                    source={require('../../../assets/images/discount_tag_p.png')}
                    style={{ width: 60, height: 35 }} />
                  <Text style={{ position: 'absolute', color: '#fff' }}>{item.offer}</Text>
                </View>
              )}
            </ImageBackground>
          </View>
          <View>
            <Text style={[TEXT, { textDecorationLine: 'underline' }]}>{item.brand_name}</Text>
            <Text style={TEXT} numberOfLines={3}>{item.name}</Text>
            <Text style={[TEXT, { color: item.offer != undefined ? 'grey' : 'black' }]}>₹ {item.price}</Text>
            {item.offer != undefined && countPrice(item.offer, item.price)}
          </View>

        </TouchableOpacity>
      </View>
    )
  }
  const keyGenerator = () => '_' + Math.random().toString(36).substr(2, 9)
  const length = useRef(new Animated.Value(0)).current
  const HEADER_HEIGHT = 70;
  const HEADER_LOW = 0;
  const SCROLL = HEADER_HEIGHT - HEADER_LOW
  const refRBSheet: any = useRef();


  function countPrice(data: string, price: string) {
    let phoneNumberLength = data == undefined ? 0 : data.length
    var str = []
    for (var i = 0; i < phoneNumberLength; i++) {
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
        <View style={{ height: 50, backgroundColor: 'transparent' }}>

        </View>
        <View style={{ height: 50 }}>
          <TouchableOpacity onPress={() => {
            let array = [...shopStore.listB]
            let data = array.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            const pushAction = StackActions.push('productlist', { data });
            navigation.dispatch(pushAction);
            refRBSheet.current.close()
          }}>
            <Text>Price Low to High</Text>
          </TouchableOpacity>

        </View>
        <View style={{}}>
          <TouchableOpacity onPress={() => {
            let array = [...shopStore.listB]
            let data = array.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            const pushAction = StackActions.push('productlist', { data });
            navigation.dispatch(pushAction);
            refRBSheet.current.close()
          }}>
            <Text>Price High to Low</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
  return (
    <View style={ROOT}>

      <FlatList
        key={'#'}
        numColumns={2}
        contentContainerStyle={{ marginTop: HEIGHT(120) }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: length } } }],
          { useNativeDriver: false }
        )}
        data={list.slice()}
        renderItem={({ item, index }) => (
          <Insider item={item} index={index} />
        )}
        keyExtractor={keyGenerator}
      />
      <ListHeader
        length={length}
        onBack={() => navigation.goBack()}
        SCROLL={SCROLL}
        HEADER_LOW={HEADER_LOW}
        HEADER_HEIGHT={HEADER_HEIGHT}
      />
      <Animated.View style={{
        height: 50, width: '100%', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f1f1', marginTop: length.interpolate({
          inputRange: [0, SCROLL],
          outputRange: [HEADER_HEIGHT, HEADER_LOW],
          extrapolate: 'clamp'
        }), position: 'absolute', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
      }}>
        <TouchableOpacity onPress={() => refRBSheet.current.open()} style={{ flexDirection: 'row' }}>
          <Image source={SORT} style={{ width: 20, height: 20 }} />
          <Text style={{ marginLeft: 5 }}>SORT</Text>
        </TouchableOpacity>
      </Animated.View>
      {/* <Modal
        open={modalVisible}
        closeOnTouchOutside={true}
        disableOnBackPress={true}
        modalDidClose={() => setModalVisible(false)}
        modalStyle={{
          borderRadius: 2,
          backgroundColor: "#f1f1f1",
          position: 'absolute',
          bottom: 0,
          width: Dimensions.get('screen').width,
          margin: 0
        }}
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          flex: 1
        }}
      >
        <View style={{ height: 50 }}>
          <TouchableOpacity onPress={() => {
            let array = [...shopStore.listB]
            let data = array.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            navigation.push('productlist', { data })
            setModalVisible(false)
          }}>
            <Text>Price Low to High</Text>
          </TouchableOpacity>

        </View>
        <View style={{}}>
          <TouchableOpacity onPress={() => {
            let array = [...shopStore.listB]
            let data = array.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            navigation.push('productlist', { data })
            setModalVisible(false)
          }}>
            <Text>Price High to Low</Text>
          </TouchableOpacity>

        </View>
      </Modal> */}
      <RBSheet
        height={200}
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
    </View>
  )
})
