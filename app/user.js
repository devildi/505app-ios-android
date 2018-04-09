import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ListView,
  Image,
  Modal,
  Navigator,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'

const width = Dimensions.get('window').width

import Network from '../config/network'

import Icon from 'react-native-vector-icons/Ionicons'
import DropdownAlert from 'react-native-dropdownalert'

import Config from '../config/config'
import DropdownMenu from './dropdown'

class User extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      user: this.props.user,
      phoneNum: '',
      address: '',
      department: ''
    };
  }

  _alert(){
    this.dropdown.alertWithType('success', '更新用户信息成功', '更新用户信息成功')
  }

  _logout(){
    const that = this
    Network.get('http://127.0.0.1:3000/api/u/logout')
    .then(function(res){
      if(res.logout){
        that.props.hasLogged()
      } else{
        Alert.alert('登出失败，请重试！')
      }
    })
    .catch(function(err){
      console.log(err)
    })
  }

  _submit(){
    var that = this
    if(!this.state.phoneNum || !this.state.address || !this.state.department){
      return Alert.alert('您有未填項')
    } 
    fetch('http://127.0.0.1:3000/api/user/update/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNum: this.state.phoneNum,
        address: this.state.address,
        department: this.state.department
      })
    })
    .then((response) => response.json())
    .then(function(responseJson){
      console.log(responseJson.user)
      if(responseJson.user){
        that.props.hasLogged(responseJson.user)
        that.setState({
          user: responseJson.user,
          phoneNum: '',
          address: '',
          department: ''
        })
        that._alert()
      } else {
        Alert.alert('更新失败！请重试！')
      }
    })
    .catch((err) => {
        Alert.alert('網絡出錯，請重試！')
    })
  }

  render(){
    return( 
      <View style={styles.container}>
        <View style={styles.headerBox}>
          <View style={styles.header}>
            <View style={styles.headerleftBTN}><Icon name='ios-arrow-back' size={30} onPress={this.props.closeDrawer}/></View>
            <View style={styles.headerrightBTN}><Text style={styles.logout} onPress={this._logout.bind(this)}>退出登錄</Text></View>
          </View>
          <View style={styles.headerAvatar}>
            <View style={styles.avatar}>
              <Image source={{uri: Config.backgroundSRC}} style={styles.avatar}/>
            </View>
          </View>
          <View style={styles.headerTitle}>
            <Text style={styles.title}>{this.state.user.name}</Text>
            <Text style={styles.title}>{this.state.user.employeeID}</Text>
          </View>
        </View>
        <View style={styles.commentBox}>
          <View style={styles.header1}><Text style={styles.headerTitle1}>{this.state.title}</Text></View>
          <TextInput
            placeholder={'联系电话：'+this.state.user.phoneNum}
            placeholderTextColor={'#a9a9a9'}
            style={styles.content}
            underlineColorAndroid="transparent"
            defaultValue={this.state.phoneNum}
            onChangeText={(text) => {
              this.setState({
                phoneNum: text
              })
            }}
          />
          <TextInput
            placeholder={'办公地址：'+this.state.user.address}
            placeholderTextColor={'#a9a9a9'}
            underlineColorAndroid="transparent"
            style={styles.content}
            defaultValue={this.state.address}
            onChangeText={(text) => {
              this.setState({
                address: text
              })
            }}
          />
          <TextInput
            placeholder={'部门：'+this.state.user.department}
            underlineColorAndroid="transparent"
            placeholderTextColor={'#a9a9a9'}
            style={styles.content}
            defaultValue={this.state.department}
            onChangeText={(text) => {
              this.setState({
                department: text
              })
            }}
          />
        </View>
        <TouchableOpacity style={styles.submit} onPress={this._submit.bind(this)}><Text style={styles.submitText}>保存修改</Text></TouchableOpacity>
        <DropdownAlert ref={(ref) => this.dropdown = ref} />
      </View>
    )
  }
}

export default class extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      user: this.props.user
    };
  }

  hasLogged(obj){
    this.props.hasLogged(obj)
  }

	render(){
    return( 
      <Navigator
        initialRoute={{ name: 'User', component: User }}
        configureScene={(route) => {
          return Navigator.SceneConfigs.FloatFromBottom
        }}
        renderScene={(route, navigator) => {
          let Component = route.component
          return <Component {...route.params} hasLogged={this.hasLogged.bind(this)} user={this.state.user} navigator={navigator} closeDrawer={this.props.closeDrawer}/>
        }} 
      />
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  headerBox: {
  	height: 300,
  	backgroundColor: '#ee735c',
  },
  header: {
    paddingTop: 25,
    paddingBottom: 12,
  },
  headerleftBTN: {
    position: 'absolute',
    left: 20,
    top: 30,
  },
  headerrightBTN: {
    position: 'absolute',
    right: 20,
    top: 30,
  },
  logout: {
    fontSize: 20,
    marginTop: 7
  },
  userPageBody: {
  	flex: 1
  },
  headerAvatar: {
  	marginTop: 30,
  	flexDirection: 'row',
  	justifyContent: 'center'
  },
  avatar: {
  	height: 140,
  	width: 140,
  	borderRadius: 70
  },
  headerTitle: {
  	flex: 1,
  	marginBottom: 5,
  },
  title: {
  	textAlign: 'center',
  	color: '#fff',
  	fontSize: 25,
  	paddingTop: 10
  },
  submit: {
    marginTop: 20,
    backgroundColor: '#ffd700',
    height: 50,
    marginLeft: 1,
    marginRight: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    position: 'absolute',
    right: 2,
    left: 2,
    bottom: 5
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
    width: width,
  },
  content: {
    padding: 10,
    color: '#000',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 4,
    fontSize: 20,
    height: 50,
    marginBottom: 5
  },
  content1: {
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#dcdcdc',
  }
})