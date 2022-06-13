import React, { useEffect, useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import './profile.css'
import axios from 'axios'

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState({});

  useEffect(() => {
    const FetchUser = async () => {
      const res = await axios.get(`/user2?username=yash`)
      setUser(res.data)
    }
    FetchUser()
  }, [])
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar username={user.username} />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={user.coverPicture ? PF + user.coverPicture : PF + "cover.png"} alt="" className="profileCoverImg" />
              <img src={user.profilePicture ? PF + user.profilePicture : PF + "genProfile.jpg"} className="profileUserImg" />
            </div>

            <div className="profileInfo">
              <div className="profileUsername">{user.username}</div>
              <span className="profileInfo">{user.desc}</span>
            </div>

          </div>
          <div className="profileRightBottom">
            <Feed username={user.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}

