import React, { Component } from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import ListOfDecks from './components/ListOfDecks';
import SingleDeck from './components/SingleDeck';
import Quiz from './components/Quiz';
import { Ionicons } from '@expo/vector-icons';

const Tabs = TabNavigator(
  {
    ListOfDecks: {
      screen: ListOfDecks,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ focused }) => (
          <Ionicons name={focused ? 'ios-browsers' : 'ios-browsers-outline'} size={26}/>
        ),
      },
    },
    NewDecks: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add new deck',
        tabBarIcon: ({ focused }) => (
          <Ionicons name={focused ? 'ios-create' : 'ios-create-outline'}size={26} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'grey',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
  }
);

const RootStack = StackNavigator(
  {
    Home: {
      screen: Tabs,
    },
    SingleDeck: {
      screen: SingleDeck,
    },
    Quiz: {
      screen: Quiz,
    },
    AddCard: {
      screen: AddCard,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
