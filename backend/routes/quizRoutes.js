const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Sample MCQ questions for C++
const cppQuestions = [
  {
    id: 1,
    text: "What is the correct way to declare a pointer in C++?",
    answers: [
      { key: 'a', text: 'int *ptr;' },
      { key: 'b', text: 'int ptr*;' },
      { key: 'c', text: 'pointer int ptr;' },
      { key: 'd', text: 'int ptr = &;' }
    ],
    correct: 'a',
    explanation: 'The correct syntax is "int *ptr;" where the asterisk (*) indicates that ptr is a pointer to an integer.'
  },
  {
    id: 2,
    text: "Which of the following is used to allocate memory dynamically in C++?",
    answers: [
      { key: 'a', text: 'malloc()' },
      { key: 'b', text: 'new' },
      { key: 'c', text: 'calloc()' },
      { key: 'd', text: 'All of the above' }
    ],
    correct: 'd',
    explanation: 'All three can be used for dynamic memory allocation, though "new" is the C++ way and preferred.'
  },
  {
    id: 3,
    text: "What is the output of: cout << sizeof('a');",
    answers: [
      { key: 'a', text: '1' },
      { key: 'b', text: '2' },
      { key: 'c', text: '4' },
      { key: 'd', text: 'Depends on compiler' }
    ],
    correct: 'a',
    explanation: 'In C++, a character literal is of type char, which is 1 byte in size.'
  },
  {
    id: 4,
    text: "Which keyword is used to prevent inheritance of a class?",
    answers: [
      { key: 'a', text: 'private' },
      { key: 'b', text: 'final' },
      { key: 'c', text: 'sealed' },
      { key: 'd', text: 'C++ does not support this' }
    ],
    correct: 'd',
    explanation: 'C++ does not have a built-in keyword to prevent inheritance. You can achieve this by making constructors private or using final (C++11).'
  },
  {
    id: 5,
    text: "What is the purpose of virtual functions in C++?",
    answers: [
      { key: 'a', text: 'To make functions faster' },
      { key: 'b', text: 'To enable runtime polymorphism' },
      { key: 'c', text: 'To save memory' },
      { key: 'd', text: 'To prevent function overriding' }
    ],
    correct: 'b',
    explanation: 'Virtual functions enable runtime polymorphism by allowing the correct function to be called based on the actual object type.'
  }
];

let currentQuestionIndex = 0;

// Get next question
router.get('/next', auth, (req, res) => {
  const topic = req.query.topic || 'cpp';
  
  if (topic === 'cpp') {
    const question = cppQuestions[currentQuestionIndex % cppQuestions.length];
    currentQuestionIndex++;
    
    res.json({
      question: {
        id: question.id,
        text: question.text,
        answers: question.answers,
        correct: question.correct,
        explanation: question.explanation
      }
    });
  } else {
    res.status(400).json({ message: 'Topic not supported' });
  }
});

// Submit answer
router.post('/answer', auth, async (req, res) => {
  try {
    const { selectedKey, correct } = req.body;
    
    if (!selectedKey || !correct) {
      return res.status(400).json({ message: 'Missing selectedKey or correct answer' });
    }
    
    const isCorrect = selectedKey === correct;
    
    // Update user points based on answer
    let pointsChange = 0;
    if (isCorrect) {
      pointsChange = 2; // +2 points for correct answer
    } else {
      pointsChange = -1; // -1 point for wrong answer
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { points: pointsChange } },
      { new: true, select: 'username points' }
    );
    
    console.log(`User ${req.user.username} answered ${isCorrect ? 'correctly' : 'incorrectly'}! Points: ${updatedUser.points} (${pointsChange > 0 ? '+' : ''}${pointsChange})`);
    
    res.json({
      correct: isCorrect,
      selectedKey,
      correctAnswer: correct,
      newPoints: updatedUser.points,
      pointsChange: pointsChange
    });
  } catch (error) {
    console.error('Error updating user points:', error);
    res.status(500).json({ message: 'Failed to update points' });
  }
});

module.exports = router;


