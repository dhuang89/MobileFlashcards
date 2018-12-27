import { AsyncStorage } from 'react-native';
import { displayNotification, scheduleNotification } from './PushNotification';

// called when user is done with a quiz, used to display notification
export async function finishStudying (title) {
  try {
    await AsyncStorage.mergeItem(
      LAST_STUDY_SESSION,
      // get the date to display notification to remind user to study son
      JSON.stringify({
        deck: title,
        date: new Date(),
      })
    );
    AsyncStorage.getItem(LAST_STUDY_SESSION)
      .then(JSON.parse)
      .then(session => {
        displayNotification(
          "We will remind you when to study again"
        );

        let time = new Date(session.date);
        // for testing purposes, notification is displayed after 5 seconds
        time.setSeconds(time.getSeconds() + 5); 
        scheduleNotification(time, 'day');
      });
  } catch (error) {
    console.log(error);
  }
}

// constants are used for functions below, avoids spelling errors 
const DECKS_KEY = 'DECKS_KEY';
const LAST_STUDY_SESSION = 'LAST_STUDY_SESSION';

// saves the name of the new deck
export async function nameDeck(title) {
  try {
    await AsyncStorage.mergeItem(
      DECKS_KEY,
      // creates new deck, starts off with no questions and 0 cards
      JSON.stringify({
        [title]: {
          title,
          questions: [],
          cardCount: 0,
        },
      })
    );
    const decks = await AsyncStorage.getItem(DECKS_KEY);
    return JSON.parse(decks)[title];
  } catch (error) {
    console.log(error);
  }
}

// adds new card to a specified deck
export async function addNewCard({ title, card }) {
  try {
    // first retrieve the deck by name
    const decks = await AsyncStorage.getItem(DECKS_KEY);
    // if deck is null, throw an error
    if (decks !== null) {
      let deck = JSON.parse(decks)[title];
      const cardCount = deck.questions.length;
      return await AsyncStorage.mergeItem(
        DECKS_KEY,
        // add data to deck, such as question on the new card
        // increment the deck length by 1
        JSON.stringify({
          [title]: {
            title,
            questions: [...deck.questions, { ...card }],
            cardCount: cardCount + 1,
          },
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

// returns all of the current decks that exist
export function listOfDecks() {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(decks => {
      return decks ? Object.values(JSON.parse(decks)) : JSON.parse(decks);
    })
    .catch(err => Promise.reject(err));
}

// returns a single deck 
export function singleDeck(id) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(decks => {
      return JSON.parse(decks)[id];
    })
    .catch(err => Promise.reject(err));
}