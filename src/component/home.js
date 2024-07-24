import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { logout, setToken, setUser } from '../redux/reducer/reducer';
import { login } from '../service/axiosInstance';
import { errorToast, successToast } from '../toastConfig';
import LoaderComponent from './loader';

const HomePage = () => {
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(logout())
        navigate("/")
    }

    return (
        <>
            {loader && <LoaderComponent />}
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                    <div className="my-3 text-3xl font-bold text-center text-navy-700">Welcome the Quiz Competition</div>
                    <button
                        type="submit"
                        onClick={() => navigate("/topic_selection")}
                        className="linear hover:bg-[#2B7A0B]-600 active:bg-[#2B7A0B]-700 dark:bg-[#2B7A0B]-400 dark:hover:bg-[#2B7A0B]-300 dark:active:bg-[#2B7A0B]-200 mt-2 w-full rounded-xl bg-[#2B7A0B] py-[8px] text-lg font-medium text-white transition duration-200 dark:text-white"
                    >
                        Quiz
                    </button>
                    <button
                        type="submit"
                        onClick={() => navigate("/leaderBoard")}
                        className="linear hover:bg-[#2B7A0B]-600 active:bg-[#2B7A0B]-700 dark:bg-[#2B7A0B]-400 dark:hover:bg-[#2B7A0B]-300 dark:active:bg-[#2B7A0B]-200 mt-2 w-full rounded-xl bg-[#2B7A0B] py-[8px] text-lg font-medium text-white transition duration-200 dark:text-white"
                    >
                        Leader Board
                    </button>
                    <button
                        type="submit"
                        onClick={() => logOut()}
                        className="linear hover:bg-[#2B7A0B]-600 active:bg-[#2B7A0B]-700 dark:bg-[#2B7A0B]-400 dark:hover:bg-[#2B7A0B]-300 dark:active:bg-[#2B7A0B]-200 mt-2 w-full rounded-xl bg-[#2B7A0B] py-[8px] text-lg font-medium text-white transition duration-200 dark:text-white"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default HomePage;
