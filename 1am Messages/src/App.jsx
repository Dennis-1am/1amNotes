import './App.css'
import Post from './components/post'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import firebase_func from './database/firebase_func'

function App() {

  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  const handlePostClick = (id) => {
    console.log(id)
    navigate(`/post/${id}`)
  }
  
  useEffect(() => {
    firebase_func.getNotes().then((res) => {
      setPosts(res)
    })
  } , [])

  useEffect(() => {
    setPosts(posts)
  } , [posts])

  const sortPostsDate = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      return new Date(b.published_date) - new Date(a.published_date)
    })
    setPosts(sortedPosts)
  }

  const sortPostsLikes = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      return b.likes - a.likes
    })
    setPosts(sortedPosts)
  }

  return (
    <div className='App'>
      <div>
        <h1>Filter</h1>
        <button onClick={() => {sortPostsDate(posts)}}>Date</button>
        <button onClick={() => {sortPostsLikes(posts)}}>Likes</button>
      </div>
      <div className='post-display'>
          {posts.map((post) => (
              <Post
              key={post.id}
              id={post.id}
              title={post.title}
              published_date={post.published_date}
              body={post.body}
              likes={post.likes}
              onClick={() => { handlePostClick(post.id) }}
            />            
          ))}
      </div>
    </div>
  )
}

export default App
