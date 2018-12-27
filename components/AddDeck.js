import React, { Component } from 'react';
import {Text, View, KeyboardAvoidingView, TouchableOpacity, StatusBar, } from 'react-native';
import { nameDeck } from '../data';
import Input from './Input';

export default class AddDeck extends Component {
  state = { 
    title: '' 
  };

 componentDidMount() {
    this._navListener = this.props.navigation.addListener('willFocus', () => {
      StatusBar.setBarStyle('dark-content');
      this.setState({ title: '' });
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  static navigationOptions = {
    headerTransparent: true,
    headerStyle: {
      borderBottomWidth: 0,
    },
  };

  submitDeck = async () => {
    // get the title of the new deck
    const deck = await nameDeck(this.state.title);
    //once new deck is added, navigate to detailed view of new deck
    this.props.navigation.navigate('SingleDeck', {
      deckTitle: deck.title,
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={{padding: 20, backgroundColor: 'white', flex: 1}} behavior="padding">
        <View>
          <Text style={{fontSize: 48, textAlign: 'center', color: 'blue'}}>
            Enter name of new deck:
          </Text>
        </View>
        <Input
          value={this.state.title}
          placeholder={'Deck Name'}
          // constantly update state of title as user edits field
          onChange={title => this.setState({ title })}
        />
        <View>
          <TouchableOpacity
            style={{alignItems: 'center', borderWidth: 2, borderRadius: 4, borderColor: 'green', margin: 5, padding: 10 }}
            onPress={() => this.submitDeck()}>
            <Text style={{fontSize: 24, textAlign: 'center'}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}