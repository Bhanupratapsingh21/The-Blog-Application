import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../Appwrite/config";
import { Button, Container } from "../Componets/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const toast = useToast()
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userid === userData.$id || userData.userData$id : false;


    useEffect(() => {
        if (slug) {
            service.getpost(slug).then((post) => {
                if (post) {
                    setPost(post);
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletepost(post.$id).then((status) => {
            if (status) {
                toast({
                    title: "Deleted Succesfully",
                    position: 'top',
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                service.deletefile(post.featuredImage);
                navigate("/");
            }
        });
    };
    return post ? (
        <div className="cardpost">
            <div className="card2post">
                <img
                    src={service.getfilepreview(post.featuredImage)}
                    alt={post.tittle}
                    className="imgpost mt-5 flex justify-center"
                />
                {isAuthor && (
                    <div className="boxbuttons">
                        <Link to={`/edit-post/${post.$id}`}>
                        <button className='buttonedit'> 
                        Edit Post
                        </button>
                        </Link>
                        <button onClick={deletePost} className="buttonpost">
                            <svg viewBox="0 0 448 512" className="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                        </button>
                    </div>
                )}
                <div className="w-full mb-6">
                    <h1 className="text-3xl text-center">{post.tittle}</h1>
                </div>
                <div className="browser-css">
                    <h2 className="text-left mt-3 mb-5 text-3xl"></h2>
                    <div className="text-center mb-4 text-2xl">
                    {parse(post.Content)}
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    ) : null;
}