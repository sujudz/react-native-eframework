import React, {Component} from 'react'
import {
  View,
  Platform,
  StyleSheet,
  NativeModules
} from 'react-native'

import AndroidVideoView from './AndroidVideoView'
import IOSVideoView from './IOSVideoView'

export default class VideoView extends Component {

  constructor(props) {
      super(props);
      this.state = {
      };
  }

  componentDidMount() {
    let videoView = [];
    if (Platform.OS == 'android') {
      videoView.push(
        <AndroidVideoView 
          {...this.props}
        />
      );
    } else {
      videoView.push(
        <IOSVideoView 
          {...this.props}
        />
      );
    }
    this.setState({
      videoView: videoView
    });
  }

  render() {
  	const { mediaUrl, customStyle } = this.props
  	return (
      <View style={styles.container}>
        {this.state.videoView}
      </View>
  	)
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
});