import appwriteService from '../appwrite/config'; // This is to get the image from the Store (Bucket)
import { Link } from 'react-router-dom'; // Link the card to detail page

function PostCard({ $id, title, featuredImage }) {
    // $id is the Post ID. Name of this variable is '$id'
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
