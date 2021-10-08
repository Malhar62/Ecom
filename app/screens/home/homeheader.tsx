
import React from "react"
import { View, Text } from "react-native"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { typography } from "../../theme"

export default function HomeHeader({ onDrawer, onSearch }) {
    return (
        <View style={{ flexDirection: 'row', height: 70, alignItems: 'center', borderBottomWidth: 2, backgroundColor: '#fff', borderBottomColor: '#f1f1f1' }}>
            <View style={{ flexDirection: 'row', position: 'absolute', left: 10, alignItems: 'center' }}>
                <MaterialIcons name='menu' size={30} onPress={onDrawer} />
                <Text style={{ fontSize: 25, fontFamily: typography.moon }}>TRENDY ZONE</Text>
            </View>
            <View style={{ position: 'absolute', right: 10 }}>
                <MaterialIcons name='search' size={30} onPress={() => onSearch()} />
            </View>
        </View>
    )
}