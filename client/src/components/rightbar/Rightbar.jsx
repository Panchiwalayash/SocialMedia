import React, { useEffect, useState } from 'react'
import './rightbar.css'
import Trend from '../trend/Trend'
import Online from '../online/Online'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


export default function Rightbar(props) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const { user } = props;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [friend, setFriend] = useState([])

  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?.id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/user2/friends/" + currentUser._id);
        setFriend(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  function ProfileRightbar() {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFolow" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings" >
          {friend.map((f) => (

            <div className="rightbarFollowing" key={f._id}>
              <img
                src={f.profilePicture ? PF + f.profilePicture : PF + "person/genProfile.jpg"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{f.username}</span>
            </div>

          ))}
        </div>
      </>
    )
  }

  function HomeRightbar() {
    return (
      <>
        <div className="birthdayContainer">
          <img src={`${PF}gift.png`} alt="" className="birthdayImg" />
          <span className="birthdayText"> Vicky Modi and 5 other friends have birthday today</span>
        </div>
        <div className="rightbarAdv">
          <img src={PF + "/ad.png"} alt="" className="advImg" />
        </div>
        <div className="rightbarOnlineFriend">
          <div className="onlineFriendTitle">Online Friends</div>
          {friend.map((f) => (
            <Online key={f._id} friends={f} />
          ))}
          <hr className="onlineHr" />
          <div className="onlineFriendTitle">Current Trends</div>
          <Trend />
        </div>
      </>
    )
  }


  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
