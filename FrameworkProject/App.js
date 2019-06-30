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

export default class ViewPagerDemo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: null,
      categorys: null,
      bannerPosition: 0
    };

  }


  render() {
    return (
      <Text>hello world</Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
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