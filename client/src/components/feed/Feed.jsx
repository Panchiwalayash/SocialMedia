import React, { useContext, useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'
import axios from "axios"
import '../post/post.css'
import { AuthContext } from "../../context/AuthContext"

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/post2/profile/" + user.username)
        : await axios.get("post2/timeline/" + user._id)
      setPosts(res.data)
    }

    fetchPosts()
  }, [username, user._id])
  return (
    <div className='feed'>
      {!username ? <Share /> : ""}
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))
      }
    </div>
  )
}
