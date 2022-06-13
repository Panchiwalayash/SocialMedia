import React, { useContext, useEffect, useState } from 'react'
import './sidebar.css'
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpIcon from '@mui/icons-material/Help';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import Friend from '../friend/Friend'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function Sidebar({ username }) {

  const { user } = useContext(AuthContext)
  const [Users, setUsers] = useState([])

  useEffect(() => {
    const fetchFriends = async () => {
      const list = await axios.get("/user2/friends/" + user._id)
      setUsers(list.data)
    }
    fetchFriends();
  }, [user._id])
  const ProfileSidebar = () => {
    return (
      <>
      </>
    )
  }
  function HomeSidebar() {
    return (
      <>
        <hr className="sidebarWrapperHr" />
        <ul className="sidebarFriendList">
          <h2 className='friendTitle'>Friends</h2>
          {Users.map((u) => (
            <Friend key={u._id} user={u} />
          ))}
        </ul>
      </>
    )
  }

  return (
    <div className='sidebar' style={{
      "::WebkitScrollbars": {
        display: "none"
      }
    }}>
      <div className="sidebarWrapper">
        <ul className="sidebarWrapperList">
          <li className="sidebarListItem">
            <RssFeedIcon className='feedIcon' />
            <span className="sidebarlistitemtext">Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatIcon className='chatIcon' />
            <span className="sidebarlistitemtext">Chats</span>
          </li>
          <li className="sidebarListItem">
            <VideoLibraryIcon className='videoIcon' />
            <span className="sidebarlistitemtext">Videos</span>
          </li>
          <li className="sidebarListItem">
            <GroupIcon className='groupIcon' />
            <span className="sidebarlistitemtext">Groups</span>
          </li>
          <li
            className="sidebarListItem">
            <BookmarkIcon className='bookmarkIcon' />
            <span className="sidebarlistitemtext">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpIcon className='helpIcon' />
            <span className="sidebarlistitemtext">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkIcon className='jobIcon' />
            <span className="sidebarlistitemtext">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <EventIcon className='eventIcon' />
            <span className="sidebarlistitemtext">Events</span>
          </li>

        </ul>
        {username ? <ProfileSidebar /> : <HomeSidebar />}
      </div>
    </div>
  )
}
