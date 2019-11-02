import React from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import classes from "./Posts.module.css";
import { Link } from "react-router-dom";

class Posts extends React.Component {
  state = {
    posts: []
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/posts")
      .then(response => {
        //   console.log(response);
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "Max"
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch(error => {
        //   console.log(error)
        this.setState({ error: true });
      });
  }

  postSelectedHandler = id => {
    this.setState({
      selectedPostId: id
    });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => (
        <Link to={"/posts/" + post.id} key={post.id}>
          <Post
            title={post.title}
            author={post.author}
            clicked={id => {
              this.postSelectedHandler(post.id);
            }}
          />
        </Link>
      ));
    }
    return <section className={classes.Posts}>{posts}</section>;
  }
}

export default Posts;
