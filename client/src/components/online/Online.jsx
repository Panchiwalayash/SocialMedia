import React from 'react'
import './online.css'

export default function Online({ friends }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER


  return (

    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={PF + friends.profilePicture} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{friends.username}</span>
    </li>

  )


}
