import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";

const Logout = () => {
  const { setIsLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();


  useEffect(() => {

    localStorage.removeItem('token');
    setIsLoggedIn(false)
    navigate('/')
  }, [navigate, setIsLoggedIn])



  return (
    <div>Redirecting</div>
  )
};

export default Logout;