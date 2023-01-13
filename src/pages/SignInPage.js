import styled from "styled-components"
import { black, grey, blue } from "../constants/colors"
import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../constants/urls"
import { Link, useNavigate } from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"

export default function Login() {
  const [registry, setRegistry] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Bearer")}`,
      },
    }
    axios
      .get(`${BASE_URL}/sign-in`, config)
      .then(() => {
        navigate("/timeline")
      })
      .catch(() => {})
  }, [])

  async function register(event) {
    event.preventDefault()
    setLoading(true)
    try {
      const request = await axios.post(`${BASE_URL}/sign-in`, registry)
      localStorage.setItem("Bearer", request.data.token)
      navigate("/timeline")
    } catch (error) {
      setLoading(false)
      if (error.response.status === 422) {
        alert(error.response.data)
      }
      if (error.response.status === 409) {
        alert(error.response.data)
      }
      if (error.response.status === 401) {
        alert(`${error.response.data}
        e-mail ou senha incorretos`)
      }
      if (error.response.status === 404) {
        alert(`${error.response.data}
        e-mail ou senha incorretos`)
      }
      console.log(error)
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
          <Button disabled={loading} type="submit" data-identifier="login-btn">
            {loading ? <ThreeDots color="white" height="10px" /> : "Entrar"}
          </Button>
        </form>
        <Link to={`/registration`}>
          <p>First time? Create an account!</p>
        </Link>
      </RightSide>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
  justify-content: center;
  height: 100vh;
  background-color: ${grey};
  @media (max-width: 900px) {
    width: 100%;
    height: 70vh;
    justify-content: flex-start;
    padding-top: 20%;
  }
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
    @media (max-width: 900px) {
      width: 90%;
    }
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
    color: #ffffff;
    @media (max-width: 900px) {
      font-size: 20px;
      margin-top: 5%;
    }
  }
`
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
  @media (max-width: 900px) {
    width: 90%;
  }
`

const LeftSide = styled.div`
  background-color: ${black};
  width: 65%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    width: 100%;
    height: 30vh;
  }
`
const BoxLogo = styled.div`
  width: 60%;
  height: 40vh;
  @media (max-width: 900px) {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`
const TextLogo = styled.text`
  font-family: "Passion One";
  font-size: 106px;
  font-weight: 700;
  line-height: 117px;
  text-align: left;
  color: #ffffff;
  @media (max-width: 900px) {
    font-size: 73px;
    text-align: center;
    line-height: 100px;
  }
`
const BoxDescription = styled.div`
  width: 65%;
  height: 50vh;
  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    height: 50%;
  }
`
const TextDescription = styled.text`
  font-family: "Oswald";
  font-size: 43px;
  font-weight: 700;
  line-height: 64px;
  text-align: left;
  color: #ffffff;
  @media (max-width: 900px) {
    font-size: 23px;
    line-height: 34px;
    text-align: center;
  }
`
