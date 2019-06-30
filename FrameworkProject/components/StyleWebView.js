import React, {Component} from 'react'
import {
  WebView,
  View,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
    center: {
      flex: 1,
      alignItems: 'center'
    },
    content: {
      flex: 1,
      marginTop: 8,
      backgroundColor: '#ffffff'
    },
});

import Config from './../model/Config'

var HTML_TEMPLATE = "<html><head>"
    + "<meta http-equiv='Content-type' content='text/html; charset=utf-8'>"
    + "<meta name='viewport' content='width=device-width,initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0'>"
    + "<style> body{ height: 100%; padding: $paddingpx; font-size:100%;background:$backgroundColor;}"
    + "img { width : 100%;}"
    + "</style>"
    + "</head><body>$content"
    + "<script>window.document.addEventListener('message', function(e) {"
    + "let result = '';"
    + "if (e.data == 'getScrollHeight') {result = getScrollHeight();}"
    + "window.postMessage(result);"
    + "});"
    + "function getScrollHeight() { return JSON.stringify({'data':window.document.body.scrollHeight, 'type':'getScrollHeight'});}"
    + "</script>"
    + "</body></html>";


import TextIcon from './IconView'

export default class StyleWebView extends Component {

  constructor(props) {
      super(props);
      this.state = {
        height: 100,
        content: undefined
      };
  }

  _formatContent() {
    if (this.state.content) {
      return this.state.content;
    }

    let content = HTML_TEMPLATE.replace('$content', this.props.content);
    if (this.props.customStyle) {
      let customStyle = this.props.customStyle;
      for (let key in customStyle) {
        content = content.replace('$' + key, customStyle[key]);
      }
    }

    this.setState({
      content: content
    })
    return content;
  }

  _onMessage = (event: Object) => {
    try {
      let result = JSON.parse(event.nativeEvent.data);
      if (result.type == "getScrollHeight") {
        this.setState({
          height: result.data
        });
      }
    } catch(error) {
    }
  }

  _onLoadEnd =(e)=>{
    this._webview && this._webview.postMessage("getScrollHeight");
  }

  render() {
  	let { customStyle, content, contentUrl, scrollEnabled } = this.props;
    let source = {};
    if (contentUrl) {
      if (!contentUrl.startsWith("http")) {
        contentUrl = "http:" + contentUrl;
      }
      source = {
        uri: contentUrl
      };
    } else {
      source = {
        html: this._formatContent(), 
        baseUrl: new Config().getBaseUrl()
      };
    }
  	return (
      <WebView
          scrollEnabled={scrollEnabled}
          ref={(webview) => {
            this._webview = webview
          }}
          style={[styles.content, { height: this.state.height }]}
          useWebKit={true}
          javaScriptEnabled={true}
          onLoadEnd={this._onLoadEnd}
          onMessage={this._onMessage}
          originWhitelist={['*']}
          source={source}
      />
  	)
  }
}