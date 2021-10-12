import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Text, ScrollView, TouchableOpacity, Dimensions, TextStyle, StyleSheet, Alert } from "react-native"
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"
import { typography } from "../../theme"
import { Header } from "../../components"
import { SliderBox } from "react-native-image-slider-box";
import { HEIGHT } from "../../theme/scale"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
  const [first, setFirst] = React.useState(0)
  const [selected, setSelected] = React.useState<number>(0)
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
        {obj.sizes.map((item: {}, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => setSelected(item)}>
              <View elevation={1} style={[styles.sizeview, { backgroundColor: selected == item ? obj.bgColor : '#fff' }]}>
                <Text>{item}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
  console.log(obj)
  function addDays(theDate: Date, days: number) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }

  var newDate = addDays(new Date(), 5);

  function AddIt() {
    shopStore.addToBag(obj, selected, newDate)
    setSelected(0)
    Alert.alert(
      'Added to Bag',
      `${obj.name}...size-${selected}`,
    )
  }

  function onBag() {
    if (selected == 0) {
      Alert.alert('Select a size')
    } else {
      AddIt()
      // var count = 0;
      // shopStore.bags.forEach(item => {
      //   if (item.name == obj.name && item.size == selected) {
      //     count++;
      //   }
      // })
      // if (count == 0 && shopStore.bags.length == 0) {
      //   AddIt()
      // } else {
      //   if (shopStore.bags.length == 1 && count == 0) {
      //     var ind = shopStore.bags.findIndex(z => (z.name == obj.name && z.price == obj.price))
      //     if (ind != -1) {
      //       Alert.alert(
      //         'Its there in ur Bag!',
      //         `But with size-${shopStore.bags[ind].size},still want to add?`,
      //         [
      //           {
      //             text: "Cancel",
      //             onPress: () => console.log("Cancel Pressed"),
      //             style: "cancel"
      //           },
      //           {
      //             text: 'Update size',
      //             onPress: () => { shopStore.updateBag(obj, selected) }
      //           },
      //           {
      //             text: 'Add',
      //             onPress: () => { AddIt() }
      //           }
      //         ]
      //       )
      //     } else {
      //       AddIt()
      //     }
      //   } else {
      //     var sum = 0;
      //     shopStore.bags.forEach(item => {
      //       if (item.name == obj.name && item.price == obj.price && item.size == selected) {
      //         sum++;
      //       }
      //     })
      //     if (sum >= 1) {
      //       Alert.alert(
      //         `Its there in ur Bag!`,
      //         `with same size,still want to add?`,
      //         [
      //           {
      //             text: "Cancel",
      //             onPress: () => console.log("Cancel Pressed"),
      //             style: "cancel"
      //           },
      //           {
      //             text: 'Add',
      //             onPress: () => { AddIt() }
      //           }
      //         ]
      //       )
      //     } else {
      //       if (sum == 0) {
      //         Alert.alert(
      //           'Its there in ur Bag!',
      //           `with different size,still want to add?`,
      //           [
      //             {
      //               text: "Cancel",
      //               onPress: () => console.log("Cancel Pressed"),
      //               style: "cancel"
      //             },
      //             {
      //               text: 'Add',
      //               onPress: () => { AddIt() }
      //             },
      //             {
      //               text: 'Check Bag',
      //               onPress: () => { navigation.navigate('bag') }
      //             }
      //           ]
      //         )
      //       } else {

      //       }
      //     }

      //   }
      // }
    }
  }
  function BOTTOM() {
    return (
      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0 }}>
        <View style={[styles.bottom, { backgroundColor: '#fff' }]}>
          <TouchableOpacity onPress={onBag}>
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
  function onLike() {
    var isThere = shopStore.favs.findIndex(x => (x.name == obj.name && x.price == obj.price))
    if (isThere == -1) {
      shopStore.addToFav(obj)
    } else {
      shopStore.removeFromFav(isThere)
    }
  }
  function getIcon(text: string) {
    var isThere = shopStore.favs.findIndex(x => (x.name == obj.name && x.price == obj.price))
    if (isThere == -1) {
      return text == 'name' ? 'thumbs-o-up' : 'black'
    } else {
      return text == 'color' ? 'blue' : 'thumbs-up'
    }
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
            <Text style={TEXT}>₹ {obj.price[0] == '$' ? obj.price.substr(1) : obj.price}</Text>
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
      <View
        elevation={10}
        style={{
          position: 'absolute', right: 10, top: HEIGHT(70),
        }}>
        <FontAwesome
          name={getIcon('name')}
          color={getIcon('color')}
          size={30}
          onPress={onLike}
        />
      </View>
    </View>
  )
})
const styles = StyleSheet.create({
  main: { flexDirection: 'row', width: '100%', marginTop: 10, borderBottomWidth: 2, borderBottomColor: '#f1f1f1', paddingVertical: 5 },
  sizeview: { width: 30, height: 30, borderWidth: 1, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  bottom: { width: '50%', height: HEIGHT(60), justifyContent: 'center', alignItems: 'center' }
})