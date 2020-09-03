import axios from "axios";

export const getArticles = (sort_by, order, topic) => {
  return axios
    .get("https://khurram-news-app.herokuapp.com/api/articles", {
      params: { sort_by, order, topic },
    })
    .then((res) => {
      return res.data.articles;
    });
};

export const getArticleById = (id) => {
  return axios
    .get(`https://khurram-news-app.herokuapp.com/api/articles/${id}`)
    .then((res) => {
      return res.data.article;
    });
};

export const getTopics = () => {
  return axios
    .get("https://khurram-news-app.herokuapp.com/api/topics")
    .then((res) => {
      return res.data.topics;
    });
};

export const getComments = (id, sort_by, order) => {
  return axios
    .get(`https://khurram-news-app.herokuapp.com/api/articles/${id}/comments`, {
      params: { sort_by, order },
    })
    .then((res) => {
      return res.data.comments;
    });
};

export const patchVotes = (id, vote, type) => {
  return axios
    .patch(`https://khurram-news-app.herokuapp.com/api/${type}/${id}`, {
      inc_votes: vote,
    })
    .then((res) => {
      // return res.data.comments;
    });
};

export const getUsers = () => {
  return axios
    .get("https://khurram-news-app.herokuapp.com/api/users")
    .then((res) => {
      return res.data.users;
    });
};

export const postComment = (id, username, body) => {
  return axios
    .post(
      `https://khurram-news-app.herokuapp.com/api/articles/${id}/comments`,
      {
        username: username,
        body: body,
      }
    )
    .then((res) => {
      return res.data.comment;
    });
};

export const deleteComment = (id) => {
  return axios
    .delete(`https://khurram-news-app.herokuapp.com/api/comments/${id}`)
    .then((res) => {
      return res.status;
    });
};

export const getImage = (topic) => {
  return axios
    .get(`ttps://serpapi.com/playground?q=${topic}&tbm=isch`)
    .then((res) => {
      console.log(res);
    });
};
