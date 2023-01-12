import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios"
import LogoutButton from "../components/LogoutButton.js"
import { BASE_URL } from "../constants/urls.js"
import PublishLinkr from "../components/PublishLinkr.js"
import RecentsPosts from "../components/RecentsPosts.js"
import HashtagsBox from "../components/HashtagsBox.js"
import Search from "../components/Search.js"
import { useNavigate } from "react-router-dom"

export default function Timeline() {
  const [link, setLink] = useState("")
  const [description, setDescription] = useState("")
  const [publishClicked, setPublishClicked] = useState(false)
  const [logoutClicked, setLogoutClicked] = useState(false)
  const [publishedPosts, setPublishedPosts] = useState()
  const [hashtags, setHashtags] = useState()
  const [attTimeline, setAttTimeline] = useState([])
  const [userData, setUserData] = useState()
  const [liked, setLiked] = useState(true)
  const navigate = useNavigate()

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
      .get(`${BASE_URL}/hashtags`, config)
      .then((res) => {
        setHashtags(res.data)
      })
      .catch((erro) => {
        console.log(erro)
      })

    axios
      .get(`${BASE_URL}/sign-in`, config)
      .then((res) => {
        setUserData(res.data)
      })
      .catch((erro) => {
        console.log(erro)
        localStorage.removeItem("Bearer")
        navigate("/")
      })
  }, [setPublishedPosts, attTimeline])

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
      setAttTimeline([...attTimeline, 1])
      console.log(timelineData)
      alert("publicado")
      setPublishClicked(false)
    } catch (err) {
      alert("Houve um erro ao publicar seu link")
      console.log(err)
      setPublishClicked(false)
    }
  }

  return (
    <Container onClick={() => logoutClicked && setLogoutClicked(false)}>
      <Header>
        <h1 onClick={() => navigate("/timeline")}>linkr</h1>
        <Search />
        <LogoutButton
          userData={userData}
          logoutClicked={logoutClicked}
          setLogoutClicked={setLogoutClicked}
        />
      </Header>
      <ContainerTimeline>
        <TimelinePosts>
          <h1>timeline</h1>
          <CurrentPost>
            <UserImage src={userData && userData.picture} />
            <PublishLinkr
              description={description}
              setDescription={setDescription}
              link={link}
              setLink={setLink}
              publishClicked={publishClicked}
              postLinkr={postLinkr}
            />
          </CurrentPost>

          {publishedPosts === 0 ? (
            alert("There are no posts yer")
          ) : (
            <RecentsPosts
              publishedPosts={publishedPosts}
              setPublishedPosts={setPublishedPosts}
              liked={liked}
              setLiked={setLiked}
              userData={userData}
              setUserData={setUserData}
              setAttTimeline={setAttTimeline}
              attTimeline={attTimeline}
            />
          )}
        </TimelinePosts>
        <HashtagsBox hashtags={hashtags} />
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
    cursor: pointer;
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
  @media (max-width: 900px) {
    width: 100%;
  }
`

const CurrentPost = styled.div`
  height: 32%;
  width: 100%;
  padding-top: 2%;
  border-radius: 16px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  overflow: hidden;
    @media (max-width: 900px) {
    border-radius: 0px;
  }
`

const UserImage = styled.img`
  height: 65px;
  width: 65px;
  border-radius: 50%;
`
