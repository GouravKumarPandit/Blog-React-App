import React, {useEffect, useState} from 'react';
import {Container, PostForm} from '../components';
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null);
    const {slug} = useParams(); // Taking value(slug) from the URL
    const navigate = useNavigate();

    useEffect(() => {
        // Fetching edit post data
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : (
        <div className='py-8'>
            <Container>
                <h3 className='bg-red-500 text-white py-8 px-5 text-2xl'>Post Not Found!</h3>
            </Container>
        </div>
    );
}

export default EditPost