import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import BaseStyle from '../.././components/BaseStyle'

const underlayColorLabel = {
  normal: BaseStyle.white.color,
  primary: BaseStyle.colorAccent.color,
  warn: BaseStyle.colorPrimary.color
};

export default class EButton extends Component {
  constructor(props) {
    super(props);
    let type = props.type ? props.type : 'normal';
    let mode = props.mode ? props.mode : 'normal';

    let touchableHighlightStyles = [styles.btnContainer];
    let titleStyles = [styles.btnTitle, styles[type + 'TitleStyle']];
    touchableHighlightStyles.push(styles[type + 'Style']);
    underlayColor = underlayColorLabel[type];
    if (mode == 'full') {
      touchableHighlightStyles.push(styles.fullStyle);
    }
    this.state = {
      underlayColor: underlayColor,
      titleStyles: titleStyles,
      touchableHighlightStyles: touchableHighlightStyles
    };
  }

  _onPress() {
    this.props.onPress && this.props.onPress();
  }

  componentDidMount() {
  }

  render() {
  	return (
      <TouchableHighlight
        {...this.props}
        onPress={()=>{this._onPress();}}
        underlayColor={this.state.underlayColor}
        style={this.state.touchableHighlightStyles}
      >
        <Text style={this.state.titleStyles}>{this.props.children}</Text>
      </TouchableHighlight>
  	)
  }
}

const styles = StyleSheet.create({
    btnTitle: {
      fontSize: BaseStyle.baseSize.fontSize,
      color: BaseStyle.white.color
    },
    fullStyle: {
      flex: 1
    },
    btnContainer: {
      padding: 8,
      borderRadius: 4,
      borderWidth: 0.5,
      alignItems: 'center',
      justifyContent: 'center'
    },
    warnStyle: {
      borderColor: BaseStyle.colorPrimary.color,
      backgroundColor: BaseStyle.colorPrimary.color
    },
    primaryStyle: {
      borderColor: BaseStyle.colorAccent.color,
      backgroundColor: BaseStyle.colorAccent.color
    },
    normalStyle: {
      borderColor: BaseStyle.colorAccent.color,
      backgroundColor: BaseStyle.white.color
    },
    normalTitleStyle: {
      color: BaseStyle.colorAccent.color
    }
});
