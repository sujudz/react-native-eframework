import React, {Component} from 'react'
import {
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native'


const styles = StyleSheet.create({
    fontStyle: {
      fontFamily: "iconfont",
      fontSize: 22,
      color: '#ffffff'
    }
});

const iconMap = {
	arrow : '\ue601',
	search : '\ue600',
  arrow_up : '\ue602',
  arrow_down : '\ue744',
  arrow_left : '\ue603',
  video_play : '\ue645',
  video_pause : '\ue633',
  testpaper : '\ue63f',
  course : '\ue61c',
  auth : '\ue60c',
  vip : '\ue606',
  teacher : '\ue619',
  discuss : '\ue66d',
  close : '\ue605',
  icon_share : '\ue6eb',
  icon_reviews : '\ue682',
  icon_arrow_down : '\ue85e',
  icon_arrow_up : '\ue85f',
  icon_play : '\ue674',
  icon_location : '\ue607',
  icon_kf : '\ue61d',
  icon_screen_expand : '\ue765',
  icon_screen_full : '\ue61a',
  icon_review_good : '\ue661',
  icon_review_common : '\ue65a',
  icon_review_bad : '\ue62d',
  load : '\ue67b'
};

export default class TextIcon extends Component {

  render() {
  	const { customStyle, icon, color, onPress, fontSize } = this.props
    let fontStyle = styles.fontStyle;
    let newCustomStyle = customStyle ? customStyle : {};
    if (onPress) {
      return (
        <TouchableHighlight 
         underlayColor="#f0f0f0"
         onPress={() => onPress()}>
          <Text style={[fontStyle, {color : color}, newCustomStyle]}>{ iconMap[icon] }</Text>
        </TouchableHighlight>
      )
    }
  	return (
  		<Text style={[fontStyle, {color : color}, newCustomStyle]}>{ iconMap[icon] }</Text>
  	)
  }
}