import { useState } from 'react'
import './template-styles/Overlay.css'
import dbFunctions from '../database/firebase_func.js'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function OverlayEdit() {

    const navigate = useNavigate()
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const { id } = useParams()

    const handleSubmit = (e) => {

        e.preventDefault()
        try {
            if (postTitle.length < 1) {
                throw new Error('Title is empty')
            }
            if (postBody.length < 1) {
                throw new Error('Body is empty')
            }
        } catch (err) {
            alert(err)
            return
        }

        dbFunctions.updatePost({
            id: id,
            title: postTitle,
            body: postBody,
        })

        setPostTitle('')
        setPostBody('')
    }

    const handleCancel = () => {
        navigate(`/post/${id}`)
    }

    return (
        <>
            <div className="overlay-general">
                <div className='create-post'>
                    <p>Edit Post</p>
                    <hr />
                    <form>
                        <input type='text' id='title' name='title' placeholder='Title' onChange={(e) => {
                            setPostTitle(e.target.value)
                        }} />
                        <textarea id='body' name='body' placeholder='New updates on why I hate this professor....' onChange={(e) => {
                            setPostBody(e.target.value)
                        }} />
                        <div className='button'>
                            <button type='submit' onClick={handleSubmit}>Submit</button>
                            <button type='cancel' onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default OverlayEdit