import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Image, Dimensions } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native"
import { color } from "../../theme"
import { SliderBox } from "react-native-image-slider-box";
import ImageViewer from 'react-native-image-zoom-viewer';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const ImageDetailScreen = observer(function ImageDetailScreen() {
  // Pull in one of our MST stores

  // Pull in navigation via hook
  const isFocused = useIsFocused()
  const route = useRoute<any>()
  const [ind, setInd] = React.useState(route.params.id)
  React.useEffect(() => {
    if (isFocused) {
      setInd(route.params.id)
    }
  }, [isFocused])
  const IMGS: any = route.params.data;
  var images = [];
  IMGS.forEach((element: any) => {
    let str = { url: element }
    images.push(str)
  });
  console.log(images)

  function boom() {
    return <View>
      <Text style={{ fontSize: 40 }}>Loading...</Text>
    </View>;
  }
  return (
    <View style={ROOT}>
      <ImageViewer
        imageUrls={images}
        backgroundColor='#fff'
        renderIndicator={() => null}
        onChange={(index) => setInd(index)}
        index={route.params.id}
        loadingRender={() => boom()}
      />
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        {images.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                height: 2,
                width: 20,
                backgroundColor: ind == index ? 'navy' : '#ccc6b6',
                margin: 7
              }}
            />
          )
        })}
      </View>
    </View>
  )
})
/**
 *
 *    <SliderBox
        images={IMG}
        firstItem={route.params.id}
        sliderBoxHeight={Dimensions.get('screen').height}
        resizeMethod={'resize'}
        resizeMode={'contain'}
        onCurrentImagePressed={(index: any) =>
          console.log(`image ${index} pressed`)
        }
        parentWidth={Dimensions.get('screen').width}
        dotColor="navy"
        inactiveDotColor="#90A4AE"
        dotStyle={{
          width: 15,
          height: 2,
          marginHorizontal: 0,
          backgroundColor: "navy"
        }}
      />
 */