import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import BaseStyle from '../.././components/BaseStyle'

const styles = StyleSheet.create({
    fontStyle: {
      padding: 8,
      fontFamily: "iconfont",
      fontSize: 22,
      color: '#ffffff'
    }
});

const iconMap = {
  icon_review_good : '\ue661',
  icon_review_common : '\ue65a',
  icon_review_bad : '\ue62d'
};

const fontSizeLabel = {
  'mini' : 16,
  'normal': 28,
  'large': 48
};

export default class EIcon extends Component {
  constructor(props) {
    super(props);
  }

  _onPress() {
    this.props.onPress && this.props.onPress();
  }

  componentDidMount() {
  }

  _coverFontSize(fontSize) {
    return fontSizeLabel[fontSize];
  }

  render() {
    const { icon, color, onPress, size, fontSize } = this.props;
    let fontStyle = styles.fontStyle;
    let realFontSize = this._coverFontSize(size);
    if (fontSize) {
      realFontSize = fontSize;
    }
  	if (onPress) {
      return (
        <TouchableHighlight 
         underlayColor={BaseStyle.transparent.color}
         onPress={() => onPress()}>
          <Text 
            {...this.props}
            style={[fontStyle, {color : color, fontSize: realFontSize}]}>
              { iconMap[icon] }
            </Text>
        </TouchableHighlight>
      )
    }
    return (
      <Text 
        {...this.props}
        style={[fontStyle, {color : color, fontSize: realFontSize}]}
      >
        { iconMap[icon] }
      </Text>
    );
  }
}
