import React from "react";
import PersonalInfoCard from "./PersonalInfoCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useSelector } from "react-redux";
import { selectMobile, selectPosts } from "../features/appSlice";
import styled from "styled-components";
import Post from "./Post";
import Stories from "./Stories";

function Feed() {
  const mobile = useSelector(selectMobile);
  const posts = useSelector(selectPosts);
  const [user] = useAuthState(auth);

  return (
    <FeedContainer style={{position:"absolute", left:"400px"}}>
      <PostStoriesWrap>
        <Stories />
        <PostsContainer>
          {posts?.map((post) => (
            <Post post={post} key={post.id} user={user} />
          ))}
        </PostsContainer>
      </PostStoriesWrap>
      {!mobile ? (
        <Widgets>
          <PersonalInfoCard user={user} />
          <SuggestionsContainer>
            <SuggestionsHeader>
              <h4>Recommendations for you</h4>
              <p>All</p>
            </SuggestionsHeader>
          </SuggestionsContainer>
          <p style={{ color: "rgb(212 212 216)", fontSize: 13, marginTop: 50 }}>
            @ 2022 INSTAGRAM FROM META
          </p>
        </Widgets>
      ) : (
        ""
      )}
    </FeedContainer>
  );
}

export default Feed;

const FeedContainer = styled.div`
  display: flex;
  border: 1px solid #f7fafc;
  margin-top: 20px;
`;
const PostStoriesWrap = styled.div`
  width: 100vw;
  @media (min-width: 750px) {
    flex: 0.6;
    max-width: 600px;
  }
`;
const PostsContainer = styled.div``;

const Widgets = styled.div`
  @media (min-width: 750px) {
    flex: 0.4;
  }
  padding: 0 20px;
`;
const SuggestionsContainer = styled.div``;
const SuggestionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  > p {
    font-weight: 100;
  }
  h4 {
    color: gray;
  }
`;
