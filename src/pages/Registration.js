import styled from "styled-components";
import { black, grey, blue } from "../constants/colors";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/urls";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

export default function Login() {
  const [registry, setRegistry] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function register(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const request = await axios.post(`${BASE_URL}/sign-up`, registry);
      localStorage.setItem("Bearer", request.data);
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.response.status === 404) {
        alert(error.response.data);
      }
      if (error.response.status === 409) {
        alert(error.response.data);
      }
      if (error.response.status === 401) {
        alert(error.response.data);
      }
      console.log(error);
    }
  }

  return (
    <Container>
      <LeftSide>
        <BoxLogo>
          <TextLogo>linkr</TextLogo>
          <BoxDescription>
            <TextDescription>
              save, share and discover the best links on the web
            </TextDescription>
          </BoxDescription>
        </BoxLogo>
      </LeftSide>
      <RightSide>
        <form onSubmit={register}>
          <input
            data-identifier="input-email"
            placeholder="e-mail"
            type="email"
            required
            disabled={loading}
            onChange={(e) =>
              setRegistry({ ...registry, email: e.target.value })
            }
          />
          <input
            data-identifier="input-password"
            placeholder="password"
            type="password"
            required
            disabled={loading}
            onChange={(e) =>
              setRegistry({ ...registry, password: e.target.value })
            }
          />
          <input
            data-identifier="input-username"
            placeholder="username"
            type="name"
            required
            disabled={loading}
            onChange={(e) =>
              setRegistry({ ...registry, username: e.target.value })
            }
          />
          <input
            data-identifier="input-picture"
            placeholder="picture url"
            type="text"
            required
            disabled={loading}
            onChange={(e) =>
              setRegistry({ ...registry, picture: e.target.value })
            }
          />
          <Button disabled={loading} type="submit" data-identifier="login-btn">
            {loading ? <ThreeDots color="white" height="10px" /> : "Sign Up"}
          </Button>
        </form>
        <Link to={`/`}>
          <p data-identifier="sign-up-action">Switch back to log in</p>
        </Link>
      </RightSide>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
  justify-content: center;
  height: 100vh;
  background-color: ${grey};
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  input {
    width: 70%;
    height: 45px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-weight: 400;
    font-size: 19.976px;
    margin-bottom: 6px;
    outline: none;
    background-color: "#ffffff";
    padding-left: 11px;
  }
  input::placeholder {
    color: "#9F9F9F";
    font-family: "Oswald";
    font-style: normal;
    font-weight: 300;
    font-size: 27px;
  }
  img {
    margin-bottom: 40px;
  }
  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-decoration-line: underline;
    color: #FFFFFF
  }
`;

const Button = styled.button`
  width: 70%;
  height: 45px;
  background: ${blue};
  border-radius: 4.63636px;
  border: none;
  font-family: "Oswald";
  font-weight: 400;
  font-size: 27px;
  color: #ffffff;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
`

const LeftSide = styled.div`
  background-color: ${black};
  width: 65%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoxLogo = styled.div`
  width: 60%;
  height: 40vh;
`;
const TextLogo = styled.text`
  font-family: "Passion One";
  font-size: 106px;
  font-weight: 700;
  line-height: 117px;
  text-align: left;
  color: #ffffff;
`;
const BoxDescription = styled.div`
  width: 65%;
  height: 50vh;
`;
const TextDescription = styled.text`
  font-family: "Oswald";
  font-size: 43px;
  font-weight: 700;
  line-height: 64px;
  text-align: left;
  color: #ffffff;
`;
