import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputNumberButton from './components/InputNumberButton';

const App  = props => {
  const initialState = {
      displayValue: '0',
      operator: null,
      firstValue: '',
      secondValue: '',
      nextValue: false
  }

  const [state, setState] = useState(initialState)

  const renderButtons = () => {
    let layouts = buttons.map((buttonRow, rowIndex) => {
      let rowItem = buttonRow.map((buttonItem, buttonIndex) => {
        return <InputNumberButton value={buttonItem} handleOnPress={handleInput.bind(this, buttonItem)} key={'btn-' + buttonIndex} />
      })
      return <View style={styles.inputRow} key={'row-' + rowIndex}>{rowItem}</View>
    })

    return layouts;
  }

  const handleInput = input => {
    const { displayValue, operator, firstValue, secondValue, nextValue } = state;

    switch(input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        let display = (displayValue === '0') ? input : displayValue + input;
        let firstVal = firstValue;
        let secondVal = secondValue;

        if (!nextValue) {
          firstVal = firstValue + input
        } else {
          secondVal = secondValue + input;
        }

        setState({
          ...state,
          displayValue: display,
          firstValue: firstVal,
          secondValue: secondVal
        })
        break;
      case '+':
      case '-':
      case 'x':
      case '/':
        setState({
          ...state,
          nextValue: true,
          operator: input,
          displayValue: (operator !== null ? displayValue.substr(0, displayValue.length -1) : displayValue) + input
        }); 
        break;       
      case '.':
        let dot = displayValue.toString().slice(-1);

        display = dot !== '.' ? displayValue + input : displayValue
        if (!nextValue) {
          firstVal= firstValue + input
        } else {
          secondVal = secondValue + input
        }

        setState({
          ...state,
          displayValue: display,
          firstValue: firstVal,
          secondValue: secondVal
        })
        break;  
      case 'CLEAR': 
        setState(initialState);
        break;
      case 'DEL':
        let string = displayValue.toString();
        let deletedString = string.substr(0, string.length - 1);
        let length = string.length;

        setState({
          ...state,
          displayValue: length == 1 ? '0' : deletedString,
          firstValue: length == 1 ? '0' : deletedString
        });
        break;    
      case '=':
        let formatOperator = operator == 'x' ? '*' : operator;
        let result = (firstValue + formatOperator + secondValue);

        setState({
          displayValue: result % 1 === 0 ? result : result.toFixed(2),
          firstValue: result % 1 === 0 ? result : result.toFixed(2),
          secondValue: '',
          nextValue: false,
          operator: null
        });
        break;  
    }
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.inputText}>{state.displayValue}</Text>
      </View> 
      <View style={styles.inputContainer}>
        {renderButtons()}
      </View>
    </View>
  );
}

const buttons = [
  ['CLEAR', 'DEL'],
  ['7', '8', '9', '/'],
  ['4', '5', '6', 'x'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+']
]

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  resultContainer: {
    flex: 2,
    backgroundColor: '#1E1240'
  },
  inputContainer: {
    flex: 8,
    justifyContent: 'center',
    backgroundColor: '#3D0075'
  },
  inputText: {
    color: '#fff',
    fontSize: 80,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'right'
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',    
  }
});

export default App;