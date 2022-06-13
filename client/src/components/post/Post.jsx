import React, { useContext, useEffect, useState } from 'react'
import './post.css'
import MoreVert from '@mui/icons-material/MoreVert';
import axios from 'axios'
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';


export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length)
    const [isLike, setIsLike] = useState(false)
    const [user, setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const { user: currentUser } = useContext(AuthContext)

    useEffect(() => {
        setIsLike(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/user2?userId=${post.userId}`);
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);

    function likeHandler() {
        try {
            axios.put('/post2/' + post._id + '/like', { userId: currentUser._id })
        } catch (error) {
            console.log(error)
        }
        setLike(isLike ? like - 1 : like + 1);
        setIsLike(!isLike);
    }
    return (
        <>
            <div className='post'>
                <div className="postWrapper">
                    <div className="postTop">
                        <div className="postTopLeft">
                            <Link to={`profile/${user.username}`}>
                                <img src={user.profilePicture ? PF + user.profilePicture : PF + "genProfile.jpg"} alt="" className="postTopImg" />
                            </Link>
                            <span className="postUserName">{user.username}</span>
                            <span className="postDate"></span>
                        </div>
                        <div className="postTopRight">
                            <MoreVert className='moreVertIcon' />
                        </div>
                    </div>
                    <div className="postMiddle">
                        <span className="postMiddleText">{post?.desc}</span>
                        <img src={PF + post.img} alt="" className="postMiddleImage" />
                    </div>
                    <div className="postBottom">
                        <div className="postBottomLeft">
                            <img className="postLikeIcon" src={PF + "like.png"} alt="" onClick={likeHandler} />
                            <img className="postLikeIcon" src={PF + "heart.png"} alt="" onClick={likeHandler} />
                            <span className="postLikeCounter">{like} people liked it</span>
                        </div>
                        <div className="postBottomRight">
                            <span className="postComment">{post.comment} comments</span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
