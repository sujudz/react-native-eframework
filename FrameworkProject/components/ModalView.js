import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import Modal from "react-native-modal";

const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    container: {
      height: 96,
      width: 96,
      borderColor: '#f0f0f0',
      borderRadius: 3,
      borderWidth: 0.5,
      backgroundColor: '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center'
    }
});

import LoadView from './LoadView'

var default_timeout = 20;

export default class ModalView extends Component {

  constructor(props) {
      super(props);
      this.state = {
        timeout : 0,
        modalVisible: false,
      }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalRef);
  }

  showModal() {
    let intervalRef = setInterval(() => {
      let timeout = this.state.timeout;
      timeout = timeout - 1;
      this.setState({
        timeout: timeout
      });

      if (timeout <= 0) {
        this.hideModal();
        clearInterval(this.state.intervalRef);
        this.setState({
          timeout: 0,
          intervalRef:undefined
        });
      }
    }, 1000);
    this.setState({
      intervalRef: intervalRef,
      timeout: default_timeout,
      modalVisible: true
    });
  }

  hideModal() {
    clearInterval(this.state.intervalRef);
    this.setState({
      timeout: 0,
      intervalRef:undefined,
      modalVisible: false
    });
  }

  render() {
  	return (
      <Modal
        style={{ margin: 0 }}
        visible={this.state.modalVisible}
        >
        <TouchableHighlight
           style={styles.center}
           underlayColor="#f0f0f0">
          <View style={styles.container}>
            <LoadView />
          </View>
        </TouchableHighlight>
      </Modal>
  	)
  }
}