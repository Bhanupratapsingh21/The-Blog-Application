import { useState, useEffect } from "react";
import service from "../Appwrite/config";
import { useSelector } from "react-redux";
import { PostCard } from "../Componets";
import { Link } from "react-router-dom";
function Userdetails() {
    const [post, setPost] = useState([]);
    const [load, setLoad] = useState(true);

    // Fetch user details from Redux state
    const userdata = useSelector((state) => state.auth.userData);
    useEffect(() => {
        // If Userdetails3 is undefined, return early
        // Set user details once available
        service.getpost([]).then((posts) => {
            if (posts) {
                if(userdata.$id){
                    setPost(posts.documents.filter((post) => post.userid === userdata.$id ));
                }
            }
            setLoad(false);
        });
    }, []); // Trigger effect when Userdetails3 changes

    // Render loading indicator if data is still loading
    if (load) {
        return (
            <div className="flex justify-center mt-7 mb-9">
                <div className="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4">
                    <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
                    <div className="flex flex-col gap-2">
                        <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                        <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
                        <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                        <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Render user details once loaded
    return (
        <div>
            <div className="flex justify-center mt-8 mb-10">
                <button id="btn-message" className="button-message">
                    <div className="content-avatar">
                        <div className="status-user"></div>
                        <div className="avatar">
                            <svg className="user-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,12.5c-3.04,0-5.5,1.73-5.5,3.5s2.46,3.5,5.5,3.5,5.5-1.73,5.5-3.5-2.46-3.5-5.5-3.5Zm0-.5c1.66,0,3-1.34,3-3s-1.34-3-3-3-3,1.34-3,3,1.34,3,3,3Z"></path></svg>
                        </div>
                    </div>
                    <div className="notice-content">
                        <div>{userdata.name }</div>
                        <div>{userdata.email}</div>
                    </div>
                </button>
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
            </div>) : (
                <>
                <h2 className="Poststext">Blog's By You</h2> 
                <div className="cardbox">
                    {post.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
                </>
            )}
        </div>
    );
}

export default Userdetails;


/*
 <div>
            
{post.length >= 1 ? <h2 className="Poststext">Blog's By You</h2> : ''}
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
            </div>) : ''}

*/