import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native'

const width = Dimensions.get('window').width

import Userlist from './userlist'
import Orderlist from './orderlist'

import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'

export default class App extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

  _choose(str1,str2,obj){
    this.props.on(str1,str2,obj)
  }

  render() {
    return (
      <View style={styles.container}>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item style={styles.actionButtonItem} buttonColor='#9b59b6' title="今日未完成" onPress={() => {this._choose('1','今日未完成',Orderlist)}}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item style={styles.actionButtonItem} buttonColor='#3498db' title="今日已完成" onPress={() => {this._choose('2','今日已完成',Orderlist)}}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item style={styles.actionButtonItem} buttonColor='#1abc9c' title="全部工单" onPress={() => {this._choose('3','全部工单',Orderlist)}}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item style={styles.actionButtonItem} buttonColor='#8fbc8f' title="普通用户" onPress={() => {this._choose('1','普通用户',Userlist)}}>
            <Icon name="ios-person-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item style={styles.actionButtonItem} buttonColor='#6495ed' title="管理员用户" onPress={() => {this._choose('2','管理员用户',Userlist)}}>
            <Icon name="ios-body" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },
  actionButtonItem: {
  	position: 'absolute',
  	left: 0
  }
});