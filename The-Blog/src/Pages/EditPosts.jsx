import { useEffect, useState } from "react";
import service from "../Appwrite/config";
import { Container, Postform } from "../Componets";
import { useNavigate, useParams } from "react-router-dom";

function EditPosts() {
    const [post, setposts] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            
            service.getpost(slug).then((post) => {
                if (post) {
                    setposts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <Postform post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPosts