import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
//import { Navbar } from "../navigation-bar/navigation-bar";
import ProfileView from "../profile-view/profile-view";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Header } from "../navigation-bar/navigation-bar";
import "./main-view.scss";


import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteMovies: [],
      user: null,
    };
  }
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get("https://site--popkorny--w5mfxztkv9bc.code.run/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  toRegister(registered) {
    this.setState({
      registered,
    });
  }

  handleFavorite = (_id, action) => {
    const { user, favoriteMovies } = this.state;
    const accessToken = localStorage.getItem("token");
    const Username = user;
    if (accessToken !== null && Username !== null) {
      // Add MovieID to Favorites (local state & webserver)
      if (action === "add") {
        this.setState({ favoriteMovies: [...favoriteMovies, _id] });
        axios
          .post(
            `https://site--popkorny--w5mfxztkv9bc.code.run/users/${Username}/movies/${_id}`,
            {},
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            console.log(`Movie added to ${Username} Favorite movies`);
            alert(`Movie added to ${Username} Favorite movies`);
          })
          .catch(function (error) {
            console.log(error);
          });

        // Remove MovieID from Favorites (local state & webserver)
      } else if (action === "remove") {
        this.setState({
          favoriteMovies: favoriteMovies.filter((id) => id !== _id),
        });
        axios
          .delete(
            `https://site--popkorny--w5mfxztkv9bc.code.run/users/${Username}/favorites/${_id}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            console.log(`Movie removed from ${Username} Favorite movies`);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };
  render() {

    // #5 movies is extracted from this.props rather than from the this.state
    let { movies } = this.props;
    let { user } = this.state;
    let {favoriteMovies} = this.state;
    return (
      <Router>

        <Header user={user} />
        <Row className="justify-content-center mr-1 ml-1">
        
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            // #6
            return <MoviesList movies={movies}/>;
          }} />
          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          /> 
                      <Route
            path={`/users/${user}`}
            render={({ history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <ProfileView
                    user={user}
                    goBack={history.goBack}
                    favoriteMovies={favoriteMovies || []}
                    handleFavorite={this.handleFavorite}
                    onBackClick={() => history.goBack()}
                    movies={movies}
                  />
                </Col>
              );
            }}
          />
                    <Route
            path={`/user-update/:Username`}
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <UserUpdate
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
                    <Route
            path="/movies/:_id"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params._id)}
                    onBackClick={() => history.goBack()}
                    handleFavorite={this.handleFavorite}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
     );
  }
  }
  

  let mapStateToProps = state => {
  return { movies: state.movies }
  }
  

  export default connect(mapStateToProps, { setMovies } )(MainView);
