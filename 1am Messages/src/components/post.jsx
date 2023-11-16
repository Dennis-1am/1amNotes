import propTypes from 'prop-types'
import './components-styles/post.css'
import {useState} from "react";
import dbFunctions from '../database/firebase_func';

function Post(props) {
    const [likes, setLikes] = useState(props.likes)
    const [contentHidden, setContentHidden] = useState(true)
    console.log('Post component received onClick prop:', props.onClick);

    const handleLikes = () => {
        setLikes(likes + 1)
       dbFunctions.updateLikeCount(props.id, likes + 1)
    }
    const toggleContentVisibility = () => {
        setContentHidden(!contentHidden)
    }

    return (
        <div className='post-card' >
            <div className='post-info' onClick={props.onClick}>
                <h2>{props.title}</h2>
                <p>{props.published_date}</p>
            </div>
            <div className='post-bottom'>
                <p onClick={handleLikes}>Likes: {likes}</p>
                <p className={`post-content ${contentHidden ? 'post-content-hidden' : 'post-content-visible'}`}>
                    {props.body}
                </p>
                {props.body.length > 200 ? <p className="post-readMore" onClick={toggleContentVisibility}> Read More </p> : null}
                <hr></hr>
            </div>
        </div>
    )
}

Post.propTypes = {
    id: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    body: propTypes.string.isRequired,
    published_date: propTypes.string.isRequired,
    likes: propTypes.number.isRequired,
    onClick: propTypes.func.isRequired
}

export default Post
