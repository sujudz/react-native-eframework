import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import BaseStyle from '.././components/BaseStyle'

export default class EButton extends Component {

  _onPress() {
    this.props.onPress && this.props.onPress();
  }

  render() {
  	const { title } = this.props
  	return (
      <TouchableHighlight
        onPress={()=>{this._onPress();}}
        underlayColor={BaseStyle.transparent.color}
        style={styles.btnContainer}
      >
        <Text>{title}</Text>
      </TouchableHighlight>
  	)
  }
}

const styles = StyleSheet.create({
    btnContainer: {
      padding: 8,
      borderRadius: 3,
      borderWidth: 0.5,
      maxWidth: 120,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: BaseStyle.colorAccent.color
    }
});
