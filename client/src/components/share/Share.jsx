import React, { useContext, useRef, useState } from 'react'
import './share.css'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import Label from '@mui/icons-material/Label';
import Room from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { AuthContext } from '../../context/AuthContext';
import { axios } from 'axios'

export default function Share() {
    const { user } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef()
    const [file, setFile] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        {
            if (file) {
                const data = new FormData();
                const fileName = Date.now() + file.name;
                data.append("file", file)
                data.append("name", fileName)
                newPost.img = fileName
                try {
                    await axios.post("/upload", data)
                } catch (err) {
                    console.log(err)
                }
            }
        }
        try {
            await axios.post("/post2", newPost)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "genProfile.jpg"} alt="" className="shareProfile" />
                    <input placeholder={"Share your thought " + user.username} className="shareInput" ref={desc} />
                </div>
                <hr className="shareHr" />
                <form className="shareBottom" >
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <PermMediaIcon htmlColor="red" className='shareIcon' />
                            <span className="shareOptionText">Photo or Video</span>
                            <input style={{ display: "none" }} type="file" id="file" accept='.png,.jpeg,.jpg' onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="purple" className='shareIcon' />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="blue" className='shareIcon' />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotionsIcon htmlColor="yellow" className='shareIcon' />
                            <span className="shareOptionText">Emoji</span>
                        </div>
                    </div>
                </form>
                <div className="shareButton">
                    <button className='shareBtn' type='submit' onClick={submitHandler}>Share Post</button>
                </div>
            </div>
        </div>
    )
}
