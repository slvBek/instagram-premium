import React, { useRef, useState, useEffect } from "react";
import kraska from '../assets/kraska.png';
import bbbb from '../images/person.png';
import styled from "styled-components";
import InstagramWordLogo from "../assets/instagram_logo_word.png";
import { HomeIcon } from "@heroicons/react/solid";
import {
  SearchIcon,
  PlusCircleIcon,
  HeartIcon,
  UserCircleIcon,
  HomeIcon as OutlineHomeIcon,
} from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
import {
  selectMobile,
  setAddPostModal,
  SetSelectedProfile,
} from "../features/appSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Header() {
  const mobile = useSelector(selectMobile);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const modalContentRef = useRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  function toggleAddPost() {
    dispatch(
      setAddPostModal({
        addPostIsOpen: true,
      })
    );
  }

  useEffect(() => {
    const handler = (event) => {
      if (!modalContentRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const visitProfile = () => {
    dispatch(
      SetSelectedProfile({
        selectedProfile: {
          userProfile: user.photoURL,
          userId: user.uid,
          username: user.displayName,
        },
      })
    );
    navigate("/profile");
    setIsOpen(false);
  };

  return (
    <HeaderContainer>
      <ContentsWrap>
        <LogoContainer>
          <img src={kraska} alt="" style={{width: "170px", marginTop: "25px"}}></img>
          <WordLogoContainer src={InstagramWordLogo} alt="InstagramWordLogo" style={{position: "absolute", top: "40px", left: "50px"}} />
        </LogoContainer>
        {!mobile && (
          <InputContainer>
            <SearchIcon style={{ color: "gray", height: 20, padding: 5 }} />
            <InputField type="text" placeholder="Search" />
          </InputContainer>
        )}
        
        <NavOptionsContainer>
          {location.pathname === "/" ? (
            <HomeIcon className="Nav__Icon" onClick={() => navigate("/")} style={{position: "absolute", top: "190px", left:"30px"}} />
          ) : (
            <OutlineHomeIcon
              className="Nav__Icon"
              onClick={() => navigate("/")}
            />
          )}

          <PlusCircleIcon onClick={toggleAddPost} className="Nav__Icon" style={{position: "absolute", top: "230px", left: "30px"}} />
          <HeartIcon className="Nav__Icon" style={{position: "absolute", top: "270px", left: "30px"}} />
          {user ? (
            <UserAvatarContainer style={{position: "absolute", top: "670px", left: "20px"}}>
              <img
                src={bbbb}
                alt="Settings"
                onClick={() => setIsOpen(!isOpen)}
              />
              {isOpen && (
                <UserAvatarPopupContainer ref={modalContentRef} style={{position: "absolute", top: "-145px", left:"10px", width:"210px"}}>
                  <section onClick={visitProfile}>
                    <UserCircleIcon className="Nav__Icon" />
                    <p>Profile</p>
                  </section>

                  <div>
                    <p onClick={() => auth.signOut()}>Logout</p>
                  </div>
                </UserAvatarPopupContainer>
              )}
            </UserAvatarContainer>
          ) : (
            <p>
              <strong>Sign in</strong>
            </p>
          )}
        </NavOptionsContainer>
      </ContentsWrap>
    </HeaderContainer>
  );
}

export default Header;
const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #fff;
  padding: 10px 20px;
  border: 1px solid rgb(212 212 212);
  @media (min-width: 750px) {
    padding: 10px 0;
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 16%;
    position: fixed;
    height: 100%;
    overflow: auto;
  }
`;
const ContentsWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 750px) {
    width: 75%;
    margin: auto;
  }
`;
const LogoContainer = styled.div``;
const WordLogoContainer = styled.img`
  display: block;
  object-fit: contain;
  height: 35px;
`;

const InputContainer = styled.div`
  position: absolute;
  top: 140px;
  display: flex;
  color: gray;
  background-color: rgb(229 229 229);
  align-items: center;
  border-radius: 5px;
  min-width: 150px;
`;
const InputField = styled.input`
  background: none;
  border: 1px solid gray;
  max-width: 100px;
  font-size: 15px;
  padding: 5px;
  border: 0px;
  :focus {
    outline: none;
  }
`;
const NavOptionsContainer = styled.div`
  display: flex;
  gap: 15px;
`;
const UserAvatarContainer = styled.div`
  position: relative;
  > img {
    object-fit: contain;
    height: 30px;
    width: 30px;
    border-radius: 9999px;
    cursor: pointer;
  }
`;
const UserAvatarPopupContainer = styled.div`
  position: absolute;
  z-index: 2;
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  width: 200px;
  height: 150px;
  top: 45px;
  right: 10px;
  border-radius: 0.25rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

  > section {
    display: flex;
    padding: 20px;
    gap: 10px;
    cursor: pointer;
  }
  > div {
    margin-top: 30px;
    border-top: 1px solid gray;
  }
  > div > p {
    padding: 10px 20px;
    cursor: pointer;
  }
`;
