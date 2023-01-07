import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios"
import LogoutButton from "../components/LogoutButton.js"
import { BASE_URL } from "../constants/urls.js"
import PublishLinkr from "../components/PublishLinkr.js"
import RecentsPosts from "../components/RecentsPosts.js"
import HashtagsBox from "../components/HashtagsBox.js"

export default function Timeline() {
  const [link, setLink] = useState("")
  const [description, setDescription] = useState("")
  const [publishClicked, setPublishClicked] = useState(false)
  const [logoutClicked, setLogoutClicked] = useState(false)
  const [publishedPosts, setPublishedPosts] = useState()
  const [hashtags, setHashtags] = useState()

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Bearer")}`,
      },
    }
    axios
      .get(`${BASE_URL}/timeline`, config)
      .then((res) => {
        setPublishedPosts(res.data)
      })
      .catch((erro) => {
        console.log(erro)
      })
      axios
      .get(`${BASE_URL}/hashtag`, config)
      .then((res) => {
        setHashtags(res.data)
      })
      .catch((erro) => {
        console.log(erro)
      })
  }, [])

  async function postLinkr(e) {
    e.preventDefault()
    setPublishClicked(true)
    const body = { link, description }
    try {
      const timelineData = await axios.post(`${BASE_URL}/timeline`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Bearer")}`,
        },
      })
      setDescription("")
      setLink("")
      console.log(timelineData)
      alert("oi")
    } catch (err) {
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
            <PublishLinkr
              description={description}
              setDescription={setDescription}
              link={link}
              setLink={setLink}
              publishClicked={publishClicked}
              postLinkr={postLinkr}
            />
          </CurrentPost>
          <RecentsPosts
            publishedPosts={publishedPosts}
            setPublishedPosts={setPublishedPosts}
          />
        </TimelinePosts>
        <HashtagsBox hashtags={hashtags}/>
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

  overflow: scroll;
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
