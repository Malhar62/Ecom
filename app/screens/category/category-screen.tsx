import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Text, ScrollView, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import { homeStyles } from "../home/homeStyles"
import { category_data } from "./data"
import Feather from 'react-native-vector-icons/Feather'
import { Header } from "../../components"

const ROOT: ViewStyle = {
  backgroundColor: '#fff',
  flex: 1,
}

export const CategoryScreen = observer(function CategoryScreen() {
  // Pull in one of our MST stores

  // Pull in navigation via hook
  const navigation = useNavigation()
  function renderCategoryList(item: { id?: number; name: any; bgColor?: string; cmp?: string }, index: number) {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('pressed on category');
          navigation.navigate('productlist');
        }}>
        <View
          style={{
            height: 20,
            flexDirection: 'row',
            margin: 20
          }}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text
              style={{
                color: '#212121',
                height: 40,
                fontSize: 18,
                fontFamily: typography.moon
              }}>
              {item.name}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Feather name='arrow-right' size={25} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={ROOT}>
      <Header
        headerText={'Category'}
        titleStyle={{ position: 'absolute', left: 20, fontSize: 20, color: 'black' }}
        leftIcon={'back'}
        onLeftPress={() => navigation.goBack()}
        style={{ borderBottomColor: '#f1f1f1', borderBottomWidth: 1 }}
      />
      <FlatList
        data={category_data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => renderCategoryList(item, index)}
      />
    </View>
  )
})

