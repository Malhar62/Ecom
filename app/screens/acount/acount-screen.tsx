import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Text, ScrollView, Image, TouchableOpacity, FlatList, Animated } from "react-native"
import { Screen } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import { homeStyles } from "../home/homeStyles"
import AnimeTop from "./animatedTop"
import { images } from "../../constants/images"
import { HEIGHT } from "../../theme/scale"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const AcountScreen = observer(function AcountScreen() {
  // Pull in one of our MST stores
  const { shopStore, authStore } = useStores()
  const length = React.useRef(new Animated.Value(0)).current;
  const HEADER_MAX = HEIGHT(350);
  const HEADER_MIN = HEIGHT(90);
  const SCROLL = HEADER_MAX - HEADER_MIN;
  // Pull in navigation via hook
  const navigation = useNavigation()
  const onClick = async (item: any) => {
    navigation.navigate('productdetail', { item })
  }
  const keyGenerator = () => '_' + Math.random().toString(36).substr(2, 9)

  function Insider({ item, index }) {
    return (
      <TouchableOpacity key={index} onPress={() => onClick(item)} >
        <View key={index} style={{ flexDirection: 'row', borderBottomColor: '#f1f1f1', borderBottomWidth: 1, paddingVertical: 5 }}>
          <View>
            {(isNaN(item.img)) ?
              <Image resizeMode='contain' source={{ uri: item.img }} style={homeStyles.bottomimg} />
              :
              <Image resizeMode='contain'
                source={item.img}
                style={homeStyles.bottomimg} />
            }
          </View>
          <View style={{ width: '70%', paddingLeft: 20 }}>
            <Text numberOfLines={3} style={{ fontSize: 18, fontFamily: typography.kobani }}>{item.name}</Text>
            <Text style={{ fontSize: 18, fontFamily: typography.kobani }}>₹{item.price}</Text>
            <Text>{item.offer}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  console.log(shopStore.favs.length)
  return (
    <View style={ROOT} >
      {(shopStore.favs.length != 0) ? (
        <FlatList
          key={'#'}
          data={shopStore.favs.toJSON()}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingTop: HEADER_MAX }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: length } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item, index }) => (
            <Insider item={item} index={index} />
          )}
          keyExtractor={keyGenerator}
        />
      ) :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Nothing Saved!</Text>
        </View>}
      <AnimeTop
        scroll={SCROLL}
        length={length}
        max={HEADER_MAX}
        min={HEADER_MIN}
        name={authStore.username}
      />
    </View>
  )
})
