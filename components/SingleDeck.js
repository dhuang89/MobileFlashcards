import React, { Component } from 'react';
import { singleDeck } from '../data';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

export default class SingleDeck extends Component {
  // defaults to blank deck
  state = {
    deck: {},
  };

// sets state to current deck 
// if no decks exist, nothing is changed
componentDidMount() {
    this._navListener = this.props.navigation.addListener('willFocus', () => {
      const deckTitle = this.props.navigation.getParam('deckTitle', 'Deck');
      if (deckTitle) {
        singleDeck(deckTitle).then(deck => this.setState({ deck }));
      }
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  static navigationOptions = ({ navigation }) => {
    const deck = navigation.getParam('deckTitle', 'Deck');
    return {
      title: deck,
    };
  };

  render() {
    const { deck } = this.state;
    
    return (
      <View style={{padding: 20, backgroundColor: 'white', flex: 1}}>
        <View>
          <Text style={{fontSize: 72, textAlign: 'center', color: 'blue'}}>{deck.title}</Text>
          <Text style={{fontSize: 36, textAlign: 'center'}}>{deck.cardCount} cards</Text>
        </View>
        <View>
          <TouchableOpacity
            style={{alignItems: 'center', borderWidth: 2, borderRadius: 4, borderColor: 'green', margin: 5, padding: 10 }}
            onPress={() =>
              this.props.navigation.navigate('AddCard', {
                deckTitle: deck.title,
              })
            }>
            <Text style={{fontSize: 24, textAlign: 'center'}}>Add a card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignItems: 'center', borderWidth: 2, borderRadius: 4,borderColor: 'red', margin: 5, padding: 10}}
            onPress={() =>
              this.props.navigation.navigate('Quiz', {
                deckTitle: deck.title,
              })
            }>
            <Text style={{fontSize: 24, textAlign: 'center'}}>Begin quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}