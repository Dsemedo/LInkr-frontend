import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { lightGrey } from "../constants/colors";
import HeartLiked from "../assets/images/HeartLiked.png";
import HeartUnliked from "../assets/images/HeartUnliked.png";
import DeletePost from "../assets/images/DeletePost.png";
import EditPost from "../assets/images/EditPost.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../constants/urls.js";
import Modal from "react-modal";

export default function RecentsPosts({
  setPublishedPosts,
  publishedPosts,
  setLiked,
  liked,
  setUserData,
  userData,
}) {
  const navigate = useNavigate();
  const [edited, setEdited] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [idSelected, setIdSelected] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [newLink, setNewLink] = useState("");
  const [loading, setLoading] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "350px",
      height: "150px",
      background: "#333333",
      borderRadius: "50px",
      transform: "translate(-50%, -50%)",
      display: "flex",
      alignItens: "center",
      justifyContent: "space-around",
      flexDirection: "column",
    },
  };

  let subtitle;

  Modal.setAppElement(document.getElementById("root"));

  function openModal(id) {
    setIsOpen(true);
    setIdSelected(id);
    setLoaded(false);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  function deleteLinkr() {
    setLoaded(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Bearer")}`,
      },
    };
    const requisicao = axios.delete(
      `${BASE_URL}/timeline/${idSelected}`,
      config
    );
    requisicao
      .then(() => {
        setLoaded(true);
        setPublishedPosts(
          publishedPosts.filter((post) => post.id !== idSelected)
        );
        closeModal();
        alert("Post apagado!");
      })
      .catch(() => {
        closeModal();
        alert("Não foi possivel excluir o post, tente novamente");
      });
  }

  function likeLinkr() {
    setLiked(!liked);
  }

  function editLinkr(id, description, link) {
    setEdited(!edited);
    setIdSelected(id);
    setNewDescription(description);
    setNewLink(link);
  }

  async function handleSubmit() {
    // e.preventDefault();
    const body = { description: newDescription, link: newLink };
    try {
      const timelineData = await axios.patch(
        `${BASE_URL}/timeline/${idSelected}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Bearer")}`,
          },
        }
      );
      console.log(timelineData);
      console.log(body);
      setEdited(false);
    } catch (err) {
      alert("Houve um erro ao publicar seu link");
      console.log(err);
      setLoading(false);
    }
  }

  const handleKeypress = (e) => {
    if (e.key === "Esc") {
      setEdited(false);
    }

    if (e.key === "Enter") {
      handleSubmit();
      setLoading(true);
    }
  };

  if (publishedPosts === 0 || publishedPosts === undefined) {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  } else {
    return (
      <>
        {publishedPosts.map((value, i) => (
          <Card key={value.id}>
            <ContainerLeft>
              <UserImage src={value.picture} />
              {liked ? (
                <RedHeart
                  src={HeartUnliked}
                  alt="Heart Unliked"
                  onClick={likeLinkr}
                />
              ) : (
                <RedHeart
                  src={HeartLiked}
                  alt="Heart Liked"
                  onClick={likeLinkr}
                />
              )}
            </ContainerLeft>
            <ContainerRight>
              <ContainerTopPost>
                <p onClick={() => navigate(`/user/${value.userId}`)}>
                  {value.username}
                </p>

                {userData.id === value.userId ? (
                  <PostOptions>
                    <img
                      src={EditPost}
                      alt="Edit Post"
                      onClick={() =>
                        editLinkr(value.id, value.description, value.link)
                      }
                    />
                    <img
                      src={DeletePost}
                      alt="Delete Post"
                      onClick={() => openModal(value.id)}
                    />
                  </PostOptions>
                ) : (
                  ""
                )}
              </ContainerTopPost>

              {edited && value.id === idSelected ? (
                <PostDescription onSubmit={handleSubmit}>
                  <InputDescription
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    onKeyPress={handleKeypress}
                    disabled={loading}
                  />
                </PostDescription>
              ) : (
                <PostDescription>
                  <ReactTagify
                    colors={"blue"}
                    tagClicked={(tag) =>
                      navigate(`/hashtags/${tag.replace("#", "")}`)
                    }
                  >
                    {value.description}
                  </ReactTagify>
                </PostDescription>
              )}
              <PostUrl onClick={() => window.open(value.link, "_blank")}>
                <ContainerUrl>
                  <h2>{value.urlTitle}</h2>
                  <h3>{value.urlDescription}</h3>
                  <h4>{value.link}</h4>
                </ContainerUrl>
                <img src={value.urlImage} alt="LinkImage" />
              </PostUrl>
            </ContainerRight>
            {loaded ? (
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
              >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Loading...</h2>
              </Modal>
            ) : (
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
              >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                  Are you sure you want to delete this post?
                </h2>

                <div>
                  <button onClick={() => closeModal()}>No, go back</button>
                  <button onClick={() => deleteLinkr()}>Yes, delete it</button>
                </div>
              </Modal>
            )}
          </Card>
        ))}
      </>
    );
  }
}

const InputDescription = styled.input`
  margin-top: 3%;
  height: 70%;
  width: 100%;
  border: none;
  background-color: #efefef;
  border-radius: 5px;
`;

const ContainerUrl = styled.div`
  width: 55%;
  overflow: hidden;
  h2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #cecece;
    margin-bottom: 2%;
  }

  h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    color: #9b9595;
    line-height: 13px;
    margin-bottom: 2%;
  }

  h4 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    padding-bottom: 2%;
    color: #cecece;
  }
`;

const ContainerTopPost = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-between;

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    color: #ffffff;
  }
`;

const PostOptions = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 35%;
    height: 50%;
    cursor: pointer;
  }
`;

const RedHeart = styled.img`
  width: 22px;
  height: 22px;
  margin-top: 30%;
`;

const Card = styled.div`
  height: 35%;
  width: 100%;
  padding-top: 2%;
  margin-top: 3vh;
  border-radius: 16px;
  background-color: #171717;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  overflow: hidden;
`;

const PostDescription = styled.div`
  width: 80%;
  height: 20%;
  color: ${lightGrey};
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
`;

const PostUrl = styled.div`
  width: 100%;
  height: 55%;
  color: ${lightGrey};
  margin-top: 1%;
  display: flex;
  justify-content: space-between;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  cursor: pointer;

  img {
    width: 40%;
    height: 100%;
  }
`;

const UserImage = styled.img`
  height: 65px;
  width: 65px;
  border-radius: 50%;
`;

const ContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 81%;
  height: 100%;
`;

const ContainerLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 11%;
`;
