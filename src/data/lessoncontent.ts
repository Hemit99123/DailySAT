export interface PracticeProblem {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface SubtopicContent {
  summary: string;
  practice: PracticeProblem[];
}

const content: Record<string, SubtopicContent> = {
  "Linear Equations": {
    summary:
      "Linear equations express relationships with a constant rate of change and graph as straight lines. They typically take the form ax + b = c, where you isolate the variable by performing inverse operations like addition, subtraction, multiplication, or division. For example, to solve 2x + 3 = 7, subtract 3 from both sides to get 2x = 4, then divide both sides by 2 to find x = 2. Checking your work by substituting the solution back into the original equation ensures accuracy.",
    practice: [
      {
        question: "Solve for x: 2x + 3 = 7",
        options: ["x = 2", "x = 3", "x = 4", "x = 5"],
        correctAnswer: "x = 2",
        explanation: "Subtract 3 from both sides, then divide by 2.",
      },
      {
        question: "Solve for y: 5y - 10 = 0",
        options: ["y = 2", "y = -2", "y = 10", "y = -10"],
        correctAnswer: "y = 2",
        explanation: "Add 10 to both sides, then divide by 5.",
      },
      {
        question: "What is the slope of y = 3x - 4?",
        options: ["3", "-4", "4", "-3"],
        correctAnswer: "3",
        explanation: "The slope is the coefficient of x.",
      },
    ],
  },
  Inequalities: {
    summary:
      "Inequalities compare values using symbols like <, >, ≤, ≥ to show greater than, less than, or equal relationships. Solving inequalities is similar to solving equations, but with one key rule: if you multiply or divide both sides by a negative number, you must reverse the inequality sign. For example, to solve -2x > 6, divide both sides by -2, flipping the sign to get x < -3. Always graph the solution on a number line to visualize the possible values for the variable.",
    practice: [
      {
        question: "Which inequality shows: x is greater than 4?",
        options: ["x < 4", "x ≤ 4", "x > 4", "x ≥ 4"],
        correctAnswer: "x > 4",
        explanation: "The symbol '>' means greater than.",
      },
      {
        question: "Solve: -2x > 6",
        options: ["x > -3", "x < -3", "x > 3", "x < 3"],
        correctAnswer: "x < -3",
        explanation: "Divide both sides by -2 and reverse the inequality sign.",
      },
      {
        question: "Which graph represents x ≤ 5?",
        options: [
          "Open circle at 5, arrow left",
          "Closed circle at 5, arrow left",
          "Open circle at 5, arrow right",
          "Closed circle at 5, arrow right",
        ],
        correctAnswer: "Closed circle at 5, arrow left",
        explanation: "≤ means closed circle and values to the left.",
      },
    ],
  },
  "Quadratic Equations": {
    summary:
      "Quadratic equations are second-degree equations with the form ax² + bx + c = 0. They can be solved by factoring, completing the square, or using the quadratic formula. For instance, with x² - 4 = 0, you can factor to (x - 2)(x + 2) = 0, leading to x = 2 or x = -2. You can always check the roots by plugging them back into the original equation to confirm they satisfy it.",
    practice: [
      {
        question: "Find the roots: x² - 4 = 0",
        options: ["x = 2 or -2", "x = 4 or -4", "x = 0", "x = 1 or -1"],
        correctAnswer: "x = 2 or -2",
        explanation: "Factor as (x - 2)(x + 2) = 0.",
      },
      {
        question: "Solve: x² + 2x - 3 = 0",
        options: ["x = -3 or 1", "x = 3 or -1", "x = -2 or 3", "x = 2 or -3"],
        correctAnswer: "x = -3 or 1",
        explanation: "Factors are (x + 3)(x - 1) = 0.",
      },
      {
        question: "What is the vertex of y = x² - 6x + 9?",
        options: ["(3, 0)", "(-3, 0)", "(0, 9)", "(3, 9)"],
        correctAnswer: "(3, 0)",
        explanation:
          "Complete the square or recognize perfect square trinomial.",
      },
    ],
  },
  // New subtopics:
  "Ratios & Proportions": {
    summary:
      "Ratios compare two quantities, while proportions state that two ratios are equal. To solve a proportion, use cross-multiplication. For example, if 3/4 = x/8, multiplying diagonally gives 3 × 8 = 4 × x, so 24 = 4x, and dividing both sides by 4 gives x = 6. Always simplify your final answer and check by substituting the value back into the proportion.",
    practice: [
      {
        question: "If 3/4 = x/8, what is x?",
        options: ["6", "8", "12", "24"],
        correctAnswer: "6",
        explanation: "Cross multiply: 3 * 8 = 4 * x → 24 = 4x → x = 6.",
      },
      {
        question: "What is the ratio of 10 to 25 in simplest form?",
        options: ["2:5", "5:2", "10:25", "1:2.5"],
        correctAnswer: "2:5",
        explanation: "Divide both terms by 5.",
      },
    ],
  },
  Percentages: {
    summary:
      "Percentages represent parts per hundred and are often used to calculate discounts, increases, or comparisons. To find a percentage of a quantity, multiply the quantity by the percentage as a decimal. For example, to find 20% of 150, convert 20% to 0.20 and multiply: 0.20 × 150 = 30. Reverse percentage problems, like finding an original price after a discount, can be solved by setting up an equation and solving for the unknown.",
    practice: [
      {
        question: "What is 20% of 150?",
        options: ["30", "15", "20", "50"],
        correctAnswer: "30",
        explanation: "20% = 0.20; 0.20 × 150 = 30.",
      },
      {
        question: "If a price is $60 after a 25% discount, what was the original price?",
        options: ["80", "75", "85", "90"],
        correctAnswer: "80",
        explanation: "Let original price = x; x - 0.25x = 60 → 0.75x=60 → x=80.",
      },
    ],
  },
  "Interpreting Graphs": {
    summary:
      "Graphs visually present data, and understanding them requires interpreting axes, labels, and trends. For example, a line graph's slope represents the rate of change between variables. If the line rises steadily, the dependent variable increases consistently. Pie charts show how parts contribute to a whole, while bar graphs compare categories. Being able to interpret these helps solve real-world problems like understanding sales trends or survey results.",
    practice: [
      {
        question: "What does the slope of a line graph represent?",
        options: [
          "Rate of change",
          "Total value",
          "Starting point",
          "Maximum value",
        ],
        correctAnswer: "Rate of change",
        explanation: "Slope shows how one variable changes relative to another.",
      },
      {
        question: "What type of graph best shows parts of a whole?",
        options: ["Line graph", "Bar graph", "Pie chart", "Scatter plot"],
        correctAnswer: "Pie chart",
        explanation: "Pie charts show proportions of a total.",
      },
    ],
  },
  Functions: {
    summary:
      "Functions relate each input to exactly one output, often written as f(x). A function like y = 2x + 3 means for every x-value, there is only one corresponding y-value. To solve for a specific output, substitute the input value. For instance, if x = 4, then y = 2(4) + 3 = 11. Understanding functions helps model relationships in real-world contexts, such as calculating cost or predicting outcomes.",
    practice: [
      {
        question: "Is y = 2x + 3 a function?",
        options: ["Yes", "No", "Only when x > 0", "Cannot tell"],
        correctAnswer: "Yes",
        explanation: "Each x value has exactly one y value.",
      },
      {
        question: "What is the output when x = 4 in y = x²?",
        options: ["8", "16", "4", "2"],
        correctAnswer: "16",
        explanation: "Square 4 to get 16.",
      },
    ],
  },
  Polynomials: {
    summary:
      "Polynomials are expressions that include variables raised to whole-number exponents, with terms added or subtracted. The degree of a polynomial is the highest exponent. For example, in 3x⁴ + 2x² - 5, the degree is 4. You can simplify polynomials by combining like terms. For example, (x² + 3x) + (2x² - x) = 3x² + 2x. Polynomials are used to model more complex relationships in algebra and geometry.",
    practice: [
      {
        question: "What is the degree of 3x^4 + 2x^2 - 5?",
        options: ["4", "2", "3", "5"],
        correctAnswer: "4",
        explanation: "Degree is the highest exponent of x.",
      },
      {
        question: "Simplify: (x^2 + 3x) + (2x^2 - x)",
        options: [
          "3x^2 + 2x",
          "x^2 + 2x",
          "2x^2 + 4x",
          "3x^2 + 4x",
        ],
        correctAnswer: "3x^2 + 2x",
        explanation: "Add like terms: x² + 2x² = 3x²; 3x - x = 2x.",
      },
    ],
  },
  "Exponential & Rational Equations": {
    summary:
      "Exponential equations have variables in the exponent, while rational equations involve ratios of polynomials. To solve an exponential equation like 2^x = 8, rewrite 8 as 2³, so x = 3. For rational expressions, factor and simplify when possible. For instance, (x² - 9)/(x + 3) simplifies to x - 3 after factoring the numerator as (x + 3)(x - 3) and canceling like terms.",
    practice: [
      {
        question: "Solve 2^x = 8",
        options: ["x = 2", "x = 3", "x = 4", "x = 1"],
        correctAnswer: "x = 3",
        explanation: "2^3 = 8.",
      },
      {
        question: "Simplify: (x^2 - 9)/(x + 3)",
        options: ["x - 3", "x + 3", "x - 9", "x + 9"],
        correctAnswer: "x - 3",
        explanation: "Factor numerator: (x + 3)(x - 3), cancel (x + 3).",
      },
    ],
  },
  "Main Ideas": {
    summary:
      "The main idea is the central message or point of a text. To find it, look for repeated concepts or summaries often located in topic sentences. For example, if a paragraph discusses how exercise improves health, the main idea is likely that Exercise improves health. Identifying main ideas improves reading comprehension by helping readers focus on what matters most.",
    practice: [
      {
        question:
          "What is the main idea of a paragraph that explains the importance of exercise?",
        options: [
          "Exercise improves health",
          "Different types of exercises",
          "History of exercise",
          "Exercise equipment",
        ],
        correctAnswer: "Exercise improves health",
        explanation: "The primary point is the benefit of exercise.",
      },
      {
        question:
          "How do you find the main idea in a passage?",
        options: [
          "Look for repeated ideas",
          "Focus on details",
          "Ignore the title",
          "Skip the introduction",
        ],
        correctAnswer: "Look for repeated ideas",
        explanation: "Repeated ideas usually highlight the main point.",
      },
    ],
  },
  "Supporting Details": {
    summary:
      "Supporting details provide evidence, examples, or explanations that reinforce the main idea. They help clarify or prove the author's point. For example, if the main idea is Reading improves vocabulary, a supporting detail might be Reading daily can introduce new words. Recognizing these details enhances understanding and strengthens responses in reading comprehension tasks.",
    practice: [
      {
        question:
          "Which sentence supports the idea that reading improves vocabulary?",
        options: [
          "I enjoy reading books.",
          "Reading daily can introduce new words.",
          "Books can be fiction or nonfiction.",
          "Libraries have many books.",
        ],
        correctAnswer: "Reading daily can introduce new words.",
        explanation: "This sentence gives evidence supporting the main idea.",
      },
      {
        question:
          "Supporting details usually:",
        options: [
          "Explain the main idea",
          "Introduce new topics",
          "Conclude the text",
          "Are unrelated facts",
        ],
        correctAnswer: "Explain the main idea",
        explanation: "They clarify or prove the main point.",
      },
    ],
  },
  Inferences: {
    summary:
      "Inferences are logical conclusions drawn from clues in a text. They require readers to read between the lines. For example, if a character is shivering and wearing a coat, you can infer it's cold outside, even if the text doesn't say so directly. Practicing inference improves critical thinking and helps uncover deeper meanings in reading passages.",
    practice: [
      {
        question:
          "If a character is shivering and wearing a coat, what can you infer?",
        options: [
          "It is cold outside",
          "The character is sick",
          "The character likes coats",
          "It is sunny",
        ],
        correctAnswer: "It is cold outside",
        explanation:
          "Shivering and wearing a coat suggest cold weather.",
      },
      {
        question:
          "An inference is:",
        options: [
          "A direct fact",
          "A guess based on evidence",
          "An opinion without evidence",
          "A summary",
        ],
        correctAnswer: "A guess based on evidence",
        explanation: "Inferences are conclusions drawn from clues.",
      },
    ],
  },
  "Word Choice": {
    summary:
      "Word choice reflects an author's tone, style, and clarity. Choosing precise, vivid words can make writing more engaging. For example, describing a character as joyful conveys excitement, whereas bored conveys disinterest. Understanding word choice helps both writers and readers interpret texts more effectively and convey intended emotions or messages.",
    practice: [
      {
        question: "Which word best conveys excitement?",
        options: ["Joyful", "Sad", "Angry", "Bored"],
        correctAnswer: "Joyful",
        explanation: "Joyful expresses happiness and excitement.",
      },
      {
        question: "Strong word choice can help:",
        options: [
          "Clarify meaning",
          "Confuse readers",
          "Ignore the message",
          "Make writing boring",
        ],
        correctAnswer: "Clarify meaning",
        explanation: "Good vocabulary makes ideas clear.",
      },
    ],
  },
  "Text Structure": {
    summary:
      "Text structure refers to how information is organized, such as cause and effect, chronological order, or compare and contrast. For example, a text explaining the sequence of historical events uses chronological structure. Recognizing structure helps readers follow the author's logic and improves their ability to summarize or analyze the text.",
    practice: [
      {
        question: "What text structure lists events in the order they happened?",
        options: ["Cause/Effect", "Chronological", "Compare/Contrast", "Problem/Solution"],
        correctAnswer: "Chronological",
        explanation: "Chronological order is time-based sequencing.",
      },
      {
        question: "Which structure explains reasons why something happened?",
        options: ["Compare/Contrast", "Cause/Effect", "Chronological", "Description"],
        correctAnswer: "Cause/Effect",
        explanation: "It shows causes and their results.",
      },
    ],
  },
  "Author's Purpose": {
    summary:
      "The author's purpose is their reason for writing: to inform, entertain, persuade, or explain. For instance, if an advertisement encourages you to buy a product, the purpose is to persuade. Understanding the author's purpose helps readers interpret the tone, style, and intended impact of the text.",
    practice: [
      {
        question: "If an author wants to convince you to buy something, their purpose is to:",
        options: ["Inform", "Entertain", "Persuade", "Explain"],
        correctAnswer: "Persuade",
        explanation: "Persuasion tries to influence the reader.",
      },
      {
        question: "A news article’s author’s purpose is usually to:",
        options: ["Entertain", "Inform", "Persuade", "Confuse"],
        correctAnswer: "Inform",
        explanation: "News articles provide facts.",
      },
    ],
  },
  "Clarity & Precision": {
    summary:
      "Clear, precise writing communicates ideas without confusion. Using specific language improves understanding. For example, The golden retriever sprinted across the park is clearer than The animal moved. Writers achieve clarity by avoiding vague terms and choosing accurate, descriptive language, making their message easy to understand.",
    practice: [
      {
        question: "Which sentence is clearer?",
        options: [
          "The dog ran fast.",
          "The golden retriever sprinted quickly across the park.",
          "The animal moved.",
          "Something happened.",
        ],
        correctAnswer: "The golden retriever sprinted quickly across the park.",
        explanation: "It gives a specific and vivid description.",
      },
      {
        question: "Precision helps readers:",
        options: [
          "Understand the exact meaning",
          "Get confused",
          "Guess the meaning",
          "Ignore details",
        ],
        correctAnswer: "Understand the exact meaning",
        explanation: "Clear writing reduces misunderstanding.",
      },
    ],
  },
  "Logical Progression": {
    summary:
      "Logical progression means ideas flow in a sensible, organized order. For example, in a story about a daily routine, the sequence wake up, eat breakfast, go to school makes sense. Logical progression helps readers follow arguments or narratives smoothly, enhancing comprehension and engagement.",
    practice: [
      {
        question: "Which sequence shows logical progression?",
        options: [
          "Wake up, eat breakfast, go to school",
          "Eat breakfast, go to school, wake up",
          "Go to school, wake up, eat breakfast",
          "Eat breakfast, wake up, go to school",
        ],
        correctAnswer: "Wake up, eat breakfast, go to school",
        explanation: "This is the correct daily sequence.",
      },
      {
        question: "Logical progression helps readers:",
        options: [
          "Follow ideas easily",
          "Get lost in the text",
          "Ignore the main point",
          "Confuse the author’s message",
        ],
        correctAnswer: "Follow ideas easily",
        explanation: "Good flow makes text understandable.",
      },
    ],
  },
  "Effective Transitions": {
    summary:
      "Transitions connect ideas and paragraphs, guiding the reader through the text. Words like Moreover add information, while Because shows cause and effect. Using transitions properly creates cohesion and clarity, making writing easier to follow and improving its overall flow.",
    practice: [
      {
        question: "Which word is a transition showing addition?",
        options: ["However", "Therefore", "Moreover", "But"],
        correctAnswer: "Moreover",
        explanation: "It adds information.",
      },
      {
        question: "Which transition shows cause and effect?",
        options: ["Because", "Although", "Meanwhile", "For example"],
        correctAnswer: "Because",
        explanation: "It indicates cause and effect.",
      },
    ],
  },
  "Grammar & Usage": {
    summary:
      "Grammar and usage ensure sentences are structured correctly for clear communication. Subject-verb agreement, proper verb tense, and correct word choice are essential. For example, She doesn't like apples is grammatically correct, while She don't like apples is incorrect. Mastering grammar improves writing quality and prevents misunderstandings.",
    practice: [
      {
        question: "Choose the correct sentence:",
        options: [
          "She don't like apples.",
          "She doesn't like apples.",
          "She don't likes apples.",
          "She does likes apples.",
        ],
        correctAnswer: "She doesn't like apples.",
        explanation: "Subject-verb agreement requires 'doesn't'.",
      },
      {
        question: "Which word is a noun?",
        options: ["Run", "Beautiful", "Cat", "Quickly"],
        correctAnswer: "Cat",
        explanation: "A noun is a person, place, or thing.",
      },
    ],
  },
  "Sentence Structure": {
    summary:
      "Sentence structure refers to how words and phrases are arranged, including simple, compound, and complex sentences. For example, She runs every morning is a simple sentence with one independent clause. Understanding sentence structure allows for varied, effective writing and helps readers understand relationships between ideas.",
    practice: [
      {
        question: "Identify the simple sentence:",
        options: [
          "She runs every morning.",
          "She runs every morning and listens to music.",
          "Running every morning, she feels great.",
          "She runs because she enjoys it.",
        ],
        correctAnswer: "She runs every morning.",
        explanation: "A simple sentence has one independent clause.",
      },
      {
        question: "Which sentence contains a compound subject?",
        options: [
          "The dog barks.",
          "My friend and I went to the park.",
          "He runs fast.",
          "She is happy.",
        ],
        correctAnswer: "My friend and I went to the park.",
        explanation: "Two subjects joined by 'and' form a compound subject.",
      },
    ],
  },
  Punctuation: {
    summary:
      "Punctuation marks clarify meaning by showing pauses, stops, or relationships. For instance, commas separate items in a list, and semicolons connect related independent clauses. Correct punctuation prevents ambiguity and improves the readability of writing. For example, I bought apples, oranges, and bananas clearly lists three items.",
    practice: [
      {
        question: "Which sentence uses commas correctly?",
        options: [
          "I bought apples, oranges and bananas.",
          "I bought apples oranges, and bananas.",
          "I bought apples, oranges, and bananas.",
          "I bought apples oranges and bananas.",
        ],
        correctAnswer: "I bought apples, oranges, and bananas.",
        explanation: "Use commas to separate items in a list.",
      },
      {
        question: "What does a semicolon do?",
        options: [
          "Separates items in a list",
          "Connects related independent clauses",
          "Shows possession",
          "Ends a sentence",
        ],
        correctAnswer: "Connects related independent clauses",
        explanation: "Semicolons link closely related sentences.",
      },
    ],
  },
  Capitalization: {
    summary:
      "Capitalization rules indicate proper nouns, sentence beginnings, and important titles. For example, My friend lives in New York is correct, capitalizing the first word of the sentence and the proper noun New York. Using correct capitalization makes writing professional and easy to understand.",
    practice: [
      {
        question: "Which sentence is correctly capitalized?",
        options: [
          "my friend lives in New york.",
          "My Friend lives in new York.",
          "My friend lives in New York.",
          "my Friend lives in New york.",
        ],
        correctAnswer: "My friend lives in New York.",
        explanation: "Proper nouns and sentence starts are capitalized.",
      },
      {
        question: "Capitalize the days of the week:",
        options: ["monday", "Tuesday", "wednesday", "friday"],
        correctAnswer: "Tuesday",
        explanation: "Days of the week are always capitalized.",
      },
    ],
  },
};

export default content;
