import { useState } from 'react';

const quizQuestions = [
  {
    id: 1,
    question: 'في أي عام ولد النبي صلى الله عليه وسلم؟',
    options: ['عام الفيل', 'عام الحزن', 'عام الوفود', 'عام الفتح'],
    answer: 'عام الفيل'
  },
  {
    id: 2,
    question: 'ما هي أول غزوة في الإسلام خاضها المسلمون وقُتل فيها أبو جهل؟',
    options: ['غزوة أحد', 'غزوة بدر الكبرى', 'غزوة الخندق', 'غزوة تبوك'],
    answer: 'غزوة بدر الكبرى'
  },
  {
    id: 3,
    question: 'من هو الصحابي الذيُ سمي بـ "أول سفير في الإسلام" وبعث للمدينة؟',
    options: ['عمر بن الخطاب', 'مصعب بن عمير', 'علي بن أبي طالب', 'جعفر بن أبي طالب'],
    answer: 'مصعب بن عمير'
  },
  {
    id: 4,
    question: 'كم استمر الحصار والمقاطعة على بني هاشم في شِعب أبي طالب؟',
    options: ['سنة واحدة', 'سنتين', 'ثلاث سنوات', 'خمس سنوات'],
    answer: 'ثلاث سنوات'
  }
];

export default function QuizForm() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [error, setError] = useState('');

  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
    setError('');
  };

  const calculateScore = (e) => {
    e.preventDefault();
    if (Object.keys(selectedAnswers).length < quizQuestions.length) {
      setError('يرجى الإجابة على جميع الأسئلة قبل إرسال الاختبار!');
      return;
    }

    let currentScore = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer) {
        currentScore += 1;
      }
    });

    setScore(currentScore);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setScore(null);
    setError('');
  };

  return (
    <div className="quiz-container">
      <h2>اختبر معلوماتك في السيرة النبوية 📝</h2>
      <p className="quiz-subtitle">أجب عن الأسئلة التالية لقياس حصيلتك المعرفية الأحداث السيرة:</p>

      {score !== null ? (
        <div className="quiz-result-box">
          <h3>نتيجة الاختبار 🎉</h3>
          <p className="score-text">
            حصلت على: <span>{score}</span> من <span>{quizQuestions.length}</span>
          </p>
          <p className="score-eval">
            {score === quizQuestions.length ? 'ماشاء الله! إجابات ممتازة وكاملة ⭐' : 'مكسب رائع، يمكنك مراجعة الكروت وإعادة الاختبار!'}
          </p>
          <button onClick={resetQuiz} className="submit-btn">إعادة الاختبار 🔄</button>
        </div>
      ) : (
        <form onSubmit={calculateScore}>
          {quizQuestions.map((q, index) => (
            <div key={q.id} className="quiz-card">
              <h4>{index + 1}. {q.question}</h4>
              <div className="quiz-options">
                {q.options.map((option) => (
                  <label 
                    key={option} 
                    className={`option-label ${selectedAnswers[q.id] === option ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      checked={selectedAnswers[q.id] === option}
                      onChange={() => handleOptionChange(q.id, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {error && <p className="error-text text-center">{error}</p>}

          <button type="submit" className="submit-btn">تصحيح الاختبار وإنهاء 🏁</button>
        </form>
      )}
    </div>
  );
}