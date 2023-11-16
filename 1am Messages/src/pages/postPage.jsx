import './page-styles/postPage.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import dbFunctions from '../database/firebase_func';
import { useNavigate } from 'react-router-dom'

function PostPage() {
  // your code here

  const navigate = useNavigate()
  const { id } = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [submitComment, setSubmitComment] = useState('')
  
  const handleCommentSubmit = () => {
    const tempComments = [submitComment, ...(comments || [])];
    setComments(tempComments);
    console.log(tempComments);
    dbFunctions.addComment(id, tempComments)
  }


  const handleEditClick = () => {
    navigate(`/edit/${id}`)
  }

  useEffect(() => {
    dbFunctions.getNoteById(id).then((res) => {
      setPost(res)
    })
  }, [id])

  useEffect(() => {
    if (post.comments != undefined) {
      setComments(post.comments)
    }
  }, [post])

  const handleLikes = () => {
    dbFunctions.updateLikeCount(id, post.likes + 1)
    setPost({ ...post, likes: post.likes + 1 })
  }

  const handleDeleteClick = () => {
    dbFunctions.deleteNoteById(id)
    navigate('/')
  }

  return (
    <div className="postPage-container">
      <div className="postPage-post">
        <h2>{post.title}</h2>
        <p>{post.published_date}</p>
        <p>{post.body}</p>
        <p onClick={handleLikes}>Likes: {post.likes}</p>
      </div>
      <div className='comment-box'>
        <input type="text" placeholder="Comment" onChange={(e) => { setSubmitComment(e.target.value) }} />
        <button onClick={handleCommentSubmit}>Submit Comment</button>
        <button onClick={handleEditClick}>
          Edit
        </button>
        <button onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
      <div>
        <div>
          {comments != undefined ? (
            comments.map((comment, index) => (
              <div className="comment" key={index}>
                <p>{comment}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostPage;
