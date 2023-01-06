import Wrapper from "../assets/wrappers/Landing";
import { Link, Navigate } from "react-router-dom";
import img from "../assets/images/landing.svg";
import { Logo } from "../components";
import { useAppContext } from "../context/appContext";

const Landing = () => {
  const { user } = useAppContext();
  return (
    <>
      {user && <Navigate to="/" />}
      <Wrapper>
        <Logo className="logoRegister" />
        <div className="container page">
          <div className="info">
            <h1>Todo List</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
              aliquid voluptates, explicabo rem nesciunt eum consequuntur
              consectetur veritatis optio amet sunt.
            </p>
            <Link to="/register" className="btn btn-hero">
              Login / Register
            </Link>
          </div>
          <img src={img} alt="job list landing" className="img" />
        </div>
      </Wrapper>
    </>
  );
};

export default Landing;
