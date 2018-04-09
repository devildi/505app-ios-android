import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'

const width = Dimensions.get('window').width

import Network from '../config/network'

export default class SimpleChart extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
      user: this.props.user,
      chang: true
    };
	}

  componentDidMount(){
  }

  _au(){
    const that = this
    Network.get('http://127.0.0.1:3000/api/admin/authorize',{id:this.state.user._id})
    .then(function(data){
      if (data) {
        that.props.sub()
        that.props.close()
        that.props.alert()
      } else {
        
      }
    })
    .catch((err) => {
        Alert.alert('網絡出錯，請重試！')
    })
  }

	render(){
		return(
			<View style={styles.container}>
				<View style={styles.ABox} >
	        <View style={styles.ALeft}><Text style={styles.ALeftText}>姓名：</Text></View>
	        <View style={styles.ARight}><Text style={styles.ALeftText}>{this.state.user.name}</Text></View>
	      </View>
	      <View style={styles.ABox} >
	        <View style={styles.ALeft}><Text style={styles.ALeftText}>电话：</Text></View>
	        <View style={styles.ARight}><Text style={styles.ALeftText}>{this.state.user.phoneNum}</Text></View>
	      </View>
	      <View style={styles.ABox} >
	        <View style={styles.ALeft}><Text style={styles.ALeftText}>部门：</Text></View>
	        <View style={styles.ARight}><Text style={styles.ALeftText}>{this.state.user.department}</Text></View>
	      </View>
	      <View style={styles.ABox} >
	        <View style={styles.ALeft}><Text style={styles.ALeftText}>工号：</Text></View>
	        <View style={styles.ARight}><Text style={styles.ALeftText}>{this.state.user.code}</Text></View>
	      </View>
	      {
	      	this.state.user.role == 0
  	      ?<TouchableOpacity onPress={this._au.bind(this)} style={styles.submit}><Text style={styles.submitText}>提升为管理员</Text></TouchableOpacity>
          : null
	      }
        {
          this.state.user.role == 0
          ?null
          :<View style={styles.footer}><Text style={styles.footertitle}>Powered by WUDI</Text></View>
        }
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ABox: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
    justifyContent: 'space-between'
  },
  ALeftText: {
    fontSize:20
  },
  header: {
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#f0f8ff',
  },
  headerTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  commentBox: {
    marginTop: 5,
    marginBottom: 10,
    padding: 4,
    width: width
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
  footertitle: {
    textAlign: 'center',
    fontSize: 10,
    color: '#000',
  },
  footer: {
    position: 'absolute',
    paddingBottom: 10,
    right: 0,
    bottom: 0,
    width: width,
  }
})