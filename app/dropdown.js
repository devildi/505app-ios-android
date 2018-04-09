import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native'

import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme'

const width = Dimensions.get('window').width

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canada: ''
    };
  }

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }

  
  _canada(province) {

  this.setState({
      ...this.state,
      canada: province
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Select
          width={width - 10}
          height={50}
          style={styles.content}
          ref="SELECT1"
          optionListRef={this._getOptionList.bind(this)}
          defaultValue="部门："
          onSelect={this._canada.bind(this)}>
          <Option value = {{id : "alberta"}}>Alberta</Option>
          <Option>British Columbia</Option>
          <Option>Manitoba</Option>
          <Option>New Brunswick</Option>
          <Option>Newfoundland and Labrador</Option>
          <Option>Northwest Territories</Option>
          <Option>Nova Scotia</Option>
          <Option>Nunavut</Option>
          <Option>Ontario</Option>
          <Option>Prince Edward Island</Option>
          <Option>Quebec</Option>
          <Option>Saskatchewan</Option>
          <Option>Yukon</Option>
        </Select>
        <Text>Selected Canada's province: {this.state.canada}</Text>
        <OptionList ref="OPTIONLIST"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  content: {
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  content1: {

  }
})