import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios"
import LogoutButton from "../components/LogoutButton.js"
import { BASE_URL } from "../constants/urls.js"

export default function Timeline() {
  const [link, setLink] = useState("")
  const [description, setDescription] = useState("")
  const [publishClicked, setPublishClicked] = useState(false)
  const [logoutClicked, setLogoutClicked] = useState(false)
  // const [imageUser, setImageUser] = useState("");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Bearer")}`,
      },
    }
    axios
      .get(`${BASE_URL}/timeline`, config)
      .then((res) => {
        console.log(res)
      })
      .catch((erro) => {
        console.log(erro)
      })
  }, [])

  async function postLinkr(e) {
    e.preventDefault()
    setPublishClicked(true)
    const body = { link, description }
    try{
      const timelineData = await axios
      .post(`${BASE_URL}/timeline`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Bearer")}`,
        },
      })
      setDescription("")
      setLink("")
      console.log(timelineData)
      alert("oi")
    } catch(err){
      alert("Houve um erro ao publicar seu link")
      console.log(err)
      setPublishClicked(false)
    }

  }

  return (
    <Container onClick={() => logoutClicked && setLogoutClicked(false)}>
      <Header>
        <h1>linkr</h1>
        <LogoutButton
          logoutClicked={logoutClicked}
          setLogoutClicked={setLogoutClicked}
        />
      </Header>
      <ContainerTimeline>
        <TimelinePosts>
          <h1>timeline</h1>
          <CurrentPost>
            <UserImage />
            {publishClicked ? (
              <Description>
                <h2>What are you going to share today?</h2>
                <InputLink
                  placeholder="http://..."
                  required
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                  disabled
                />
                <InputDescription
                  placeholder="Awesome article about #javascript"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  disabled
                />
                <PublishButt disabled color={`#333333`} cursor={""}>
                  Publishing...
                </PublishButt>
              </Description>
            ) : (
              <Description>
                <h2>What are you going to share today?</h2>
                <InputLink
                  placeholder="http://..."
                  required
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                />
                <InputDescription
                  placeholder="Awesome article about #javascript"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
                <PublishButt
                  onClick={postLinkr}
                  color={`#1877F2`}
                  cursor={"pointer"}
                >
                  Publish
                </PublishButt>
              </Description>
            )}
          </CurrentPost>
        </TimelinePosts>
        <Trendings>
          <h1>trending</h1>
        </Trendings>
      </ContainerTimeline>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #333333;
`

const Header = styled.div`
  height: 10vh;
  background-color: #151515;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  h1 {
    font-family: "Passion One", cursive;
    font-size: 52px;
    color: white;
    margin-left: 2%;
  }
`

const ContainerTimeline = styled.div`
  padding-top: 3%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 60%;
`

const TimelinePosts = styled.div`
  width: 50%;
  height: 100vh;

  h1 {
    font-family: "Oswald", sans-serif;
    color: white;
    font-size: 43px;
    margin: 0 0 5% 0;
  }
`

const Trendings = styled.div`
  width: 25%;
  height: 70vh;
  margin: 5% 0 0 5vw;
  border-radius: 4%;
  background-color: #171717;
  overflow: hidden;

  h1 {
    font-family: "Oswald", sans-serif;
    color: white;
    font-size: 35px;
    margin: 4%;
  }
`

const CurrentPost = styled.div`
  height: 40%;
  width: 100%;
  padding-top: 2%;
  border-radius: 10px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  flex-direction: row;

  overflow: hidden;
`

const UserImage = styled.image`
  height: 27%;
  width: 11%;
  border-radius: 50%;
  background-color: green;
`

const Description = styled.div`
  height: 40%;
  width: 80%;

  h2 {
    color: #707070;
    font-family: "Lato", sans-serif;
    font-size: 20px;
  }
`

const InputLink = styled.input`
  margin-top: 5%;
  height: 40%;
  width: 100%;
  border: none;
  background-color: #efefef;
`

const InputDescription = styled.input`
  margin-top: 3%;
  height: 70%;
  width: 100%;
  border: none;
  background-color: #efefef;
`

const PublishButt = styled.button`
  background-color: ${(props) => props.color};
  margin: 3% 0 0 80%;
  width: 8vw;
  height: 4vh;
  border: none;
  border-radius: 5px;
  color: white;
  font-family: "Lato";
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  cursor: ${(props) => props.cursor};
`
