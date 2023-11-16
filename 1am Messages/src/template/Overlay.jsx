import { useState } from 'react'
import './template-styles/Overlay.css'
import dbFunctions from '../database/firebase_func.js'
import { useNavigate } from 'react-router-dom'


function Overlay() {

    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {

        e.preventDefault()

        // make sure that the title and body are not empty
        try {
            if (postTitle.trim().length < 1) {
                throw new Error('Title is empty', postTitle);
            }
            if (postBody.trim().length < 1) {
                throw new Error('Body is empty', postBody);
            }
        } catch (err) {
            alert(err.message);
            return;
        }        

        dbFunctions.addNewNote({
            title: postTitle,
            body: postBody,
            published_date: new Date().toLocaleDateString(),
            likes: 0,
        })

        setPostTitle('')
        setPostBody('')
        navigate('/')
    }

    return (
        <>
            <div className="overlay-general">
                <div className='create-post'>
                    <p>Create Post</p>
                    <hr />
                    <form>
                        <input type='text' id='title' name='title' placeholder='Title' onChange={(e) => {
                            setPostTitle(e.target.value)
                        }} />
                        <textarea id='body' name='body' placeholder='I really hate professors who do not respond to email very annoying ...' onChange={(e) => {
                            setPostBody(e.target.value)
                        }} />
                        <button type='submit' onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Overlay