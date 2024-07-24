// LoginForm.js

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import LoaderComponent from './loader';
import { login } from '../service/axiosInstance';
import { errorToast, successToast } from '../toastConfig';
import { useDispatch } from 'react-redux';
import { logout, setToken, setUser } from '../redux/reducer/reducer';

const HomePage = () => {
    const [showPass, setShowPass] = useState(false);
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid Email").required('Email is required'),
        password: Yup.string().min(8, "Password must be at least 8 characters")
            .required("Password is required")
            .matches(
                /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/,
                'Password must contain at least one uppercase letter, one symbol, and one number'
            ),
    });

    const logOut = () => {
        dispatch(logout())
        navigate("/login")
    }

    const handleLogin = async (values, { setSubmitting }) => {
        try {
            setLoader(true)
            const res = await login(values)
            console.log(res, "res")
            if (res.status == 200) {
                successToast("Login Successfully")
                dispatch(setToken(res.data.token))
                dispatch(setUser(res.data.user))
                navigate("home")
            }
            setLoader(false)
            setSubmitting(false)
        } catch (error) {
            setLoader(false)
            setSubmitting(false)
            errorToast(error?.response?.data?.message || error?.message)
        }
    };

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
