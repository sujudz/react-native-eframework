import {
  Platform,
  Dimensions,
  NativeModules
} from 'react-native'

const UI_W = 375;
const UI_H = 667;

const host = "http://test01.fahen.xyz";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

var IOS_REQUEST_HOST = host + "/api/plugins/Thzsw/";
var ANDROID_REQUEST_HOST = host + "/api/plugins/Thzsw/";

var BASE_URL = host;
var ANDROID_BASE_URL = host;

export default class Config {

  getHost() {
    return Platform.OS == 'android' ? ANDROID_REQUEST_HOST : IOS_REQUEST_HOST;
  }

  getBaseUrl() {
    return Platform.OS == 'android' ? ANDROID_BASE_URL : BASE_URL;;
  }

  async getCurrentCategory() {
    try {
        let configData = await NativeModules.ConfigProvider.get("category");
        if (!configData || configData == "") {
          return null;
        }

        return JSON.parse(configData);
    } catch (e) {
      return null;
    }
  }

  async setCurrentCategory(category) {
    try {
        let configData = await NativeModules.ConfigProvider.save("category", JSON.stringify(category));
    } catch (e) {
      console.error(e);
    }
  }

  static getScreenPx(number) {
  	return viewportWidth / UI_W * number;
  }

  static getScreenPy(number) {
  	return viewportHeight / UI_H * number;
  }

  static viewportWidth = viewportWidth;
  static viewportHeight = viewportWidth;
}