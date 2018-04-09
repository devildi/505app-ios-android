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
var moment = require('moment')

export default class SimpleChart extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
      order: this.props.order,
      user: this.props.order.user,
      content: ''
    };
	}

  _finish(){
    const that = this
    fetch('http://127.0.0.1:3000/api/order/finish/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        response: that.state.content,
        orderId: that.state.order._id
      })
    })
    .then((response) => response.json())
    .then(function(responseJson){
      if(responseJson.success){
        that.props.sub()
        that.props.close()
        that.props.alert()
      } else {
        Alert.alert('提交失败，请重试！')
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
	        <View style={styles.ALeft}><Text style={styles.ALeftText}>申请人：</Text></View>
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
	      <View style={styles.ABox} >
	        <View style={styles.ALeft}><Text style={styles.ALeftText}>申请时间：</Text></View>
	        <View style={styles.ARight}><Text style={styles.ALeftText}>{moment(this.state.order.meta.createAt).format('YYYY-MM-DD HH:mm:ss')}</Text></View>
	      </View>
	      {
	      	this.state.order.completedorNot == 1
	      ?<View>
        <View style={styles.ABox} >
	        <View style={styles.ALeft}><Text style={styles.ALeftText}>完成时间：</Text></View>
	        <View style={styles.ARight}><Text style={styles.ALeftText}>{moment(this.state.order.meta.updateAt).format('YYYY-MM-DD HH:mm:ss')}</Text></View>
	      </View>
        <View style={styles.ABox} >
          <View style={styles.ALeft}><Text style={styles.ALeftText}>处理人：</Text></View>
          <View style={styles.ARight}><Text style={styles.ALeftText}>{this.state.order.serviceguy}</Text></View>
        </View>
        </View>
	      : null
	      }
	      <View style={styles.ABox} >
	        <View style={styles.ALeft}><Text style={styles.ALeftText}>需求：</Text></View>
	        <View style={styles.ARight}><Text style={styles.ALeftText}>{this.state.order.request}</Text></View>
	      </View>
	      {
	      	this.state.order.completedorNot !== 1
	      ?<View style={styles.commentBox}>
          <TextInput
            placeholder={'上不去网了/我需要10米网线...'}
            placeholderTextColor={'#a9a9a9'}
            style={styles.content}
            multiline={true}
            defaultValue={this.state.content}
            onChangeText={(text) => { this.setState({content: text})}}
          />
        </View>
        :<View style={styles.ABox} >
          <View style={styles.ALeft}><Text style={styles.ALeftText}>处理过程：</Text></View>
          <View style={styles.ARight}><Text style={styles.ALeftText}>{this.state.order.response}</Text></View>
        </View>
	      }
	      {
          this.state.order.completedorNot !== 1
        ?<TouchableOpacity style={styles.submit} onPress={this._finish.bind(this)}><Text style={styles.submitText}>完成维修</Text></TouchableOpacity>
        :null
        }
        {
          this.state.order.completedorNot == 1
          ?<View style={styles.footer}><Text style={styles.footertitle}>Powered by WUDI</Text></View>
          :null
        }
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  content: {
    padding: 10,
    color: '#000',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 4,
    fontSize: 20,
    height: 150
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