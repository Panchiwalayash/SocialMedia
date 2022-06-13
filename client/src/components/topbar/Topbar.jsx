import "./topbar.css"
import NotificationsIcon from '@mui/icons-material/Notifications'
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext'

export default function Topbar() {
  const { user } = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className="topbar">
      <div className="topbarLeft">
        <Link to='/' style={{ 'textDecoration': "none" }}>
          <span className="logo">Social Media</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input placeholder="Search" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLink">

        </div>
        <div className="topbarIcons">
          <span className="topbarIconItem">
            <PersonIcon className="personIcon" />
            <span className="topbarIconBadge">1</span>
          </span>
          <span className="topbarIconItem">
            <ChatIcon className="chatIcon" />
            <span className="topbarIconBadge">1</span>
          </span>
          <span className="topbarIconItem">
            <NotificationsIcon className="notificationIcon" />
            <span className="topbarIconBadge">1</span>
          </span>
        </div>
        <Link to={'/profile/' + user.username}>
          <img src={user.profilePicture ? PF + user.profilePicture : PF + "genProfile.jpg"} alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  )
}
