import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  Easing,
  Dimensions,
  StyleSheet,
  Animated,
  Platform,
  NativeModules,
  BackHandler,
  TouchableHighlight
} from 'react-native'

import BaseStyle from '.././components/BaseStyle'
import TextIcon from './IconView'
import Video from 'react-native-video';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

import { Defs, Svg, Stop, LinearGradient, Rect } from 'react-native-svg'

const DEFAULT_HEIGHT = 240;
const RATE_ARRAY = [1, 1.25, 1.5];
const DEFAULT_BG_COLOR = "rgba(255, 255, 255, 0.2)";

export default class AndroidVideoView extends Component {

  constructor(props) {
      super(props);

      this.state = {
        mediaType: props.mediaType ? props.mediaType: "video",
        ratePosition: 0,
        landscapeExpandTools: props.landscapeExpandTools,
        portraitExpandTools: props.portraitExpandTools,
        orientation: 0,
        value: 0,
        width: viewportWidth,
        height: DEFAULT_HEIGHT,
        duration: 0,
        paused: false,
        currentTime: 0,
        durationTimeText: '00:00',
        currentTimeText: '00:00',
        expandTools: [],
        fullscreenBtnState: "audio" == props.mediaType ? false: true,
        headerContainerState: true
      };

      this._changeRate = this._changeRate.bind(this);
      this._onLoad = this._onLoad.bind(this);
      this._onProgress = this._onProgress.bind(this);
      this._onControllerStateChange = this._onControllerStateChange.bind(this);
      this.onFullscreenPlayerWillDismiss = this.onFullscreenPlayerWillDismiss.bind(this);
      this._onFullscreenPlayerWillPresent = this._onFullscreenPlayerWillPresent.bind(this);
  }

  componentDidMount() {
    this._changeExpandTools();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return this.handlerBack();
    });
  }

  handlerBack() {
    if (this.state.orientation == 0) {
      return false;
    }
    this._enableFullScreen();
    return true;
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  _changeExpandTools() {
    this.setState({
      expandTools: this.state.landscapeExpandTools
    });
  }

  _changeRate() {
    let ratePosition = this.state.ratePosition;
    let length = RATE_ARRAY.length;
    ratePosition = ratePosition + 1;
    if (ratePosition >= length) {
      ratePosition = 0;
    }

    this.setState({
      ratePosition: ratePosition
    });
  }

  _animFullScreenByAndroid() {
    NativeModules.ScreenModule.request(0);
  }

  _fullScreen() {
    this.setState({
      height: viewportWidth,
      orientation: 1,
    }, () => {
      this._animFullScreenByAndroid();
    });
  }

  //LANDSCAPE 0; PORTRAIT: 1
  _animEnableFullScreenByAndroid() {
    NativeModules.ScreenModule.request(1);
  }

  _enableFullScreen() {
    this.setState({
      height: DEFAULT_HEIGHT,
      orientation: 0,
    }, () => {
      this._animEnableFullScreenByAndroid();
    });
  }

  _back() {
    let orientation = this.state.orientation;
    if (orientation == 0) {
      NativeModules.Navigation.back("VideoViewProject");
    } else {
      this._enableFullScreen();
    }
  }

  _changeScreenState() {
    let orientation = this.state.orientation;
    if (orientation == 0) {
      this._fullScreen();
    } else {
      this._enableFullScreen();
    }
  }

  _changePlayState() {
    this.setState({
        paused: !this.state.paused
    });
  }

  _formatTime(time) {
    var time = time || 0;
    var h = parseInt(time/3600),
        m = parseInt(time%3600/60),
        s = parseInt(time%60);
    h = h < 10 ? "0"+h : h;
    m = m < 10 ? "0"+m : m;
    s = s < 10 ? "0"+s : s;
    if (h <= 0) {
      return m+":"+s;
    }
    return h+":"+m+":"+s;
  }

  _onChange =(value)=>{
      this.setState({
          value: value
      })
      if (this.player) {
        this.player.seek(value);
      }
  };

  _videoError() {
    alert("视频播放异常");
  }

  //naturalSize: { height: 480, orientation: 'landscape', width: 854 } 
  _onLoad(info) {
    this.setState({
      duration: info.duration,
      durationTimeText: this._formatTime(info.duration)
    });
    if (this.player) {
      this.setState({
        paused: this.player.paused
      });
    }
  }

  _changeToolControllerState() {
    this.setState({
      toolControllerState: !this.state.toolControllerState
    });
  }

  /*
    {
    currentTime: 5.2,
    playableDuration: 34.6,
    seekableDuration: 888
  }
  */
  _onProgress(info) {
    this.setState({
      currentTime: info.currentTime,
      currentTimeText: this._formatTime(info.currentTime)
    });
  }

  _onFullscreenPlayerWillPresent() {
    this._fullScreen();
  }

  onFullscreenPlayerWillDismiss() {
    this._enableFullScreen();
  }

  _onControllerStateChange(state) {
    this.setState({
      headerContainerState: state['controllerState']
    });
  }

  render() {
  	const { mediaUrl, customStyle } = this.props
  	return (
      <View
        style={[styles.center]}>   
          <View
           style={styles.posterContainer}>
            <Image
                style={{ width: '100%', height: DEFAULT_HEIGHT }}
                source={require('./../images/timg.jpeg')}
            />
          </View>
          <Video
             controls={true}
             onLoad={this._onLoad}
             source={{uri: mediaUrl}}
             ref={(ref) => {
               this.player = ref
             }}
             fullscreenBtn={this.state.fullscreenBtnState}
             rate={RATE_ARRAY[this.state.ratePosition]}
             resizeMode="cover"
             onControllerStateChange={this._onControllerStateChange}
             onFullscreenPlayerDidDismiss={this.onFullscreenPlayerWillDismiss}
             onFullscreenPlayerDidPresent={this._onFullscreenPlayerWillPresent}
             onProgress={this._onProgress}
             paused={this.state.paused}
             onError={this._videoError}                   
             style={[styles.backgroundVideo, customStyle, {height: this.state.height}]} 
          />
          <View style={[styles.headerContainer, { top: this.state.headerContainerState ? 0: -64}]}>
            <Svg
              style={{ position: 'absolute' }}
              height="64"
              width="100%"
            >
              <Defs>
                  <LinearGradient id="Gradient" x1="0" y1="100%" x2="0" y2="0">
                      <Stop offset="1" stopColor="#000000" stopOpacity="0.8" />
                      <Stop offset="1" stopColor="#000000" stopOpacity="0.5" />
                      <Stop offset="0" stopColor="#000000" stopOpacity="0" />
                  </LinearGradient>
              </Defs>
              <Rect rx="0" ry="0" x="0" y="0" width="100%" height="64" fill="url(#Gradient)" />
            </Svg>
            <TouchableHighlight
              underlayColor={BaseStyle.transparent.color}
              onPress={()=>{this._back();}}
            >
              <TextIcon color="#ffffff" customStyle={{ padding: 12 }} icon="arrow" />
            </TouchableHighlight>
            <View style={styles.expandToolsContainer}>
               <TouchableHighlight
                underlayColor={BaseStyle.transparent.color}
                onPress={()=>{this._changeRate();}}
              >
                <Text style={styles.rateBtn}>x{RATE_ARRAY[this.state.ratePosition]}</Text>
              </TouchableHighlight>
              {this.state.expandTools}
            </View>
          </View>
      </View>
  	)
  }
}

const styles = StyleSheet.create({
    posterContainer: {
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      position: 'absolute'
    },
    rateBtn: {
      width: 30,
      height: 19,
      marginRight: 10,
      lineHeight: 15,
      borderWidth: 2,
      fontSize: 8,
      fontWeight: '600',
      textAlign: 'center',
      borderWidth: 2,
      borderColor: BaseStyle.white.color,
      color: BaseStyle.white.color
    },
    expandToolsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    headerContainer: {
      height: 64,
      width: '100%',
      paddingTop: 20,
      left: 0,
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    videoControllerBtn: {
      padding: 13,
      color: BaseStyle.white.color
    },
    videoControllerMaskContainer: {
      top: 0,
      left: 0,
      flex: 1,
      zIndex: 2,
      position: 'absolute'
    },
    center: {
      flex: 1,
      right: 0,
      top: 0,
      zIndex: 2,
      width: '100%',
      position: 'relative'
    },
    backgroundVideo: {
      flex: 1,
      width: '100%',
      height:DEFAULT_HEIGHT
    },
    videoControllerToolView: {
      zIndex: 2,
      alignItems: 'center',
      flexDirection: 'row'
    },
    videoControllerContainer: {
      flex: 1,
      height: 48,
      bottom: 0,
      left: 0,
      width: '100%',
      position: 'absolute',
      alignItems: 'center',
      flexDirection: 'row'
    },
    videoControllerText: {
      fontWeight: '500',
      padding: 10,
      fontSize: BaseStyle.baseSizeML.fontSize,
      color: BaseStyle.white.color
    }
});