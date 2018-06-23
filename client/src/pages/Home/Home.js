import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import SaveBtn from "../../components/SaveBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    saved: [],
    name: "",
    articles: [],
    query: "",
  };

  componentDidMount() {
    this.searchNYT("Queen Elizabeth");
    this.loadArticles();
  }

  searchNYT = query => {
    API.search(query)
      // .then(res => this.setState({ results: res.response }))
      .then(res => {
        const articles = res.data.response.docs;
        console.log( articles )
        this.setState({ articles });
        console.log( this.state.articles )
      })
      .catch(err => console.log(err));
  };

  loadArticles = () => {
    // API.getArticles()
    API.getArticles()
      .then(res =>  {
        const result = res.data;
        console.log( "db res: " + result)
        this.setState({ saved: result })
      
      })
      .catch(err => console.log(err));

  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.query) {
      this.state.articles = [];
      this.searchNYT(this.state.query);
    }
  };

  saveItem = (headline, publishDate, url) => {

      API.saveArticle({
        headline: headline,
        publishDate: publishDate,
        url: url
      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
    };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>NY React Times</h1>
            </Jumbotron>
            <form>
              <Input
        onChange={this.handleInputChange}
        name="query"
        type="text"
        className="form-control"
        id="userSearchTopic"
        placeholder="Queen Elizabeth"
        required
              />
              <FormBtn
                disabled={!(this.state.query)}
                onClick={this.handleFormSubmit}
              >
                Search Articles
              </FormBtn>
            </form>
          </Col>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Searched Articles</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article.i}>
                      <a href={article.web_url}>
                        <strong>
                          {article.headline.main} 
                        </strong>
                         , published on {article.pub_date}
                      </a>
                    <SaveBtn onClick={() => this.saveItem(article.headline.main, article.pub_date, article.web_url)}>Save</SaveBtn>

                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.saved.length ? (
              <List>
                {this.state.saved.map(article => (
                  <ListItem key={article._id}>

                      <a href={article.url}>
                        <strong>
                          {article.headline}</strong>, saved on {article.date}
                        
                      </a>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />

                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
