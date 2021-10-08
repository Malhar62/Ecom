import { ViewStyle, ImageStyle, TextStyle } from 'react-native'
import { WIDTH, HEIGHT } from '../../theme/scale'
export const homeStyles = {
    main: {
        width: WIDTH(200),
        height: HEIGHT(250),
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center'
    } as ViewStyle,
    img: {
        height: HEIGHT(170),
        width: WIDTH(130),
        borderRadius: 7,
        alignSelf: 'center'
    } as ImageStyle,
    bottom: {
        width: '100%'
    } as ViewStyle,
    bottomimg: { width: WIDTH(100), height: HEIGHT(130) } as ImageStyle
}