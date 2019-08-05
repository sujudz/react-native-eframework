import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import BaseStyle from '../.././components/BaseStyle'
import EIcon from '../.././components/Button/EIcon'

export default class ETabItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: []
    }
  }

  _onPress() {
    this.props.onPress && this.props.onPress();
  }

  componentDidMount() {
    this._initTabItem();
  }

  _initTabItem() {
    let tab = [];
    if (this.props.icon) {
      tab.push(
        <EIcon
          size="normal"
          color={BaseStyle.colorAccent.color}
          icon={this.props.icon}
         />
      );
    }

    tab.push(
      <Text style={styles.titleStyles}>{this.props.title}</Text>
    );
    this.setState({
      tab: tab
    });
  }

  render() {
  	return (
      <TouchableHighlight
        {...this.props}
        onPress={()=>{this._onPress();}}
         underlayColor={BaseStyle.transparent.color}
        style={[styles.tabContainer, this.props.style]}
      >
        <View style={styles.tabItem}>
          {this.state.tab}
        </View>
      </TouchableHighlight>
  	)
  }
}

const styles = StyleSheet.create({
    tabItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    titleStyles: {
      fontSize: BaseStyle.baseSizeML.fontSize,
      color: BaseStyle.colorAccent.color
    },
    tabContainer: {

    }
});
