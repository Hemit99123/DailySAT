// Quiz data for math and reading/writing sections

const mathQuiz = [
  {
    question: "What is the solution to the equation 2x + 5 = 15?",
    options: ["x = 5", "x = 10", "x = 2.5", "x = -5"],
    correctAnswer: "x = 5",
  },
  {
    question: "If 3x - 7 = 11, what is the value of x?",
    options: ["x = 6", "x = 4", "x = 3", "x = 7"],
    correctAnswer: "x = 6",
  },
  {
    question: "Which of the following is a quadratic equation?",
    options: ["x + 2 = 5", "x^2 + 3x - 4 = 0", "2x - 7 = 3", "x/2 = 4"],
    correctAnswer: "x^2 + 3x - 4 = 0",
  },
  {
    question: "A recipe requires a ratio of 2:5 for sugar to flour. If you use 10 cups of flour, how much sugar is needed?",
    options: ["2 cups", "4 cups", "5 cups", "20 cups"],
    correctAnswer: "4 cups",
  },
  {
    question: "If a shirt originally costs $50 and is on sale for 20% off, what is the sale price?",
    options: ["$40", "$30", "$25", "$10"],
    correctAnswer: "$40",
  },
  {
    question: "What is the slope of the line represented by y = 3x - 2?",
    options: ["3", "-2", "2", "-3"],
    correctAnswer: "3",
  },
  {
    question: "Which of the following represents a function?",
    options: ["x^2 = y", "x + y = 3", "x = 5", "y^2 = x"],
    correctAnswer: "x^2 = y",
  },
  {
    question: "What is the value of 2^3?",
    options: ["6", "8", "4", "12"],
    correctAnswer: "8",
  },
  {
    question: "Simplify: (x + 2)(x - 3)",
    options: ["x^2 - x - 6", "x^2 + 5", "x^2 - 6", "x^2 + 6x - 6"],
    correctAnswer: "x^2 - x - 6",
  },
  {
    question: "What is the solution to the inequality 2x - 4 > 6?",
    options: ["x > 5", "x < 5", "x > 2", "x < 2"],
    correctAnswer: "x > 5",
  },
  {
    question: "Which expression is equivalent to (x^3)^2?",
    options: ["x^5", "x^6", "x^9", "x^4"],
    correctAnswer: "x^6",
  },
  {
    question: "If f(x) = 2x + 1, what is f(3)?",
    options: ["7", "6", "5", "9"],
    correctAnswer: "7",
  },
  {
    question: "What is the solution to the exponential equation 3^x = 27?",
    options: ["x = 2", "x = 3", "x = 4", "x = 5"],
    correctAnswer: "x = 3",
  },
  {
    question: "Which of the following is a rational equation?",
    options: ["x^2 + 2x = 3", "x/2 = 4", "3x - 5 = 7", "x^3 = 8"],
    correctAnswer: "x/2 = 4",
  },
  {
    question: "The graph shows a parabola. What type of equation does it represent?",
    options: ["Linear", "Quadratic", "Exponential", "Rational"],
    correctAnswer: "Quadratic",
  },
  {
    question: "If 5x + 2 = 3x + 8, what is the value of x?",
    options: ["x = 3", "x = 2", "x = 4", "x = 6"],
    correctAnswer: "x = 3",
  },
  {
    question: "A car travels 60 miles in 1.5 hours. What is its average speed?",
    options: ["30 mph", "40 mph", "50 mph", "60 mph"],
    correctAnswer: "40 mph",
  },
  {
    question: "What is the product of (x - 4)(x + 4)?",
    options: ["x^2 - 16", "x^2 + 16", "x^2 - 8", "x^2 + 8"],
    correctAnswer: "x^2 - 16",
  },
  {
    question: "If y = 2x^2 - 3x + 1, what is y when x = 2?",
    options: ["3", "4", "5", "7"],
    correctAnswer: "3",
  },
  {
    question: "Simplify the expression: 4(x - 2) + 3x",
    options: ["7x - 8", "7x + 8", "x - 8", "x + 8"],
    correctAnswer: "7x - 8",
  },
];

const readingWritingQuiz = [
  {
    question: "What is the main idea of a passage?",
    options: ["The most important point", "The supporting detail", "The author's opinion", "A random fact"],
    correctAnswer: "The most important point",
  },
  {
    question: "Which sentence shows an inference?",
    options: ["The sky is blue.", "It will probably rain because it's cloudy.", "The book is on the table.", "The door is open."],
    correctAnswer: "It will probably rain because it's cloudy.",
  },
  {
    question: "What does 'author's purpose' mean?",
    options: ["To confuse the reader", "To entertain, inform, or persuade", "To add details", "To explain structure"],
    correctAnswer: "To entertain, inform, or persuade",
  },
  {
    question: "Which word best fits as precise word choice?",
    options: ["Thing", "Object", "Tool", "Hammer"],
    correctAnswer: "Hammer",
  },
  {
    question: "Which of these shows effective text structure?",
    options: ["Random sentences", "Chronological order", "Unrelated ideas", "Confusing grammar"],
    correctAnswer: "Chronological order",
  },
  {
    question: "What helps logical progression in writing?",
    options: ["Jumping between ideas", "Clear connections between points", "Random facts", "Vague wording"],
    correctAnswer: "Clear connections between points",
  },
  {
    question: "Which is a correct use of punctuation?",
    options: ["Lets eat, Grandma!", "Lets eat Grandma!", "Lets, eat Grandma!", "Lets eat Grandma."],
    correctAnswer: "Lets eat, Grandma!",
  },
  {
    question: "Which sentence shows clarity and precision?",
    options: ["She did something somewhere.", "The technician repaired the broken laptop.", "It happened.", "Things were done."],
    correctAnswer: "The technician repaired the broken laptop.",
  },
  {
    question: "What shows effective transitions?",
    options: ["However, therefore, in addition", "And, but, the", "To, at, by", "Because, since, if"],
    correctAnswer: "However, therefore, in addition",
  },
  {
    question: "What is a supporting detail?",
    options: ["A fact that explains the main idea", "The main idea itself", "An unrelated sentence", "The conclusion"],
    correctAnswer: "A fact that explains the main idea",
  },
  {
    question: "What type of structure presents cause and effect?",
    options: ["List", "Problem and solution", "Chronological", "Cause and effect"],
    correctAnswer: "Cause and effect",
  },
  {
    question: "Which is an example of correct sentence structure?",
    options: ["The dog barked.", "Barked dog.", "Dog the barked.", "Barked the dog."],
    correctAnswer: "The dog barked.",
  },
  {
    question: "What does 'logical progression' mean?",
    options: ["Ideas follow in a clear order", "Ideas are random", "No structure", "Off-topic details"],
    correctAnswer: "Ideas follow in a clear order",
  },
  {
    question: "What is an inference?",
    options: ["A guess with no evidence", "A conclusion based on evidence", "An opinion", "A direct statement"],
    correctAnswer: "A conclusion based on evidence",
  },
  {
    question: "Which sentence shows correct grammar and usage?",
    options: ["They goes to school.", "He is running.", "She go to work.", "It walk fast."],
    correctAnswer: "He is running.",
  },
  {
    question: "What does 'effective transitions' help with?",
    options: ["Confusing the reader", "Making writing flow smoothly", "Adding random details", "Starting new topics"],
    correctAnswer: "Making writing flow smoothly",
  },
  {
    question: "Which sentence demonstrates author's purpose to inform?",
    options: ["A story about a hero", "A news article about weather", "A poem", "A persuasive ad"],
    correctAnswer: "A news article about weather",
  },
  {
    question: "What shows precise word choice?",
    options: ["Thing", "Vehicle", "Car", "Transportation"],
    correctAnswer: "Car",
  },
  {
    question: "What does punctuation help with?",
    options: ["Clarity and meaning", "Making sentences longer", "Adding random marks", "Confusing readers"],
    correctAnswer: "Clarity and meaning",
  },
  {
    question: "What is the role of supporting details?",
    options: ["Explain the main idea", "Distract the reader", "Change topics", "Add confusion"],
    correctAnswer: "Explain the main idea",
  },
];

export { mathQuiz, readingWritingQuiz };
