import React, { useState, useEffect } from "react";
import service from "../Appwrite/config";
import { PostCard } from "../Componets/index";
import { Link } from "react-router-dom";

function Allposts() {
    const [post, setposts] = useState([])
    const [load, setload] = useState(true)
    useEffect(() => {
        setload(true)
        service.getpost([]).then((posts) => {
            if (posts) {
                setposts(posts.documents.filter((post)=>post.status === 'active'))
            }
            setload(false)
        })
    }, [])
    if(load){
        return(
            <div className="flex justify-center mt-7 mb-9" >
            <div
            className="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4"
        >
            <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
            <div class="flex flex-col gap-2">
                <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
            </div>
        </div>
        </div>
        )
    }
    if (post.length === 0) {
        return (
            <div className="w-full max-h-screen  text-center">
                <div className="flex mt-16 flex-wrap">
                    <div className="p-2 mb-16 w-full">
                        <h1 className="text-2xl font-bold ">
                            It's look Like We Don't have Any Post right Now
                        </h1>
                        <h3>Please Write a Blog Or Check Your Net</h3>
                        <div className="flex justify-center">
                            <Link to='/add-post'>Add Post</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            <h2 className="Poststext">Explore What's Fresh On The Blog</h2>
            <div className="cardbox">
                {post.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Allposts;