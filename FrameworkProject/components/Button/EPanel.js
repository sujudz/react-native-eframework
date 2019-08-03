import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import BaseStyle from '../.././components/BaseStyle'

export default class EPanel extends Component {
  constructor(props) {
    super(props);
  }

  _onPress() {
    this.props.onPress && this.props.onPress();
  }

  componentDidMount() {
  }

  render() {
  	return (
      <View
        {...this.props}
        style={[styles.panelStyle, styles.panelBgStyle]}
      >
        <Text style={styles.panelTitle}>{this.props.title}</Text>
        {this.props.children}
      </View>
  	)
  }
}

const styles = StyleSheet.create({
    panelTitle: {
      height: 36,
      lineHeight: 36,
      fontWeight: '500',
      fontSize: BaseStyle.baseSizeXL.fontSize
    },
    panelStyle: {
      flex: 1,
      padding: 16,
      paddingTop: 6,
      borderRadius: 4,
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
    },
    panelBgStyle: {
      backgroundColor: BaseStyle.dividerDaryText.color
    }
});
