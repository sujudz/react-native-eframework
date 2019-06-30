import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
    center: {
      alignItems: 'center'
    }
});

import TextIcon from './IconView'
export default class LoadView extends Component {

  render() {
  	const { config } = this.props
  	return (
      <View style={styles.center}>
        <TextIcon icon="load" color="#000000" />
        <Text>加载中...</Text>
      </View>
  	)
  }
}