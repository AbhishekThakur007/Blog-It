import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/usercontext';

const Profile = () => 
{
    const { id } = useParams();
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [profile, setProfile] = useState(null); 
  
    useEffect(() => {
      const fetchProfile = async () => 
      {
        const response = await fetch(`http://127.0.0.1:5000/api/v1/auth/${id}`, {
          headers: { token: localStorage.getItem('token') },
        });
        if (response.ok) 
        {
          const data = await response.json();
          setProfile(data);
        } 
        else 
        {
          navigate('/');
        } 
      };
      fetchProfile();
    }, []);
  
    // add a check to make sure profile is not null before accessing its properties
    if (!profile) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="profile-page">
        <div className='prof_det'>
          <h1 className='prof_detail'>{profile.name}</h1>
          <p className='prof_detail'>{profile.email}</p>
          <p className='prof_detail'>Total Likes {profile.likes}</p>
        </div>
  
        <div className="prof_image">
          <img className = "proff_image" src={`http://localhost:5000/${profile.photo}`} alt="error" />
        </div>
        <div  style={{display:'flex', justifyContent:'center'}}>
          {userInfo.id === id && (
            <div className=""  style={{display:'flex', justifyContent:'space-evenly'}}>
              <Link className="" style={{margin:'2px', textDecorationLine:'none',marginInline:'5px'}} to={`/editprofile/${id}`}>
                <button> Edit Profile</button>
              </Link>
              <Link className="" style={{margin:'2px', textDecorationLine:'none',marginInline:'5px'}} to={`/updatePassword/${id}`}>
                <button> Change Password</button>
              </Link>
              <Link className="" style={{margin:'2px', textDecorationLine:'none',marginInline:'5px'}} to={`/savedPosts/${userInfo.id}`}>
                <button> Saved Blogs</button>
              </Link>
              <Link className="" style={{margin:'2px', textDecorationLine:'none',marginInline:'5px'}} to={`/allPost/${id}`}>
                <button> Your Blogs</button>
              </Link>
            </div>
          )}
          <Link className="" style={{ textDecorationLine:'none', marginTop:'2px', marginInline:'5px'}} to={`/allPost/${id}`}>
            {userInfo.id !== id && <button> User Blogs</button>}
          </Link>
        </div>
      </div>
    );
  };
  
export default Profile
