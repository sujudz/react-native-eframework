import React, { Component } from 'react';

import {
    View,
    Image,
    Text,
    StyleSheet,
    AppRegistry,
    TouchableNativeFeedback,
    ViewPagerAndroid,
    NativeModules
} from 'react-native';

var REQUEST_HOST = "http://demo.edusoho.com";

import EButton from './components/Button/EButton'

export default class ViewPagerDemo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: null,
      categorys: null,
      bannerPosition: 0
    };

  }

  _onPress() {
    //alert('click');
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ flex: 1, marginTop: 32, alignItems: 'center', flexDirection: 'column' }}>
          <Text>普通模式</Text>
            <View style={styles.container}>
              <EButton
                type="normal"
                onPress={this._onPress}
              >
              hello world
              </EButton>
              <EButton
                type="primary"
                onPress={this._onPress}
              >
              hello world
              </EButton>
              <EButton
                type="warn"
                onPress={this._onPress}
              >
              hello world
              </EButton>
            </View>
        </View>
        <View style={{ flex: 1, marginTop: 32, alignItems: 'center', flexDirection: 'column' }}>
          <Text>铺满模式</Text>
            <View style={styles.container}>
              <EButton
                mode="full"
                type="normal"
                onPress={this._onPress}
              >
              hello world
              </EButton>
              
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  courseListItemImage: {
    width: 140,
    height: 90,
    marginBottom: 6,
    marginTop: 6
  },
  columnContainer: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  viewPagerContainer: {
    flexDirection: 'column',
    backgroundColor: '#efefef',
    justifyContent: 'center'
  },
  viewPager: {
    flex: 1,
    height: 180,
    backgroundColor: '#889933'
  },
  bannerItemImage: {
    backgroundColor: '#889933',
    flex: 1
  },
  bannerIndex: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
    marginTop: -32,
    color: '#666666'
  },
  categoryBtn: {
    margin: 4
  },
  courseItemBodySub: {
    marginTop: 8
  },
  header: {
    backgroundColor: '#efefef'
  },
  fontStyle: {
    fontFamily: "iconfont"
  }
});
AppRegistry.registerComponent('AwesomeProject', () => ViewPagerDemo);