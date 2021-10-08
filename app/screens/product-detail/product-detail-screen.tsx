import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Text, ScrollView, Image, TouchableOpacity, Dimensions, TextStyle, StyleSheet } from "react-native"
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import { Header } from "../../components"
import { SliderBox } from "react-native-image-slider-box";
import { HEIGHT } from "../../theme/scale"

const ROOT: ViewStyle = {
  backgroundColor: '#fff',
  flex: 1,
}
const TEXT: TextStyle = {
  fontSize: 18,
  fontFamily: typography.sigma
}
export const ProductDetailScreen = observer(function ProductDetailScreen() {
  // Pull in one of our MST stores
  const { shopStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const route = useRoute<any>()
  const obj: any = route.params.item;
  const images = [
    obj.img,
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?girl",
    "https://source.unsplash.com/1024x768/?tree",
  ]
  const [ind, setInd] = React.useState(null)
  const [first, setFirst] = React.useState(0)
  const isFocused = useIsFocused()
  React.useEffect(() => {
    if (isFocused) {
      setFirst(0)
      shopStore.addToViewed(obj)
    }
  }, [isFocused])
  function Sizes() {
    return (
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        {obj.sizes.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => setInd(index)}>
              <View elevation={1} style={[styles.sizeview, { backgroundColor: ind == index ? obj.bgColor : '#fff' }]}>
                <Text>{item}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
  console.log(obj)
  function BOTTOM() {
    return (
      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0 }}>
        <View style={[styles.bottom, { backgroundColor: '#fff' }]}>
          <TouchableOpacity>
            <Text style={TEXT}>ADD TO BAG</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.bottom, { backgroundColor: '#eb2896' }]}>
          <TouchableOpacity>
            <Text style={[TEXT, { color: '#fff' }]}>BUY NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  return (
    <View style={ROOT}>
      <Header
        titleStyle={{ position: 'absolute', left: 20, fontSize: 20, color: 'black' }}
        leftIcon={'back'}
        style={{ borderBottomColor: '#f1f1f1', borderBottomWidth: 1 }}
        headerText={'Product'}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView style={{ paddingHorizontal: 10, height: 400 }}>
        <View style={{}}>
          <SliderBox
            key={1}
            images={images}
            firstItem={first}
            sliderBoxHeight={300}
            sliderBoxWidth={Dimensions.get('screen').width}
            resizeMethod={'resize'}
            resizeMode={'contain'}
            onCurrentImagePressed={(index: any) =>
              //console.warn(`image ${index} pressed`)
              navigation.navigate('imagedetail', { data: images, id: index })
            }
            parentWidth={Dimensions.get('screen').width}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ alignSelf: 'center' }}
          />
        </View>
        <View style={styles.main}>
          <Text numberOfLines={6} style={[TEXT, { width: '65%' }]}>{obj.name}</Text>
          <View style={{ position: 'absolute', right: 10 }}>
            <Text style={TEXT}>₹ {obj.price}</Text>
          </View>
        </View>
        <View style={styles.main}>
          <Text numberOfLines={3} style={[TEXT, { width: '60%' }]}>{'Type '}</Text>
          <View style={{ position: 'absolute', right: 10 }}>
            <Text style={TEXT}>{obj.type}</Text>
          </View>
        </View>
        <View style={{ borderBottomWidth: 2, borderBottomColor: '#f1f1f1', paddingVertical: 7 }}>
          <Text style={TEXT}> Select Size</Text>
          <Sizes />
        </View>
      </ScrollView>
      <BOTTOM />
    </View>
  )
})
const styles = StyleSheet.create({
  main: { flexDirection: 'row', width: '100%', marginTop: 10, borderBottomWidth: 2, borderBottomColor: '#f1f1f1', paddingVertical: 5 },
  sizeview: { width: 30, height: 30, borderWidth: 1, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  bottom: { width: '50%', height: HEIGHT(60), justifyContent: 'center', alignItems: 'center' }
})