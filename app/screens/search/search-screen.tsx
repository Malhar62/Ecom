import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextInput, TouchableOpacity, FlatList, Image, Text, TextStyle, Dimensions } from "react-native"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { searchStyles } from "./searchStyles"
import { HEIGHT } from "../../theme/scale"
import { TrendingDummyData } from "../home/trending"
const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const TEXT: TextStyle = {
  color: '#fff',
  fontFamily: typography.code
}
const txt: TextStyle = {
  fontFamily: typography.moon,
  fontSize: 15
}
export const SearchScreen = observer(function SearchScreen() {
  // Pull in one of our MST stores
  const { shopStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [search, setSearch] = React.useState<string>('')
  const [list, setList] = React.useState<any>([])
  const [high, setHigh] = React.useState<number>(250)
  React.useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        if (window.width > window.height) {
          setHigh(HEIGHT(170))//landscape
        } else {
          setHigh(HEIGHT(250))//portrait
        }
      }
    );
    return () => subscription?.remove();
  });
  React.useEffect(() => {
    if (isFocused) {
      setList([])
      setSearch('')
    }
  }, [isFocused])
  function searching(text: string) {
    setSearch(text)
    var array = [];
    var str = text.toLowerCase();
    shopStore.listA.forEach((item) => {
      if (item.name.toLowerCase().includes(str)) {
        array.push(item)
      }
    })
    shopStore.listB.forEach((item) => {
      if (item.name.toLowerCase().includes(str)) {
        array.push(item)
      }
    })
    TrendingDummyData.forEach((item) => {
      if (item.name.toLowerCase().includes(str)) {
        array.push(item)
      }
    })

    //var aux: any = [...new Set(array)];
    const aux = Array.from(new Set(array.map(a => a.name)))
      .map(id => {
        return array.find(a => a.name === id)
      })
    setList(aux)
  }
  const keyGenerator = () => '_' + Math.random().toString(36).substr(2, 9)
  //console.log(isNaN(TrendingDummyData[0].img))


  function Insider({ item, index }) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('productdetail', { item })}>
        <View style={{ width: '100%', height: HEIGHT(80), borderBottomColor: '#f1f1f1', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View>
            {(isNaN(item.img)) ?
              <Image resizeMode='contain' source={{ uri: item.img }} style={{ width: 60, height: 60, borderRadius: 30 }} />
              :
              <Image resizeMode='contain'
                source={item.img}
                style={{ width: 60, height: 60, borderRadius: 30, transform: [{ rotate: '-30deg' }] }} />
            }
          </View>
          <View style={{ width: '80%', marginLeft: 10 }}>
            <Text style={txt}>{item.name}</Text>
            <Text style={[txt, { color: 'grey' }]}>₹ {item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={ROOT}>
      <View style={{ height: high, width: '100%', backgroundColor: '#3892e0' }}>
        <View style={{ position: 'absolute', left: 10, top: 10 }}>
          <AntDesign
            name='back'
            size={25}
            color='#fff'
            style={{}}
            onPress={() => {
              navigation.goBack()
              setList([])
            }} />
        </View>
        <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[TEXT, { fontSize: 20 }]}>Search</Text>
          <Text style={TEXT}>{(list.length != 0 && search != '') ? `${list.length} Results` : ''}</Text>
        </View>
        <View elevation={5} style={searchStyles.txtip}>
          <TextInput
            value={search}
            placeholder=''
            onChangeText={data => searching(data)}
            style={{ width: '90%' }}
          />
          <View style={{ height: '100%', justifyContent: 'center' }}>
            {(search != '') && <Entypo name='cross' size={25} color='red'
              onPress={() => {
                setSearch('')
                setList([])
              }}
            />}
          </View>
        </View>
      </View>
      {(search != '') ?
        (<View style={{ flex: 1 }}>
          <FlatList
            data={list}
            renderItem={({ item, index }) => (
              <Insider item={item} index={index} />
            )}
            keyExtractor={keyGenerator}
          />
        </View>)
        : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'grey' }}>Search Items Above</Text>
        </View>}
    </View>
  )
})

