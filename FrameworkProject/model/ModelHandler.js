import {
  Platform,
  DeviceEventEmitter
} from 'react-native'

export default class ModelHandler {

	constructor() {
	}

  handleResponse(response, status) {
    this._parseError(response);
    if (status == 404) {
      return {};
    }
    if (status != 200) {
      throw this.handleError(response);
    }

    return response;
  }

  _parseError(response) {
    if (!response.error) {
      return;
    }

    //token不存在
    if (response.error.code == "4040117") {
      alert(response.error.message);
      DeviceEventEmitter.emit("ClearUserEventType", null);
    }
  }

  handleError(response) {
    console.log(response);
    if (response.error) {
      return response.error;
    }

    return response;
  }
}