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
  Slider,
  NativeModules,
  TouchableHighlight
} from 'react-native'

import ImageSource from '.././components/ImageSource'
import BaseStyle from '.././components/BaseStyle'
import TextIcon from './IconView'
import Video from 'react-native-video';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

import { Defs, Svg, Stop, LinearGradient, Rect } from 'react-native-svg'

const DEFAULT_HEIGHT = 240;
const RATE_ARRAY = [1, 1.25, 1.5];
const DEFAULT_BG_COLOR = "rgba(255, 255, 255, 0)";

export default class IOSVideoView extends Component {

  constructor(props) {
      super(props);

      this.state = {
        transform: [],
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
        toolControllerState: true,
        expandTools: []
      };

      this._changeRate = this._changeRate.bind(this);
      this._onLoad = this._onLoad.bind(this);
      this._onProgress = this._onProgress.bind(this);
      this._changeScreenState = this._changeScreenState.bind(this);
  }

  componentDidMount() {
    let anims = this._initTransformAnims();
    let transform = this._initTransform(anims);
    this.setState({
      transform:  transform,
      anims: anims
    });
    this._changeExpandTools();
  }

  _initTransformAnims() {
    return {
      rotateAnim: new Animated.Value(0),
      translateAnim: new Animated.Value(0),
      translateAnimX: new Animated.Value(0),
    };
  }

  _initTransform(anims) {
    return [
        {translateX: anims['translateAnimX']},
        {translateY: anims['translateAnim']},
        {rotate:anims['rotateAnim'].interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg']})}
      ];
  }

  _changeExpandTools() {
    let orientation = this.state.orientation;
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

  _animFullScreenByiOS() {
    let anims = this.state.anims;
    let anim = Animated.parallel([
      Animated.timing(anims.rotateAnim, {
          toValue: 1,
          duration: 100,
          easing: Easing.linear,
      }),
      Animated.timing(anims.translateAnim, {
          toValue: (this.state.width - this.state.height) / 2,
          duration: 50,
          easing: Easing.linear,
      }),
      Animated.timing(anims.translateAnimX, {
          toValue: (this.state.width - this.state.height) / 2,
          duration: 50,
          easing: Easing.linear,
      })
    ]);
    anim.start();
    this._changeExpandTools();
  }

  _fullScreen() {
    this.setState({
      orientation: 1,
      width: viewportHeight,
      height: viewportWidth
    }, () => {
      NativeModules.ScreenProvider.setStatus(1);
      this._animFullScreenByiOS();
    });
  }

  _animEnableFullScreenByiOS() {
    let anims = this.state.anims;
    let anim = Animated.parallel([
      Animated.timing(anims.rotateAnim, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
      }),
      Animated.timing(anims.translateAnim, {
          toValue: 0,
          duration: 50,
          easing: Easing.linear,
      }),
      Animated.timing(anims.translateAnimX, {
          toValue: 0,
          duration: 50,
          easing: Easing.linear,
      })
    ]);
    anim.start();
    this._changeExpandTools();
  }

  _enableFullScreen() {
    this.setState({
      orientation: 0,
      width: viewportWidth,
      height: DEFAULT_HEIGHT
    }, () => {
      NativeModules.ScreenProvider.setStatus(0);
      this._animEnableFullScreenByiOS();
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

  render() {
  	const { mediaUrl, customStyle } = this.props
  	return (
      <Animated.View
        style={[styles.center, { transform: this.state.transform, width: this.state.width, height: this.state.height}]}>   
          <View style={[styles.posterContainer, { display: this.state.mediaType == 'audio' ? 'flex': 'none'}]}>
            <Image
                style={{ width: '100%', height: '100%' }}
                source={require('./../images/timg.jpeg')}
            />
          </View>
          <Video 
             controls={this.state.nativeControllerState}
             onLoad={this._onLoad}
             source={{uri: mediaUrl}}
             ref={(ref) => {
               this.player = ref
             }}
             rate={RATE_ARRAY[this.state.ratePosition]}
             resizeMode="cover"
             onProgress={this._onProgress}
             paused={this.state.paused}
             onError={this._videoError}                   
             style={[styles.backgroundVideo, customStyle]} 
          />
          <TouchableHighlight
            style={[styles.videoControllerMaskContainer, { width: this.state.width, height: this.state.height}]}
            underlayColor={BaseStyle.transparent.color}
            onPress={()=>{this._changeToolControllerState();}}
          >
            <View
                style={{ backgroundColor: DEFAULT_BG_COLOR, flex: 1, display: this.state.toolControllerState ? 'flex' : 'none' }}
              >
              <View style={styles.headerContainer}>
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
              <View 
                style={styles.videoControllerContainer}>
                <Svg
                    style={{ position:"absolute" }}
                    height="48"
                    width={this.state.width}
                  >
                  <Defs>
                      <LinearGradient id="Gradient" x1="0" y1="0" x2="0" y2="100%">
                          <Stop offset="0" stopColor="#000000" stopOpacity="0" />
                          <Stop offset="1" stopColor="#000000" stopOpacity="0.4" />
                          <Stop offset="1" stopColor="#000000" stopOpacity="0.8" />
                      </LinearGradient>
                  </Defs>
                  <Rect rx="0" ry="0" x="0" y="0" width={this.state.width} height="48" fill="url(#Gradient)" />
                </Svg>
                <View style={styles.videoControllerToolView}>
                  <TouchableHighlight
                    underlayColor={BaseStyle.transparent.color}
                    onPress={()=>{this._changePlayState();}}
                  >
                    <TextIcon
                      customStyle={styles.videoControllerBtn}
                      icon={this.state.paused ? 'icon_play' : 'video_pause'}
                    />
                  </TouchableHighlight>
                  <Text style={styles.videoControllerText}>{this.state.currentTimeText}</Text>
                  <Slider 
                    style={{ flex: 1 }}
                    value={this.state.currentTime}
                    step={1}
                    androidthumbTintColor="#fffff"
                    thumbImage={ImageSource.icon_slider}
                    minimumValue={0}
                    minimumTrackTintColor={BaseStyle.colorPrimary.color}
                    maximumTrackTintColor="rgba(255,255,255,0.2)"
                    onValueChange={this._onChange}
                    maximumValue={this.state.duration}
                  />
                  <Text style={styles.videoControllerText}>{this.state.durationTimeText}</Text>
                  <TouchableHighlight
                    style={{ display: this.state.mediaType == 'audio' ? 'none': 'flex' }}
                    underlayColor={BaseStyle.transparent.color}
                    onPress={()=>{this._changeScreenState();}}
                  >
                    <TextIcon
                      customStyle={styles.videoControllerBtn}
                      icon={this.state.orientation ? "icon_screen_full" : "icon_screen_expand"}
                    />
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </TouchableHighlight>
      </Animated.View>
  	)
  }
}

const styles = StyleSheet.create({
    posterContainer: {
      top: 0,
      left: 0,
      height: 240,
      width: viewportWidth,
      position: 'absolute'
    },
    rateBtn: {
      width: 30,
      height: 19,
      marginRight: 10,
      lineHeight: 15,
      borderWidth: 2,
      borderColor: BaseStyle.white.color,
      fontSize: 8,
      textAlign: 'center',
      fontWeight: '600',
      color: BaseStyle.white.color
    },
    expandToolsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    headerContainer: {
      flex: 1,
      height: 64,
      paddingTop: 20,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-start',
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
      position: 'absolute',
      backgroundColor: BaseStyle.white.color
    },
    backgroundVideo: {
      width: '100%',
      height: '100%'
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