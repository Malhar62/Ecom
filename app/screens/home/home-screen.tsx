import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Text, ScrollView, Image, TouchableOpacity } from "react-native"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"
import { typography } from "../../theme"
import { homeStyles } from "./homeStyles"
import { TrendingDummyData } from "./trending"
import { HEIGHT, WIDTH } from "../../theme/scale"
import HomeHeader from "./homeheader"

const ROOT: ViewStyle = {
  backgroundColor: '#fff',
  flex: 1,
}

export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  const { shopStore } = useStores()
  const isFocused = useIsFocused()
  const [list1, setList1] = React.useState([])
  const [list2, setList2] = React.useState([])
  const [load, setLoad] = React.useState(false)
  React.useEffect(() => {
    if (isFocused) {
      shopStore.getOver()
      shopStore.gettingOver()
    }
  }, [isFocused])
  async function Calling() {
    setLoad(true)
    // helpers.helper1()
    //   .then(data => {
    //     setList1(data)
    //   })
    //   .catch(err => console.log(err))
    // helpers.helper2()
    //   .then(data => {
    //     setList2(data)
    //     console.log(data)
    //   })
    //   .catch(err => console.log(err))

    setLoad(false)
  }
  // Pull in navigation via hook
  const navigation = useNavigation()

  const onClick = async (item: any) => {
    navigation.navigate('productdetail', { item })
  }
  //console.log(list2[0])

  return (
    <View style={ROOT}>
      <HomeHeader
        onDrawer={() => navigation.openDrawer()}
        onSearch={() => navigation.navigate('search')}
      />
      {
        (!load) ?
          (
            <ScrollView style={{ paddingHorizontal: 10 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ marginTop: 10 }}
              >
                {TrendingDummyData.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => onClick(item)}>
                      <View key={index} style={{ marginLeft: index == 0 ? 10 : 30, marginRight: 10 }}>
                        <Text style={{ color: 'grey' }}>{item.type}</Text>
                        <View style={{ backgroundColor: item.bgColor, width: WIDTH(180), height: HEIGHT(200), paddingLeft: 7, borderRadius: 10, borderTopRightRadius: 0 }}>
                          <View style={{ position: 'absolute', right: -15 }}
                          >
                            <Image
                              source={item.img}
                              resizeMode='contain'
                              style={{ width: 150, height: 120, transform: [{ rotate: '-20deg' }], }}
                            />
                          </View>
                          <View style={{ position: 'absolute', bottom: 5 }}>
                            <Text numberOfLines={3} style={{ fontSize: 18, color: '#fff', fontFamily: typography.kobani }}>{item.name}</Text>
                            <Text style={{ fontSize: 18, color: '#fff', fontFamily: typography.kobani }}>₹{item.price.substr(1)}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>

              <ScrollView
                contentContainerStyle={{ alignItems: 'center', backgroundColor: '#f1f1f1', marginTop: 20 }}
                style={{ overflow: 'hidden' }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {shopStore.listA.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => onClick(item)}>
                      <View key={index} style={homeStyles.main}>
                        <Image source={{ uri: item.img }} style={homeStyles.img} />
                        <Text numberOfLines={3} style={{ fontSize: 18, fontFamily: typography.kobani }}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
              <View
                elevation={5}
                style={{ width: '100%', backgroundColor: '#fff', marginTop: 10, borderRadius: 20, paddingHorizontal: 10 }}>
                {shopStore.listB.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => onClick(item)} >
                      <View key={index} style={{ flexDirection: 'row', borderBottomColor: '#f1f1f1', borderBottomWidth: 1, paddingVertical: 5 }}>
                        <View>
                          <Image source={{ uri: item.img }} style={homeStyles.bottomimg} />
                        </View>
                        <View style={{ width: '70%', paddingLeft: 20 }}>
                          <Text numberOfLines={3} style={{ fontSize: 18, fontFamily: typography.kobani }}>{item.name}</Text>
                          <Text style={{ fontSize: 18, fontFamily: typography.kobani }}>₹{item.price}</Text>
                          <Text>{item.offer}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </ScrollView>
          ) :
          (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Loading...</Text>
            </View>
          )
      }
    </View>
  )
})
