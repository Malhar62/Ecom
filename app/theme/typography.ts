import { Platform } from "react-native"

/**
 * You can find a list of available fonts on both iOS and Android here:
 * https://github.com/react-native-training/react-native-fonts
 *
 * If you're interested in adding a custom font to your project,
 * check out the readme file in ./assets/fonts/ then come back here
 * and enter your new font name. Remember the Android font name
 * is probably different than iOS.
 * More on that here:
 * https://github.com/lendup/react-native-cross-platform-text
 *
 * The various styles of fonts are defined in the <Text /> component.
 */
export const typography = {
  /**
   * The primary font.  Used in most places.
   */
  primary: Platform.select({ ios: "Helvetica", android: "normal" }),

  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: "Arial", android: "sans-serif" }),

  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: "Courier", android: "monospace" }),

  sigma: Platform.select({ ios: "SiegraRegular-ALg9A", android: "SiegraRegular-ALg9A" }),

  alvina: Platform.select({ ios: "AlvienaRegular-JREnE", android: "AlvienaRegular-JREnE" }),

  ray: Platform.select({ ios: "rayjoe", android: "rayjoe" }),

  kalma: Platform.select({ ios: 'Kalmansk-51WVB', android: 'Kalmansk-51WVB' }),

  land: Platform.select({ ios: 'LandasansMedium-ALJ6m', android: 'LandasansMedium-ALJ6m' }),

  moon: Platform.select({ ios: 'MoongladeDemoBold-jOzM', android: 'MoongladeDemoBold-jOzM' }),

  swan: Platform.select({ ios: 'Swansea-q3pd', android: 'Swansea-q3pd' }),

  kobani: Platform.select({ ios: 'kobani', android: 'kobani' })

}
