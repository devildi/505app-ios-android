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
import Markdown from 'react-native-simple-markdown'

const width = Dimensions.get('window').width

export default class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render(){
    return (
      <ScrollView style={styles.container}>
        <View style={styles.info}>
          <Markdown styles={markdownStyles}>
            #Markdown in react-native is so cool! {'\n\n'}
            You can **emphasize** what you want, or just _suggest it_ 😏…{'\n'}
            You can even [**link your website**](http://carlito.ninja) or if you prefer: [email somebody](mailto:email@somebody.com){'\n'}
            Spice it up with some GIFs 💃:
            ![Some GIF](https://media.giphy.com/media/dkGhBWE3SyzXW/giphy.gif){'\n'}
            And even add a cool video 😎!{'\n'}
          </Markdown>
        </View>
        <View style={styles.info}>
          <Markdown styles={markdownStyles}>
            #Markdown in react-native is so cool! {'\n\n'}
            You can **emphasize** what you want, or just _suggest it_ 😏…{'\n'}
            You can even [**link your website**](http://carlito.ninja) or if you prefer: [email somebody](mailto:email@somebody.com){'\n'}
            Spice it up with some GIFs 💃:
            ![Some GIF](https://media.giphy.com/media/dkGhBWE3SyzXW/giphy.gif){'\n'}
            And even add a cool video 😎!{'\n'}
          </Markdown>
        </View>
        <View style={styles.info}>
          <Markdown styles={markdownStyles}>
            #Markdown in react-native is so cool! {'\n\n'}
            You can **emphasize** what you want, or just _suggest it_ 😏…{'\n'}
            You can even [**link your website**](http://carlito.ninja) or if you prefer: [email somebody](mailto:email@somebody.com){'\n'}
            Spice it up with some GIFs 💃:
            ![Some GIF](https://media.giphy.com/media/dkGhBWE3SyzXW/giphy.gif){'\n'}
            And even add a cool video 😎!{'\n'}
          </Markdown>
        </View>
      </ScrollView>   
   )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInfo: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  info: {
    padding: 10,
    borderBottomWidth: 1
  }
})

const markdownStyles = {
  heading1: {
    fontSize: 24,
    color: 'purple',
    textAlign: 'center'
  },
  link: {
    color: 'pink',
  },
  mailTo: {
    color: 'orange',
  },
  text: {
    color: '#000000',
    padding: 5
  },
}