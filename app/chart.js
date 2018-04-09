import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native'

import Chart from 'react-native-chart'
import Network from '../config/network'

const width = Dimensions.get('window').width

class SimpleChart extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data: []
	  };
	}

	componentDidMount(){
		var that = this
		Network.get('http://127.0.0.1:3000/api/order/info', {id:1})
		.then(function(data){
			if (data) {
				that.setState({data: data.data})
			}
		})
		.catch((err) => {
      console.log(err)
    })
	}

	render(){
		return(
			<View>
				<View style={styles.header}><Text style={styles.headerTitle}>7日工单</Text></View>
				<View style={styles.container}>
					<Chart
						style={styles.chart}
						data={this.state.data}
						type="bar"
					/>
				</View>
			</View>
		)
	}
}

class SimpleChart1 extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data: []
	  };
	}

	componentDidMount(){
		var that = this
		Network.get('http://127.0.0.1:3000/api/order/infomore',{id:1})
		.then(function(data){
			if (data) {
				that.setState({data: data.data})
			}
		})
		.catch((err) => {
      console.log(err)
    })
	}

	render(){
		return(
			<View>
				<View style={styles.header}><Text style={styles.headerTitle}>本月工单分布</Text></View>
				<View style={styles.container}>
					<Chart
						style={[styles.chart,{height: width - 20}]}
						data={this.state.data}
						type="pie"
					/>
				</View>
				{
					this.state.data.map((i)=> (<View style={styles.ABox} key={i}>
	        <View style={styles.ALeft}><Text style={styles.ALeftText}>{i[0]}</Text></View>
	        <View style={styles.ARight}><Text style={styles.ALeftText}>工单数：{i[1]}</Text></View>
	      </View>))
				}
				
			</View>
		)
	}
}

export default class extends Component {
	render() {
		return (
			<ScrollView>
				<SimpleChart/>
				<SimpleChart1/>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
		paddingTop: 10
	},
	chart: {
		width: width,
		height: 200,
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
})