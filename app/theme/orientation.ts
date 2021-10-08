import { Dimensions } from "react-native";

const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
};
const getScreenInfo = () => {
    const dim = Dimensions.get('window');
    return dim;
}

export const bindScreenDimensionsUpdate = () => {
    Dimensions.addEventListener('change', () => {
        try {
            return {
                orientation: isPortrait() ? 'portrait' : 'landscape',
                screenWidth: getScreenInfo().width,
                screenHeight: getScreenInfo().height
            }
        } catch (e) {
            // Fail silentl
            return null;
        }
    });
}
