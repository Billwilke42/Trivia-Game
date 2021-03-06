import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import AnswerModal from './AnswerModal';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore } from 'redux'

describe('AnswerModal', () => {

  const store = createStore(() => ({playerName: 'test', questions: []}))
  const question = {
    category: "Science & Nature",
    type: "multiple",
    difficulty: "hard",
    question: "What is considered the rarist form of color blindness?",
    correct_answer: "Blue",
    incorrect_answers: [
      "Red",
      "Green",
      "Purple"
    ]
  }

  it('should render a message and a button if correct and not on the last question', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Provider store={store}>
          <AnswerModal 
            correct={true}
            correctAnswer={question.correct_answer}
            incrementQuestion={jest.fn()}
            resetCurrentQuestion={jest.fn()}
            lives={3}
            answers={4}
          />
        </Provider>
      </BrowserRouter>
    )
    
    const message = getByText('Correct!')
    const button = getByRole('button', {name: 'Next Question'})
    
    expect(message).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should render a message and a button if correct and on the last question', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Provider store={store}>
          <AnswerModal 
            correct={true}
            correctAnswer={question.correct_answer}
            incrementQuestion={jest.fn()}
            resetCurrentQuestion={jest.fn()}
            lives={0}
            answers={4}
          />
        </Provider>
      </BrowserRouter>
    )
    
    const message = getByText('Correct!')
    const button = getByRole('button', {name: 'Game Over'})
    
    expect(message).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should render a message and a button if incorrect and not on the last question', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Provider store={store}>
          <AnswerModal 
            correct={false}
            correctAnswer={question.correct_answer}
            incrementQuestion={jest.fn()}
            resetCurrentQuestion={jest.fn()}
            lives={3}
            answers={4}
          />
        </Provider>
      </BrowserRouter>
    )
    
    const message = getByText('Incorrect', { exact: false })
    const button = getByRole('button', {name: 'Next Question'})
    
    expect(message).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should render a message and a button if correct', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Provider store={store}>
          <AnswerModal 
            correct={false}
            correctAnswer={question.correct_answer}
            incrementQuestion={jest.fn()}
            resetCurrentQuestion={jest.fn()}
            lives={0}
            answers={4}
          />
        </Provider>
      </BrowserRouter>
    )
    
    const message = getByText('Incorrect', { exact: false })
    const button = getByRole('button', {name: 'Game Over'})
    
    expect(message).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should fire event on click', () => {
    const mockIncrementQuestion = jest.fn()
    
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Provider store={store}>
          <AnswerModal 
            correct={true}
            correctAnswer={question.correct_answer}
            incrementQuestion={mockIncrementQuestion}
            resetCurrentQuestion={jest.fn()}
            lives={3}
            answers={4}
          />
        </Provider>
      </BrowserRouter>
    )
    
    const message = getByText('Correct!')
    const button = getByRole('button', {name: 'Next Question'})
    
    fireEvent.click(button)

    expect(mockIncrementQuestion).toHaveBeenCalledTimes(1)
  })

  it('should call the post function on click of the game over btn', () => {
    const mockPostScore = jest.fn()
    
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Provider store={store}>
          <AnswerModal 
            postScore={mockPostScore}
            correct={true}
            correctAnswer={question.correct_answer}
            incrementQuestion={jest.fn()}
            resetCurrentQuestion={jest.fn()}
            lives={0}
            answers={4}
          />
        </Provider>
      </BrowserRouter>
    )
    
    const button = getByRole('button', {name: 'Game Over'})
    fireEvent.click(button)
    
    expect(mockPostScore).toHaveBeenCalledTimes(1)
  })
})