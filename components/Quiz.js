import React, { Component } from 'react';
import {Text, View, TouchableOpacity, Animated, Platform} from 'react-native';
import { singleDeck, finishStudying } from '../data';
import { BlurView } from 'expo';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default class Quiz extends Component {
  state = {
    intensity: new Animated.Value(100),
    answerShown: false,
    deck: {
      title: '',
      questions: [],
      cardCount: 0,
    },
    points: 0,
    currentQuestion: {
      position: 0,
    },
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('willFocus', () => {
      const deckTitle = this.props.navigation.getParam('deckTitle', 'Deck');
      if (deckTitle) {
        singleDeck(deckTitle).then(deck =>
          this.setState({
            deck,
            currentQuestion: { position: 0, ...deck.questions[0] },
          })
        );
      }
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  static navigationOptions = {
    title: 'Quiz',
  };

  // called when user has finished quiz
  async componentDidUpdate() {
    if (this.state.endReached) {
      await finishStudying(this.state.deck.title);
    }
  }

  // called when user wants to show answer to question
  reveal = () => {
    this.showAnimation();
    this.setState({ answerShown: true });
  };

  // gives feedback to user interaction
  showAnimation = () => {
    let { intensity } = this.state;
    Animated.timing(intensity, { duration: 2500, toValue: 0 }).start();
  };

  // when user is done with quiz, go back to single deck view
  deckView = () => {
    this.props.navigation.goBack();
  };

  // when user is done with current card, proceed to next
  // also keeps track of how many cards are correct / wrong to calculate score at the end
  nextCard = correct => {
    this.setState(({ currentQuestion, deck, points }) => {
      const position = currentQuestion.position + 1;
      const newPoints = correct ? points + 1 : points;
      if (deck.cardCount === position) {
        return {
          points: newPoints,
          endReached: true,
        };
      }
      return {
        intensity: new Animated.Value(100),
        points: newPoints,
        answerShown: false,
        currentQuestion: {
          position: position,
          ...deck.questions[position],
        },
      };
    });
  };

  // user can try the quiz again, reset quiz
  startAgain = () => {
    this.setState(({ deck }) => ({
      answerShown: false,
      points: 0,
      endReached: false,
      currentQuestion: { position: 0, ...deck.questions[0] },
    }));
  };

  render() {
    const {
      deck,
      currentQuestion,
      answerShown,
      endReached,
      points,
    } = this.state;

    const currentPosition =
      deck && currentQuestion
        ? `${currentQuestion.position + 1}/${deck.cardCount}`
        : '';
  // calculate score and display it to user
  // allow user to retake quiz or go back to deck view
    return endReached ? (
      <View style={{ padding: 20, backgroundColor: 'white', flex: 1 }}>
        <Text style={{ fontSize: 48, textAlign: 'center', color: 'blue' }}>
          {`You have finished the quiz! You got ${points} questions right!`}
        </Text>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            borderWidth: 2,
            borderRadius: 4,
            borderColor: 'green',
            margin: 5,
            padding: 10,
          }}
          onPress={() => this.startAgain()}>
          <Text style={{ fontSize: 24, textAlign: 'center' }}>Try again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            borderWidth: 2,
            borderRadius: 4,
            borderColor: 'red',
            margin: 5,
            padding: 10,
          }}
          onPress={() => this.deckView(false)}>
          <Text style={{ fontSize: 24, textAlign: 'center' }}>End quiz</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={{ padding: 20, backgroundColor: 'white', flex: 1 }}>
        <Text style={{ fontSize: 24, textAlign: 'center' }}>
          {currentPosition} cards
        </Text>
        <Text style={{ fontSize: 24, textAlign: 'center' }}>
          {currentQuestion && currentQuestion.question}
        </Text>
        <View style={{ opacity: answerShown ? 1 : 0 }}>
          <Text style={{ fontSize: 24, textAlign: 'center' }}>
            {currentQuestion && currentQuestion.answer}
          </Text>
        </View>
        // if answer is shown, show these views // shows the right answer and
        allows the user to mark whether they got the question right or wrong
        {answerShown ? (
          <View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                borderWidth: 2,
                borderRadius: 4,
                borderColor: 'green',
                margin: 5,
                padding: 10,
              }}
              onPress={() => this.nextCard(true)}>
              <Text style={{ fontSize: 24, textAlign: 'center' }}>Correct</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: 'center',
                borderWidth: 2,
                borderRadius: 4,
                borderColor: 'red',
                margin: 5,
                padding: 10,
              }}
              onPress={() => this.nextCard(false)}>
              <Text style={{ fontSize: 24, textAlign: 'center' }}>
                Incorrect
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                borderWidth: 2,
                borderRadius: 4,
                borderColor: 'green',
                margin: 5,
                padding: 10,
              }}
              onPress={() => this.reveal()}>
              <Text style={{ fontSize: 24, textAlign: 'center' }}>
                Reveal Answer
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
