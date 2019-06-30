import React, {Component} from 'react'
import {
  Dimensions,
  View,
  Image,
  StyleSheet
} from 'react-native'

import Carousel, {Pagination} from 'react-native-snap-carousel';

const styles = StyleSheet.create({
    paginationContainer: {
      paddingVertical: 8
    },
    paginationDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 1
    },
    carouselItemContainer: {
      flex: 1, 
      height: 200,
      borderRadius: 10,
    }
});

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const itemWidth = 20;

export default class ViewPager extends Component {

  constructor(props) {
      super(props);
      this.state = {
        bannerPosition: 0
      };
      this._onSnapToItem = this._onSnapToItem.bind(this);
  }

  _onSnapToItem(index) {
    this.setState({
      bannerPosition: index
    });
  }

  _renderBannerPage({item, index}) {
    return (
      <Image
            key = {index}
            style={styles.carouselItemContainer}
            source={{uri: item}}
        />
    )
  }

  _onChangePage(index) {
  }

  scrollToItem(position) {
    if (this._carousel) {
      this._carousel._snapToItem(position);
    }
  }

  render() {
  	const { data, renderItem, bannerPosition, hasPagination, itemWidthPadding, onChangePage } = this.props;
    let renderItemPage = this._renderBannerPage;
    if (renderItem) {
      renderItemPage = renderItem;
    }

    let _onChangePage = this._onChangePage;
    if (onChangePage) {
      _onChangePage = onChangePage;
    }
    if (hasPagination) {
      return (
        <View style={{flex: 1}}>
          <Carousel
            {...this.props}
            onSnapToItem={_onChangePage}
            sliderWidth={viewportWidth}
            sliderHeight={140}
            itemWidth={viewportWidth - 32}
            ref={(c) => { this._carousel = c; }}
            data={this.props.data}
            renderItem={renderItemPage}
          />
          <Pagination
            containerStyle={styles.paginationContainer}
            dotsLength={this.props.data.length}
            dotStyle={styles.paginationDot}
            activeDotIndex={this.state.bannerPosition}
            dotColor="rgba(251, 4, 19, 1)"
            inactiveDotColor={'rgba(204, 185, 188, 1)'}
            inactiveDotOpacity={0.9}
            inactiveDotScale={0.8}
         />
        </View>
      )
    }
    return (
      <View style={{flex: 1}}>
        <Carousel
          {...this.props}
          inactiveSlideScale={1}
          onSnapToItem={_onChangePage}
          sliderWidth={viewportWidth}
          sliderHeight={140}
          itemWidth={viewportWidth - itemWidthPadding}
          ref={(c) => { this._carousel = c; }}
          data={this.props.data}
          renderItem={renderItemPage}
        />
      </View>
    )
  }
}