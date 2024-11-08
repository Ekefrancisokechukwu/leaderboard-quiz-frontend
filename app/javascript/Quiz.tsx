import CodeSnippet from "@/components/CodeSnippet";
import Progressbar from "@/components/Progressbar";
import RadioBox from "@/components/RadioBox";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Quiz = () => {
  const code = `function mystery(x) {
  x = x || 5;
  console.log(x);
}
mystery(0);
mystery(10);
mystery();
  `;
  const [questions, setQuestion] = useState(quizQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(
    Array(quizQuestions.length).fill(null)
  );
  console.log(answers);

  const handleOptionChange = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  const nextStep = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const prevStep = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-[60rem] mx-auto py-9">
      <Progressbar
        currentCount={currentQuestion + 1}
        questionCount={questions.length}
        width={((currentQuestion + 1) / questions.length) * 100 + "%"}
      />

      <section className=" bg-gray-50 min-h-[20rem] rounded-md mt-[5rem] ">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, filter: "blur(1px)" }}
          animate={{ opacity: 1, filter: "none" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-[1fr_auto] gap-x-[5rem] items-start  p-5"
        >
          <div>
            <h1 className="font-semibold text-lg mb-5">1. Question</h1>
            <p className="font-medium text-lg">
              {" "}
              {questions[currentQuestion].question}
            </p>

            {questions[currentQuestion].codeSample && (
              <div className="mt-6">
                <CodeSnippet
                  codeString={questions[currentQuestion].codeSample}
                />
              </div>
            )}
          </div>
          <div className="w-[25rem] flex flex-col gap-y-3">
            <h1 className="font-semibold text-lg mb-5">Answer</h1>

            {questions[currentQuestion].options.map((option, i) => {
              return (
                <div key={i} className="flex items-center gap-x-2">
                  <RadioBox
                    id={`${i}`}
                    name={questions[currentQuestion].question}
                    checked={answers[currentQuestion] === i}
                    onChange={() => handleOptionChange(i)}
                  />
                  <label className="font-medium text-gray-400">{option}</label>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>
      <div className="mt-8 flex items-center justify-end gap-x-6">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={prevStep}
          disabled={currentQuestion === 0}
          className="px-5 bg-gray-200 py-2 disabled:opacity-40 rounded-full  hover:shadow-xl font-medium"
        >
          Prev
        </motion.button>

        {currentQuestion === questions.length - 1 ? (
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.04 }}
            className="px-5 disabled:opacity-40 bg-green-900 hover:shadow-xl text-white py-2 font-medium rounded-full"
          >
            Submit
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={nextStep}
            disabled={currentQuestion === questions.length - 1}
            className="px-5 disabled:opacity-40 bg-gray-900 hover:shadow-xl text-white py-2 font-medium rounded-full"
          >
            Next
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Quiz;

const quizQuestions = [
  {
    question: "What will the following code output?",
    codeSample: `
 let obj = { a: 1 };

   (function(obj) {
   obj.a = 2;
   obj = { a: 3 };
   })(obj);

  console.log(obj.a);
    `,
    options: ["`1`", "`2`", "`3`", "`undefined`"],
    answer: "`2`",
  },
  {
    question: "What is the purpose of the `let` keyword in JavaScript?",
    options: [
      "Declares a block-scoped variable that can be reassigned",
      "Declares a block-scoped constant",
      "Declares a global variable",
      "Creates a function",
    ],
    answer: "Declares a block-scoped variable that can be reassigned",
  },
  {
    question: "What will the following code output?",
    codeSample: `
const arr = [1, 2, 3];
console.log(arr[3]);
    `,
    options: ["`undefined`", "`3`", "`null`", "Throws an error"],
    answer: "`undefined`",
  },
  {
    question:
      "Which method would you use to add an element to the beginning of an array?",
    options: ["`push`", "`pop`", "`unshift`", "`shift`"],
    answer: "`unshift`",
  },
  {
    question: "What does `NaN` represent in JavaScript?",
    options: [
      "Null and None",
      "A non-numeric value",
      "Not-a-Number",
      "Not Applicable",
    ],
    answer: "Not-a-Number",
  },
  {
    question: "What will the following code output?",
    codeSample: `
function foo() {
  return
  {
    bar: "Hello"
  };
}
console.log(foo());
    `,
    options: [
      "`{ bar: 'Hello' }`",
      "`undefined`",
      "`Throws a syntax error`",
      "`null`",
    ],
    answer: "`undefined`",
  },
  {
    question: "What does `Array.prototype.map` return?",
    options: [
      "A new array with transformed elements",
      "The original array",
      "A single value",
      "The first element that matches",
    ],
    answer: "A new array with transformed elements",
  },
  {
    question: "What will the following code output?",
    codeSample: `
console.log([] + []);
console.log([] + {});
console.log({} + []);
    `,
    options: [
      "`'' '' '[object Object]'`",
      "`'0 0 0'`",
      "`Throws a syntax error`",
      "`'[object Object] [object Object] [object Object]'`",
    ],
    answer: "`'' '[object Object]' '[object Object]'`",
  },
  {
    question: "What does the `const` keyword do in JavaScript?",
    options: [
      "Declares a block-scoped constant that cannot be reassigned",
      "Declares a global constant",
      "Declares a constant that can be reassigned",
      "Declares a variable with no scope",
    ],
    answer: "Declares a block-scoped constant that cannot be reassigned",
  },
  {
    question: "What will the following code output?",
    codeSample: `
const arr = [1, 2, 3];
const result = arr.splice(1, 1);
console.log(result);
console.log(arr);
    `,
    options: [
      "`[2], [1, 2, 3]`",
      "`[2], [1, 3]`",
      "`[1, 3], [2]`",
      "`[3], [1, 2]`",
    ],
    answer: "`[2], [1, 3]`",
  },
  {
    question:
      "Which function is used to convert a JSON string into a JavaScript object?",
    options: [
      "`JSON.parse`",
      "`JSON.stringify`",
      "`JSON.toObject`",
      "`Object.parse`",
    ],
    answer: "`JSON.parse`",
  },
  {
    question: "What will the following code output?",
    codeSample: `
console.log('hello' || 'world');
console.log(0 || 'hello');
console.log(null || 42);
console.log('' || 0);
    `,
    options: [
      "`'hello', 'hello', 42, 0`",
      "`'world', 'hello', 'hello', ''`",
      "`'hello', 0, 42, ''`",
      "`'world', 'world', 42, 0`",
    ],
    answer: "`'hello', 'hello', 42, 0`",
  },
  {
    question:
      "What is the value of `this` inside a regular function (not in strict mode)?",
    options: [
      "Global object (e.g., `window` in browsers)",
      "The function itself",
      "`undefined`",
      "`null`",
    ],
    answer: "Global object (e.g., `window` in browsers)",
  },
  {
    question: "What will the following code output?",
    codeSample: `
console.log(typeof [1, 2, 3]);
    `,
    options: ["`object`", "`array`", "`undefined`", "`number`"],
    answer: "`object`",
  },
  {
    question: "Which method can be used to merge multiple arrays into one?",
    options: ["`concat`", "`merge`", "`append`", "`combine`"],
    answer: "`concat`",
  },
  {
    question: "What will the following code output?",
    codeSample: `
const arr = [1, 2, 3];
console.log(arr.length);
    `,
    options: ["`3`", "`4`", "`0`", "Throws an error"],
    answer: "`3`",
  },
  {
    question:
      "Which method removes the last element from an array and returns it?",
    options: ["`pop`", "`push`", "`shift`", "`unshift`"],
    answer: "`pop`",
  },
  {
    question: "What will the following code output?",
    codeSample: `
let arr = [1, 2, 3];
arr[10] = 99;
console.log(arr.length);
    `,
    options: ["`11`", "`3`", "`10`", "Throws an error"],
    answer: "`11`",
  },
  {
    question: "What will the following code output?",
    codeSample: `
console.log(Boolean(0));
    `,
    options: ["`true`", "`false`", "`undefined`", "Throws an error"],
    answer: "`false`",
  },
  {
    question: "What will the following code output?",
    codeSample: `
let count = 0;
console.log(count++);
console.log(++count);
console.log(count);
    `,
    options: ["`0, 2, 1`", "`1, 1, 1`", "`0, 2, 2`", "`1, 2, 2`"],
    answer: "`0, 2, 2`",
  },
];
