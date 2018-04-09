import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native'
import Markdown from 'react-native-simple-markdown'

const width = Dimensions.get('window').width

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Act extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      modalVisible: false,
      content: ''
    }
  }

  _show(){
    this.setState({modalVisible: true})
  }

  _close(){
    this.setState({modalVisible: false})
  }

  _submit(){
    var that = this
    if(!this.state.content){
      return Alert.alert('您有未填項')
    }
    fetch('http://127.0.0.1:3000/api/order/post/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        request: this.state.content
      })
    })
    .then((response) => response.json())
    .then(function(responseJson){
      if(responseJson.success){
        that.setState({content: '', modalVisible: false})
        that.props.alert()
      } else {
        Alert.alert('提交失败！请重试！')
      }
    })
    .catch((err) => {
        Alert.alert('網絡出錯，請重試！')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ActionButton 
          buttonColor="rgba(231,76,60,1)" 
          onPress={this._show.bind(this)}
          style={styles.container}
        />
        <Modal visible={this.state.modalVisible} 
          animationType={'slide'} 
          transparent ={true}
          onRequestClose={() => {}}>
          <View style={styles.modalPage}>
            <View style={styles.closeBTN}>
              <Icon name={'ios-close-outline'} size={60} color={'#fff'} onPress={this._close.bind(this)}></Icon>
            </View>
            <View style={styles.commentBox}>
              <View>          
                <TextInput
                  placeholder={'上不去网了/我需要10米网线...'}
                  placeholderTextColor={'#fff'}
                  style={styles.content}
                  multiline={true}
                  defaultValue={this.state.content}
                  onChangeText={(text) => { this.setState({content: text})}}
                />
                <TouchableOpacity style={styles.submit}><Text onPress={this._submit.bind(this)} style={styles.submitText}>提交</Text></TouchableOpacity>
              </View>
            </View>
            <View style={styles.footer}><Text style={styles.footertitle}>Powered by WUDI</Text></View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 50,
    bottom: 110
  },
  modalPage: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  closeBTN: {
    paddingLeft: width / 2 - 10,
    paddingTop: 20,
    paddingBottom: 12
  },
  commentBox: {
    marginTop: 5,
    marginBottom: 10,
    padding: 4,
    width: width
  },
  content: {
    padding: 10,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 4,
    fontSize: 20,
    height: 250
  },
  submit: {
    marginTop: 10,
    backgroundColor: '#dcdcdc',
    height: 50,
    marginLeft: 1,
    marginRight: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  submitText: {
    fontSize: 30,
    color: '#000',
    textAlign: 'center',
    paddingTop: 7
  },
  footertitle: {
    textAlign: 'center',
    fontSize: 10,
    color: '#fff',
  },
  footer: {
    position: 'absolute',
    paddingBottom: 10,
    right: 0,
    bottom: 0,
    width: width,
  },
})