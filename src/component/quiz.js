import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { errorToast, successToast } from '../toastConfig';
import { getAllTopic, updateScore } from '../service/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { setCurrentQue } from '../redux/reducer/reducer';
import LoaderComponent from './loader';

const Quiz = () => {
    const { topic, currentQuestion } = useSelector((store) => store.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [quizData, setQuizData] = useState([])
    const [loader, setLoader] = useState(false)
    // const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [isAttempted, setIsAttempted] = useState(false);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        setIsAttempted(true)
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const isCorrect = selectedOption === quizData[currentQuestion].answer;
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizData.length) {
            dispatch(setCurrentQue(currentQuestion + 1))
            setSelectedOption('');
            setIsAttempted(false)
        } else {
            dispatch(setCurrentQue(0))
            setShowScore(true);
        }
    };

    const updateUserScore = async () => {
        try {
            setLoader(true)
            const res = await updateScore({ topic, score })
            if(res.status == 200){
                successToast("Score Updated")
            }
            setLoader(false)
        } catch (error) {
            setLoader(false)
            errorToast(error?.response?.data?.message || error?.message)
        }
    }

    const restartQuiz = () => {
        dispatch(setCurrentQue(0))
        setScore(0);
        setShowScore(false);
        setSelectedOption('');
    };

    const getAllTopicData = async () => {
        try {
            setLoader(true)
            const res = await getAllTopic({ topic })
            if (res.status == 200) {
                setQuizData(res.data.data)
            }
            setLoader(false)
        } catch (error) {
            setLoader(false)
            errorToast(error?.response?.data?.message || error?.message)
        }
    }

    useEffect(() => {
        console.log(currentQuestion, "currentQuestion")
        getAllTopicData()
    }, [topic])

    useEffect(() => {
        if (showScore) updateUserScore()
    }, [showScore])

    return (
        <>
            {loader && <LoaderComponent />}
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                    {showScore ? (
                        <div className="score-section">
                            <div className="my-3 text-3xl font-bold">Quiz Result</div>
                            <p className="my-3 text-lg font-semibold">
                                You scored {score} out of {quizData.length} questions.
                            </p>
                            <button onClick={restartQuiz} className="linear hover:bg-[#2B7A0B]-600 active:bg-[#2B7A0B]-700 dark:bg-[#2B7A0B]-400 dark:hover:bg-[#2B7A0B]-300 dark:active:bg-[#2B7A0B]-200 mt-2 w-full rounded-xl bg-[#2B7A0B] py-[8px] text-lg font-medium text-white transition duration-200 dark:text-white">Restart Quiz</button>
                            <button onClick={() => navigate("/home")} className="linear hover:bg-[#2B7A0B]-600 active:bg-[#2B7A0B]-700 dark:bg-[#2B7A0B]-400 dark:hover:bg-[#2B7A0B]-300 dark:active:bg-[#2B7A0B]-200 mt-2 w-full rounded-xl bg-[#2B7A0B] py-[8px] text-lg font-medium text-white transition duration-200 dark:text-white">Back to Home</button>
                        </div>
                    ) : (
                        <form onSubmit={handleFormSubmit}>
                            <div className="question-section">
                                <div className="question-count">
                                    <div className="my-3 text-3xl font-bold text-navy-700">Question {currentQuestion + 1}/{quizData.length}</div>
                                </div>
                                <div className="my-3 text-lg font-bold">{quizData[currentQuestion]?.question}</div>
                            </div>
                            <div className="answer-section">
                                {quizData && quizData[currentQuestion]?.options.map((option) => (
                                    <label key={option} className="block mb-2 text-base font-semibold">
                                        <input
                                            type="radio"
                                            name="option"
                                            value={option}
                                            checked={selectedOption === option}
                                            onChange={handleOptionChange}
                                            className="mr-2"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                            <button type="submit" disabled={!isAttempted} className="linear hover:bg-[#2B7A0B]-600 active:bg-[#2B7A0B]-700 dark:bg-[#2B7A0B]-400 dark:hover:bg-[#2B7A0B]-300 dark:active:bg-[#2B7A0B]-200 mt-2 w-full rounded-xl bg-[#2B7A0B] py-[8px] text-lg font-medium text-white transition duration-200 dark:text-white">Next</button>
                        </form>
                    )}
                </div>
            </div>
        </>

    );
};

export default Quiz;
