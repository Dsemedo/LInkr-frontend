import styled from "styled-components";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
import { useState } from "react";
import { useEffect } from "react";
import { BASE_URL } from "../constants/urls.js";
import { Link } from "react-router-dom";

export default function Search() {
  const [busca, setBusca] = useState("");
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (busca.length > 2) {
      axios
        .get(`${BASE_URL}/users/${busca}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((erro) => {
          console.log(erro.details);
        });
    } else {
      setUser();
    }
  }, [busca]);
  return (
    <SearchBox>
      <DebounceInput
        type="text"
        backgroundColor="red"
        width="100%"
        placeholder="Search for people"
        minLength={3}
        autoComplete="false"
        debounceTimeout={300}
        value={busca}
        onChange={(event) => setBusca(event.target.value)}
      />
      {user?.map((user) => (
        <UsersFind key={user.id}>
          <Link to={`/user/${user.id}`}>
            <Flex>
              <DivImagem>
                <img src={user.picture} />{" "}
              </DivImagem>
              <DivSpan>
                <span>{user.username}</span>
              </DivSpan>
            </Flex>
          </Link>
        </UsersFind>
      ))}
    </SearchBox>
  );
}

const SearchBox = styled.div`
  width: 50%;
  background-color: white;
  max-height: 110px;
  box-sizing: border-box;

  border-radius: 8px;
  input {
    height: 45px;
    background: #ffffff;
    border-radius: 8px;
    font-family: "Lato";
    font-weight: 400;
    font-size: 19px;
    border: none;
    &:focus-visible {
      outline: none;
    }
  }
`;
const UsersFind = styled.div`
  width: 100%;
  display: flex;
  height: 45px;
  align-items: center;
  background-color: #e7e7e7;
`;
const DivSpan = styled.div`
  display: flex;
  align-items: center;
  span {
    font-family: "Lato";
    font-weight: 400;
    font-size: 23px;
    padding-left: 10px;
  }
`;

const DivImagem = styled.div`
  img {
    width: 39px;
    height: 39px;
    border-radius: 304px;
  }
`;
const Flex = styled.div`
  display: flex;
`;
