import React from 'react'

export default function friend({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <div>
            <li className="sidebarFriend">
                <img src={PF + user.profilePicture} alt="" className="sidebarFriendImg" />
                <span className="sidebarfriendname">{user.username}</span>
            </li>
        </div>
    )
}
