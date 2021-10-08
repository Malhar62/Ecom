import React, { StrictMode } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Text, FlatList, Image, TouchableOpacity, Dimensions, TextStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import { HEIGHT, WIDTH } from "../../theme/scale"

const ROOT: ViewStyle = {
  backgroundColor: '#fff',
  flex: 1,
  flexDirection: 'row'
}
const txt: TextStyle = {
  fontSize: 18,
  fontFamily: typography.ray
}
export const BrandScreen = observer(function BrandScreen() {
  // Pull in one of our MST stores
  const { shopStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  //recently-viewed-label.png
  const keyGenerator = () => '_' + Math.random().toString(36).substr(2, 9)

  return (
    <View style={ROOT}>
      <View style={{}}>
        <Image
          resizeMode='cover'
          source={require('../../../assets/images/recently-viewed-label.png')}
          style={{ width: 100, height: Dimensions.get('screen').height }}
        />
      </View>
      <View>
        <FlatList
          data={shopStore.viewed.toJSON().reverse()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => navigation.navigate('productdetail', { item })}>
              <View style={{ borderBottomColor: '#f1f1f1', borderBottomWidth: 1, flexDirection: 'row' }}>
                <View>
                  {(isNaN(item.img)) ?
                    <Image resizeMode='contain' source={{ uri: item.img }} style={{ width: WIDTH(100), height: HEIGHT(200), alignSelf: 'center' }} />
                    :
                    <Image resizeMode='contain'
                      source={item.img}
                      style={{ width: 100, height: 200, alignSelf: 'center', transform: [{ rotate: '-30deg' }] }} />
                  }
                </View>
                <View style={{ width: '50%', marginLeft: 10, justifyContent: 'space-between', alignSelf: 'center' }}>
                  <Text style={txt}>{item.name}</Text>
                  <Text style={[txt, { color: '#fff', backgroundColor: item.bgColor }]}>₹ {item.price[0] == '$' ? item.price.substring(1) : item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={keyGenerator}
        />
      </View>
    </View>
  )
})
