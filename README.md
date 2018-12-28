# Mobile Flashcards

This project is for the Udacity React course. This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app). To run the app, clone the repo, navigate to directory, then run ```npm install```. Once finished, enter ```npm start```. 

## Application Overview
The app allows the user to create flash cards and quiz themselves. Each flash card contains a question and a button to show the correct answer. Once the correct answer is shown, the user selects either the Correct or Incorrect button depending on whether they answered correctly. The next question is then shown. At the end, a score is calculated by adding up the total number of questions correctly answered. The user can then try the quiz again or go back to the deck. 

The first page the user will see will contain a list of flash card decks. If there are multiple decks, the user can change between decks by swiping horizontally. To create decks, the user can navigate to the "Add new deck" item on the bottom navigation bar. This takes the user to a new screen where they can enter the name of the new deck. The user can create multiple decks of flash cards. This allows the user to have cards for different categories. Each deck will allow the user to add cards to it.  

Adding a card takes the user to a new screen where they can enter the question and answer. Once submitted, the card is attached to the deck, and the total number of cards in the deck is incremented. The user can see the cards by taking a Quiz on a deck. At first, the answer is hidden, allowing the user to think of an answer first. Once the user clicks the "Reveal Answer" button, the answer is shown. 

## Testing
This app was developed and tested in [Expo Snack](https://snack.expo.io/). The app was tested on both iOS and Android to ensure proper functionality. 
