// TopicSelection.js

import React from 'react';
import { setCurrentQue, setTopic } from '../redux/reducer/reducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const TopicSelection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const topics = [
        { value: "javascript", label: "Javascript" },
        { value: "java", label: "Java" },
        { value: "python", label: "Python" },
    ];
    const handleTopicChange = (e) => {
        dispatch(setTopic(e))
        dispatch(setCurrentQue(0))
        navigate("/quiz")
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <div className="my-3 text-3xl font-bold text-center text-navy-700">Select a Topic</div>
                {topics.map((e, index) => (
                    <button key={index} className="linear hover:bg-[#2B7A0B]-600 active:bg-[#2B7A0B]-700 dark:bg-[#2B7A0B]-400 dark:hover:bg-[#2B7A0B]-300 dark:active:bg-[#2B7A0B]-200 mt-2 w-full rounded-xl bg-[#2B7A0B] py-[8px] text-lg font-medium text-white transition duration-200 dark:text-white" onClick={() => handleTopicChange(e.value)}>
                        {e.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TopicSelection;
