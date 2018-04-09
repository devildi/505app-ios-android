import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

export default class Header extends Component {
  constructor() {
    super()
    this.state = {
      right: 'right',
      title: 'LNTV运维中心'
    }
  }

  componentDidMount(){
    
  }

  _onSelect(){
    this.props.onSelect()
  }

  _back(){
    this.props.back()
  }

  render(){
    return( 
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{this.props.sub||this.state.title}</Text>
        {
          this.props.sub
          ?<View style={styles.headerleftBTN}><Icon name='ios-arrow-back' size={30} onPress={this._back.bind(this)}/></View>
          :null
        }
        <View style={styles.headerrightBTN}><Icon name='ios-menu' size={30} onPress={() => this._onSelect()}/></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 25,
    paddingBottom: 12,
    backgroundColor: '#ffd700',
  },
  headerTitle: {
    fontSize: 30,
    textAlign: 'center',
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
})