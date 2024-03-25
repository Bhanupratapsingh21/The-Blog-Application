import { useState, useEffect } from "react";
import service from "../Appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostCard } from "../Componets";

function Userdetails() {

    const [post, setpost] = useState([])

    const Userdetails = useSelector((state) => state.auth.userData)
    console.log(Userdetails)
    const [load, setload] = useState(true)
    useEffect(() => {
        setload(true)
        service.getpost([]).then((posts) => {
            if (posts) {
                setpost(posts.documents.filter((post) => post.userid === Userdetails.$id))
            }
            setload(false)
        })
    }, [])
    return (
        <div>
            <div className="flex justify-center mt-8 mb-10" >
            <button id="btn-message" class="button-message">
                    <div class="content-avatar">
                        <div class="status-user"></div>
                        <div class="avatar">
                            <svg class="user-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,12.5c-3.04,0-5.5,1.73-5.5,3.5s2.46,3.5,5.5,3.5,5.5-1.73,5.5-3.5-2.46-3.5-5.5-3.5Zm0-.5c1.66,0,3-1.34,3-3s-1.34-3-3-3-3,1.34-3,3,1.34,3,3,3Z"></path></svg>
                        </div>
                    </div>
                    <div class="notice-content">
                        <div class="">{Userdetails.name}</div>
                        <div class="">{Userdetails.email}</div>
                    </div>
                </button>
            </div>
            {load && (
                <div className="flex justify-center mt-7 mb-9" >
                    <div
                        class="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4"
                    >
                        <div class="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
                        <div class="flex flex-col gap-2">
                            <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                            <div class="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
                            <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                            <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                        </div>
                    </div>
                </div>
            )}
            {post.length >= 1 ? <h2 className="Poststext">Blog's By You</h2> : null}
            <div className="cardbox">
                {post.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            {post.length === 0 ? (<div className="w-full max-h-screen  text-center">
                <div className="flex mt-16 flex-wrap">
                    <div className="p-2 mb-16 w-full">
                        <h1 className="text-2xl font-bold ">
                            It's look Like You Are New Here
                        </h1>
                        <h3>Please Write a Blog On The-Blog</h3>
                        <div className="flex justify-center">
                            <Link to='/add-post'>Add Post</Link>
                        </div>
                    </div>
                </div>
            </div>) : null}
        </div>
    );
}

export default Userdetails