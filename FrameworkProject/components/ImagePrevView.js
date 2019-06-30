import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  AppRegistry,
  NativeModules,
  TouchableHighlight
} from 'react-native'

const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    backgroundVideo: {
      width: '100%',
      height: 240
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    headerContainer: {
      height: 44,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    carouselContainer: {
      flex: 1,
      marginTop: '25%'
    }
});

import Video from 'react-native-video';
import Carousel from 'react-native-snap-carousel';
import BaseStyle from '.././components/BaseStyle'
import TextIcon from './IconView'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class ImagePrevView extends Component {

  constructor(props) {
      super(props);
      this.state = {
        data: props.data,
        index: props.index
      };

      this._onSnapToItem = this._onSnapToItem.bind(this);
  }

  _renderItemPage({item, index}) {
    if (item.type == "video") {
      return (
        <View style={styles.itemContainer}>
          <Video
             paused={true}
             controls={true}
             source={{uri: item.path}}
             ref={(ref) => {
               this.player = ref
             }}
             resizeMode="cover"                   
             style={[styles.backgroundVideo]} 
          />
        </View>
      );
    }
    return (
      <View style={styles.itemContainer}>
        <Image
          style={{ width: viewportWidth, height: 360 }}
          source={{uri: item.path}}
        />
      </View>
    );
  }

  _onSnapToItem(index) {
    this.setState({
      index: index
    });
  }

  _close() {
    NativeModules.Navigation.dismiss("ImagePrevProject");
  }

  render() {
    const { data } = this.props;
  	return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableHighlight
            underlayColor={BaseStyle.transparent.color}
            onPress={()=>{this._close();}}
          >
            <TextIcon customStyle={{ padding: 10 }} color="#ffffff" icon="close" />
          </TouchableHighlight>
          <Text 
            numberOfLines={1}
            style={{ textAlign: 'center', color: BaseStyle.white.color, width: '80%', marginLeft: -20, fontWeight: '500', fontSize: BaseStyle.baseSizeXL.fontSize }}
            >
            {this.state.index + 1}/{this.state.data.length}
          </Text>
          <View></View>
        </View>
        <View
            style={styles.carouselContainer}
        >
          <Carousel
            firstItem={this.state.index}
            onSnapToItem={this._onSnapToItem}
            inactiveSlideScale={1}
            sliderWidth={viewportWidth}
            sliderHeight={240}
            itemWidth={viewportWidth}
            ref={(c) => { this._carousel = c; }}
            data={this.props.data}
            renderItem={this._renderItemPage}
          />
        </View>
      </View>
  	)
  }
}

AppRegistry.registerComponent("ImagePrevProject", () => ImagePrevView);