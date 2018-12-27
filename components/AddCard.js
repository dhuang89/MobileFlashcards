import React, { Component } from 'react';
import { Text, KeyboardAvoidingView, View, TouchableOpacity } from 'react-native';
import { addNewCard } from '../data';
import Input from './Input';

export default class AddCard extends Component {
  // default fields to blank
  state = {
    card: {
      question: '',
      answer: '',
    },
  };

  static navigationOptions = ({ navigation }) => {
    const deck = navigation.getParam('deckTitle', 'Deck');
    return {
      title: deck,
    };
  };

  // retrieve deck by title then add card to deck
  // add card is called from data
  addCard = async () => {
    const deckTitle = this.props.navigation.getParam('deckTitle', 'Deck');
    if (deckTitle) {
      await addNewCard({ title: deckTitle, card: this.state.card });
    }
    this.props.navigation.goBack();
  };

  render() {
    return (
      <KeyboardAvoidingView style={{padding: 20, backgroundColor: 'white', flex: 1}} behavior="padding">
        <View>
          <Text style={{fontSize: 48, textAlign: 'center', color: 'blue'}}>Add a card</Text>
        </View>
        <View>
          <Input
            onChange={question =>
              this.setState(prevState => ({
                card: { ...prevState.card, question },
              }))
            }
            value={this.state.card.question}
            placeholder={'Question'}
          />
          <Input
            onChange={answer =>
              this.setState(prevState => ({
                card: { ...prevState.card, answer },
              }))
            }
            value={this.state.card.answer}
            placeholder={'Answer'}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{alignItems: 'center', borderWidth: 2, borderRadius: 4, borderColor: 'green', margin: 5, padding: 10 }}
            onPress={() => this.addCard()}>
            <Text style={{fontSize: 24, textAlign: 'center'}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}