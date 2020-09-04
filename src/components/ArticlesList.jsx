import React, { useContext } from "react";
import UserContext from "./UserContext";
import { Link } from "@reach/router";
import Voter from "./Voter";
import styled from "styled-components";

const ArticleTitle = styled.h3`
  text-decoration: none;
`;

const ArticlesList = (articles) => {
  const { user } = useContext(UserContext);
  return (
    <ul className="articlelist">
      {articles.articles.map((article) => {
        return (
          <li key={article.article_id}>
            <Link to={`/articles/${article.article_id}`}>
              <ArticleTitle>{article.title}</ArticleTitle>
            </Link>
            <h4>
              Posted by: {article.author} on{" "}
              {article.created_at.substring(0, 10)} in {article.topic}
            </h4>

            <Link to={`/articles/${article.article_id}/comments`}>
              <h4>Comments: {article.comment_count}</h4>
            </Link>
            {user.username !== "guest" ? (
              <Voter
                id={article.article_id}
                type={"articles"}
                votes={article.votes}
              />
            ) : (
              <h3>Log in to vote</h3>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default ArticlesList;
