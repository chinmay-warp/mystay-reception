import React from 'react'
import { useNavigate } from 'react-router-dom';
import Main from '../../components/HomeScreen/Main'
import { UserContext } from '../../Context/AllContexts';

const HomeScreen = () => {
    const navigate = useNavigate();
    const { userData , setUserData , accessToken , setAccessToken } = React.useContext(UserContext);
    React.useEffect(() => {
      const token = localStorage.getItem("accessToken");
    if(!token && !accessToken){
        navigate("/login");
    }

    if(!accessToken){
      setAccessToken(token);
    }
    if(!userData){
      const getUserData = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/partner/reception`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        });
  
        const data = await response.json();
        console.log(data);
        if (data.success === true && data.data) {
          setUserData(data.data);
        }
      };
      getUserData();
    }},[]);
  return (
    <div>
        <Main />
    </div>
  )
}

export default HomeScreen