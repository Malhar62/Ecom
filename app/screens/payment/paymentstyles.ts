import { ViewStyle, TextStyle, ImageStyle } from "react-native";
import { HEIGHT } from "../../theme/scale";


export const paymentStyles = {

    top: {
        flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, borderBottomColor: '#ebe8e1', height: HEIGHT(70)
    } as ViewStyle,
    bottom: {
        bottom: 0, left: 0, right: 0, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: HEIGHT(80), paddingHorizontal: 10
    } as ViewStyle,
    midle: { marginBottom: HEIGHT(150), marginHorizontal: 10, justifyContent: 'space-between', paddingVertical: 10, backgroundColor: '#fff', height: HEIGHT(150) } as ViewStyle,
    discount:{ marginTop: 10, height: HEIGHT(30), borderBottomColor: '#ebe8e1', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }as ViewStyle
}