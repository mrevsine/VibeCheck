import React, { Component, useState, useEffect } from 'react';

// Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Statistics from './pages/Statistics';
import VibecheckSong from './pages/VibecheckSong';
import VibecheckPlaylist from './pages/VibecheckPlaylist';
import Redirect from './pages/Redirect';
import LoggedIn from './components/LoggedIn';
import Profile from './pages/Profile';

import Layout from './components/Layout';
import NavigationBar from './components/NavigationBar';

// Context 
import { AuthContext } from './context/auth';
import { UserDataContext } from './context/userdata';
import { AudioBatchContext } from './context/audiobatch';
import { LoadingContext } from './context/loading';
import PrivateRoute from './components/PrivateRoute';

// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons'; // import brand icons (needed for spotify logo)

import { getUserData, setAccessToken, fetchCandidateSongs } from './API/spotifyAPI';
library.add(fab)

function App(props) {
  const existingTokens = JSON.parse(localStorage.getItem("spotify_auth_state"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [userData, setUserData] = useState({});
  const [audioBatch, setAudioBatch] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [loadingSongData, setLoadingSongData] = useState(true);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
      React.createElement(component, finalProps)
    );
  }


  const PropsRoute = ({ component, ...rest }) => {
    return (
      <Route {...rest} render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }} />
    );
  }


  // useEffect is equivalent to ComponentDidMount() --> runs this only once at first render.
  useEffect(() => {
    if (authTokens) {
      setAccessToken(authTokens.access_token);
      getUserData().then(data => {
        setUserData(data);
        console.log(data);
      });

      fetchCandidateSongs((data) => {
        console.log("audio batch incoming");
        console.log(data);
        setLoadingSongData(false);
        setIsLoading(false);
        setAudioBatch(data);
      });
    }
  }, [authTokens])

  // Context set up following this explanation: https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71
  // any component using our AuthContext can now get tokens and set the tokens

  return (
    <React.Fragment>
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <UserDataContext.Provider value={[userData, setUserData]}>
          <AudioBatchContext.Provider value={[audioBatch, setAudioBatch]}>
            <LoadingContext.Provider value={[isLoading, setIsLoading]}>
              <Router>
                {authTokens && <LoggedIn username={userData.display_name} loadingData={loadingSongData} />}
                <Layout>
                  <Switch>
                    <PropsRoute path="/dashboard" component={Dashboard} auth={authTokens} />
                    <PrivateRoute path="/quiz" component={Quiz} />
                    <PrivateRoute path="/profile" component={Profile} />
                    <PrivateRoute path="/statistics" component={Statistics} />
                    <PrivateRoute path="/vibecheck-song" component={VibecheckSong} />
                    <PrivateRoute path="/vibecheck-playlist" component={VibecheckPlaylist} />
                    <Route path="/redirect" component={Redirect} />
                    <Route exact path="/" component={Redirect} />
                  </Switch>
                </Layout>
              </Router>
            </LoadingContext.Provider>
          </AudioBatchContext.Provider>
        </UserDataContext.Provider>
      </AuthContext.Provider>
    </React.Fragment>
  );

}

export default App;