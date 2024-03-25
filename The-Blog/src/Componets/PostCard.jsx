import React from "react";
import service from "../Appwrite/config";
import { Link } from 'react-router-dom'

function PostCard({ $id, tittle, featuredImage, $createdAt }) {
    
    const handledate = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const dateOptions = { day: '2-digit', month: '2-digit', year: '2-digit' };
        const formattedDate = dateTime.toLocaleDateString('en-US', dateOptions);
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
        const formattedTime = dateTime.toLocaleTimeString('en-US', timeOptions);
        const formattedDateTime = `By Our User At: ${formattedTime} , ${formattedDate} `;
        return formattedDateTime;
    }

    return (
        <Link to={`/post/${$id}`}>
            <div className="postcards relative flex w-80 mt-8 flex-col rounded-xl bg-white  bg-clip-border text-gray-700 shadow-md">
                <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                    <img src={service.getfilepreview(featuredImage)} alt={tittle} className='rounded-xl' />
                </div>
                <div className="p-6">
                    <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-black antialiased">
                        Tittle: {tittle}
                    </h5>
                    <p className="block font-sans text-base font-dark leading-relaxed text-inherit antialiased">
                         {handledate($createdAt)}
                    </p>
                </div>
                <div className="p-6 pt-0">
                    <button data-ripple-light="true" type="button" className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Read More
                    </button>
                </div>
            </div>
        </Link>
    )
}
export default PostCard