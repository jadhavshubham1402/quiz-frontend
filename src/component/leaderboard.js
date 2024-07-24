// ScoreTable.js

import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { getAllUser } from '../service/axiosInstance';
import { errorToast } from '../toastConfig';
import "./style.css";

const LeaderBoardTable = () => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
    const [userScores, setUserScore] = useState([])

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const getAllUserData = async () => {
        try {
            setLoader(true)
            const res = await getAllUser({ page: currentPage })
            if (res.status == 200) {
                setUserScore(res.data.data)
            }
            setLoader(false)
        } catch (error) {
            setLoader(false)
            errorToast(error?.response?.data?.message || error?.message)
        }
    };

    useEffect(() => {
        getAllUserData()
    }, [currentPage])
    return (
        <div className="overflow-x-auto m-10">
            <div className='flex justify-between my-2'>
                <div className="my-3 flex flex-col text-3xl font-bold">Leader Board</div>
                <button
                    type="submit"
                    onClick={() => navigate("/home")}
                    className="linear flex flex-col items-center mt-2 w-[20%] rounded-xl bg-[#2B7A0B] py-[10px] text-lg font-medium text-white"
                >
                    Back To Home
                </button>
            </div>
            <table className="min-w-full bg-white border border-gray-200 rounded-sm">
                <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="text-left py-2 px-3 border-r border-gray-200">Sr No.</th>
                        <th className="text-left py-2 px-3 border-r border-gray-200">Name</th>
                        <th className="text-left py-2 px-3 border-r border-gray-200">Javascript</th>
                        <th className="text-left py-2 px-3 border-r border-gray-200">Java</th>
                        <th className="text-left py-2 px-3 border-r border-gray-200">Python</th>
                    </tr>
                </thead>
                <tbody>
                    {userScores.map((user, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="text-left py-3 px-3 border-r border-gray-200">{index + 1}</td>
                            <td className="text-left py-3 px-3 border-r border-gray-200">{user.name}</td>
                            <td className="text-left py-3 px-3 border-r border-gray-200">{user.topicScore[0].score}</td>
                            <td className="text-left py-3 px-3 border-r border-gray-200">{user.topicScore[1].score}</td>
                            <td className="text-left py-3 px-3 border-r border-gray-200">{user.topicScore[2].score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate
                className="item-center flex justify-end gap-2 pt-3 text-lg drop-shadow-sm"
                previousLabel={<p className="px-2 py-0.5 border rounded-sm border-white-300 bg-white text-[#000000] flex item-center justify-center hover:bg-[#2B7A0B] hover:text-white min-w-8">Prev</p>}
                nextLabel={<p className="px-2 py-0.5 border rounded-sm border-white-300 bg-white text-[#000000] flex item-center justify-center hover:bg-[#2B7A0B] hover:text-white min-w-8">Next</p>}
                breakLabel="..."
                breakClassName="break-me"
                pageCount={Math.ceil(userScores.length / 10)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                activeClassName={
                    "custom-active"
                }
                pageClassName={
                    "rounded-sm custom-page flex item-center justify-center hover:bg-[#2B7A0B] hover:text-white"
                }
                pageLinkClassName={
                    "px-2 py-0.5 rounded-sm min-w-8 flex items-center justify-center hover:bg-[#2B7A0B] hover:text-white"
                }
                onPageActive={(data) => (
                    <p className="px-2 py-0.5 rounded-sm min-w-8 flex items-center justify-center hover:bg-[#2B7A0B] hover:text-white">
                        {data.page + 1} {/* Assuming page indexes start from 0 */}
                    </p>
                )}
            />
        </div>
    );
};

export default LeaderBoardTable;
