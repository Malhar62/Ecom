import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { typography } from "../../theme"
import { HEIGHT } from "../../theme/scale"


export default function BagBottom({ amount, afterdiscount }) {
    return (
        <View style={{
            width: '100%', paddingHorizontal: 10, backgroundColor: '#fff', marginTop: 20, borderWidth: 1
        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.txt}>{'Total Amount'.toUpperCase()}</Text>
                <Text style={styles.txt}>₹ {amount}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.txt, { color: 'grey' }]}>{'Discount'.toUpperCase()}</Text>
                <Text style={[styles.txt, { color: 'grey' }]}>- ₹{amount - afterdiscount}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.txt}>{'Amount To Pay'.toUpperCase()}</Text>
                <Text style={styles.txt}>₹ {afterdiscount}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    txt: {
        fontSize: 18,
        fontFamily: typography.kalma
    }
})