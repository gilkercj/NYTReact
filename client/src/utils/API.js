
import axios from "axios";

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
const APIKEY = "&api_key=c523f1c88d2c44f5ada13f1a7ff75c4a";

// Export an object with a "search" method that searches the Giphy API for the passed query
export default {
  search: function (query) {
    return axios.get(BASEURL + query + APIKEY)
  },
  getArticles: function () {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticlesById: function (id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function (id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a article to the database
  saveArticle: function (articleData) {
    return axios.post("/api/articles", articleData);
  }
};

