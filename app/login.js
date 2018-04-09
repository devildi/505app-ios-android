'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native'



const width = Dimensions.get('window').width

import Icon from 'react-native-vector-icons/Ionicons'
import Network from '../config/network'

export default class extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
      employeeID: null,
      code: null
    };
	}

	_back(){
    this.props.back()
  }

  _submit(){
    var that = this
    if(!this.state.employeeID || !this.state.code){
      return Alert.alert('您有未填項')
    } 
    fetch('http://127.0.0.1:3000/api/u/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employeeID: this.state.employeeID,
        code: this.state.code
      })
    })
    .then((response) => response.json())
    .then(function(responseJson){
      if(responseJson.user){
        that.props.hasLogged(responseJson.user)
      } else {
        Alert.alert('登录失败！请重试！')
      }
    })
    .catch((err) => {
        Alert.alert('網絡出錯，請重試！')
    })
  }

	render(){
		return(
			<TouchableOpacity activeOpacity={1} style={styles.container} onPress={this._back.bind(this)}>   
        <View style={styles.header}>
          <Text style={styles.headerTitle}>登錄</Text>
        </View>
        <View style={styles.commentBox}>
	        <View>          
						<TextInput
	            placeholder={'工號'}
              underlineColorAndroid="transparent"
	            placeholderTextColor={'#fff'}
	            style={styles.content}
	            defaultValue={this.state.employeeID}
	            onChangeText={(text) => {
	              this.setState({
	                employeeID: text
	              })
	            }}
	          />
	          <TextInput
	            placeholder={'密碼'}
	            placeholderTextColor={'#fff'}
              underlineColorAndroid="transparent"
	            style={styles.content}
	            defaultValue={this.state.code}
	            onChangeText={(text) => {
	              this.setState({
	                code: text
	              })
	            }}
	          />
	          <TouchableOpacity style={styles.submit}><Text style={styles.submitText} onPress={this._submit.bind(this)}>登錄</Text></TouchableOpacity>
	        </View>
	      </View>
	      <View style={styles.footer}><Text style={styles.footertitle}>Powered by WUDI</Text></View>
      </TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#29232C'
  },
  header: {
    paddingTop: 30,
    paddingBottom: 50,

  },
  headerTitle: {
    fontSize: 30,
    textAlign: 'center',
    color: '#fff'
  },
  submit: {
    marginTop: 20,
    backgroundColor: '#ffd700',
    height: 50,
    marginLeft: 1,
    marginRight: 1,
    borderWidth: 1,
    borderColor: '#352D37',
    borderRadius: 4,
  },
  submitText: {
    fontSize: 30,
    color: '#000',
    textAlign: 'center',
    paddingTop: 7
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
    borderWidth: 2,
    borderColor: '#352D37',
    backgroundColor: '#251F28',
    borderRadius: 4,
    fontSize: 20,
    height: 60,
    marginBottom: 5
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
  }
})