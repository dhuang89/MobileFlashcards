import React, { Component } from 'react';
import {TouchableOpacity, StatusBar, FlatList, Text, View } from 'react-native';
import { listOfDecks } from '../data';

export default class ListOfDecks extends Component {
  state = {
    decks: [],
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('willFocus', () => {
      StatusBar.setBarStyle('light-content');
      listOfDecks().then(decks => this.setState({ decks }));
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

  // check state of decks, if decks exist display them
  // if no decks exist, display other div
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        {this.state.decks ? (
          <View style={{ padding: 20, backgroundColor: 'white', flex: 1 }}>
            <FlatList
              horizontal
              data={this.state.decks}
              keyExtractor={item => item.title}
              renderItem={({ item }) => (
                <View
                  style={{
                    padding: 20,
                    margin: 15,
                    justifyContent: 'center',
                    elevation: 10,
                    width: 275,
                    backgroundColor: 'white',
                    borderRadius: 16,
                    shadowColor: 'black',
                    shadowRadius: 4,
                    shadowOpacity: 0.6
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('SingleDeck', {
                        deckTitle: item.title,
                      })
                    }>
                    <Text
                      style={{
                        fontSize: 48,
                        textAlign: 'center',
                        color: 'blue',
                      }}>
                      {item.title}
                    </Text>
                    <Text style={{ fontSize: 24, textAlign: 'center' }}>
                      {item.cardCount} cards
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        ) : (
          <View style={{ padding: 20, backgroundColor: 'white', flex: 1 }}>
            <Text style={{ fontSize: 24, textAlign: 'center' }}>
              No decks exist!
            </Text>
          </View>
        )}
      </View>
    );
  }
}
