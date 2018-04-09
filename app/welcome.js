import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Dimensions,
  Modal,
  TouchableOpacity
} from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/Ionicons'
import Video from 'react-native-video'
import Config from '../config/config'

import Signup from './signup'
import Login from './login'

export default class welcome extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      modalVisible: false,
      com: null
    };
  }

  _onSelect(state){
    this.setState({
      modalVisible: true,
      com: state
    })
  }

  _back(){
    this.setState({modalVisible: false})
  }

  _onError(err){
    console.log(err)
  }

  hasLogged(obj){
    this.props.hasLogged(obj)
  }

  render(){
    return(
      <View style={styles.container}>
        <Video 
          source={require('../assets/background.mp4')}   // Can be a URL or a local file.
          resizeMode="cover"             // Fill the whole screen at aspect ratio.
          repeat={true}                // Repeat forever.        
          style={styles.backgroundVideo}
        />
        <View style={styles.swiper}>
          <Swiper style={styles.wrapper} autoplay={true}>
            <View style={styles.slide1}>
              <Text style={styles.text}>Hello</Text>
            </View>
            <View style={styles.slide1}>
              <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide1}>
              <Text style={styles.text}>And simple</Text>
            </View>
          </Swiper>
        </View>
        <View style={styles.welBTN}>
          <TouchableOpacity style={[styles.btnItem,styles.btnItemBorder]} onPress={() => this._onSelect('Signup')}><Text style={styles.itemText}>註冊</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btnItem} onPress={() => this._onSelect('Login')}><Text style={styles.itemText}>登錄</Text></TouchableOpacity>
        </View>
        <Modal
          visible={this.state.modalVisible}
          animationType={'slide'}
          transparent ={true}
          onRequestClose={() => {}}
        >
          {
            this.state.com === 'Signup'
            ?<Signup back={this._back.bind(this)} hasLogged={this.hasLogged.bind(this)}/>
            :<Login back={this._back.bind(this)} hasLogged={this.hasLogged.bind(this)}/>
          }
        </Modal>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  welBTN: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: width,
    height: 55,
    flexDirection: 'row',
    backgroundColor: '#ffd700'
  },
  btnItem: {
    paddingTop: 11,
    width: width * 0.5 -1,
    height: 55,
  },
  btnItemBorder: {
    borderRightWidth: 2,
    borderRightColor: '#daa520'
  },
  itemText: {
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  swiper: {
    position: 'absolute',
    left: 0,
    bottom: 55,
    width: width
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})