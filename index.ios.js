import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Dimensions,
  Navigator,
  AlertIOS,
  TouchableOpacity
} from 'react-native'

const width = Dimensions.get('window').width

import Icon from 'react-native-vector-icons/Ionicons'
import SideMenu from 'react-native-side-menu'
import DropdownAlert from 'react-native-dropdownalert'

import Welcome from './app/welcome'
import Intro from './app/intro'
import Chart from './app/chart'
import User from './app/user'
import Act from './app/act'
import ActA from './app/actA'
import Header from './app/header'

import Userlist from './app/userlist'
import Orderlist from './app/orderlist'

import Orderdetail from './app/orderdetail'
import Userdetail from './app/userdetail'


class Super extends Component {
  constructor(props) {
    super(props)
  
    this.state = {}
  }

  _loadPage(str1,str2,component){
    this.props.navigator.push({
      component: component,
      params:{
        id: str1,
        title: str2
      }
    })
  }

  _openDrawer(){
    this.props.onSelect()
  }

  render(){
    return(
      <View style={styles.container}>
        <Header onSelect={this._openDrawer.bind(this)}/>
        <Chart/>
        <ActA on={this._loadPage.bind(this)}/>
      </View>
    )
  }
}

export default class AwesomeProject extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      user: null,
      menuPosition: 'right',
      isOpen: false
    }
  }

  _openDrawer(){
    this.setState({isOpen: true})
  }

  hasLogged(obj){
    if(obj){
      console.log(obj)
      AsyncStorage.setItem('user', JSON.stringify(obj))
      this.setState({
        user: obj,
        logged: true
      })
    } else {
      AsyncStorage.clear()
      this.setState({
        user: null
      })
    }
  }

  componentDidMount(){
    const that = this
    AsyncStorage.getItem("user")
    .then((data)=> JSON.parse(data))
    .then(function(obj){
      that.setState({
         user: obj
       })
    })
  }

  _alert(){
    this.dropdown.alertWithType('success', '提交成功', '联系电话：6870')
  }

  render() {
    if(!this.state.user){
      return <Welcome hasLogged={this.hasLogged.bind(this)}/>
    }
    return (
      <SideMenu 
        bounceBackOnOverdraw={false}
        menuPosition={this.state.menuPosition}
        isOpen={this.state.isOpen}
        openMenuOffset={width}
        menu={<User user={this.state.user} hasLogged={this.hasLogged.bind(this)} closeDrawer={() => {this.setState({isOpen: false})}}/>}
        style={{flex: 1}}
      >
        <View style={styles.container}>
          {
            this.state.user.role == 0
            ?<View style={styles.container}>
              <Header onSelect={this._openDrawer.bind(this)}/>
              <Intro />
              <Act alert={this._alert.bind(this)}/>
              <DropdownAlert ref={(ref) => this.dropdown = ref} />
            </View>
            :<Navigator
              initialRoute={{ name: 'Super', component: Super }}
              configureScene={(route) => {
                return Navigator.SceneConfigs.FloatFromRight
              }}
              renderScene={(route, navigator) => {
                let Component = route.component
                return <Component {...route.params} navigator={navigator} onSelect={this._openDrawer.bind(this)}/>
              }} 
            />
          }
        </View>
      </SideMenu>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
})

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
