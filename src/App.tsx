import "./App.css";
import React from "react";
import { Body } from "./Body";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./apollo";
import "bootstrap/dist/css/bootstrap.css";
import { Character } from "./Character";
import { Planets } from "./Planets";
import { Episodes } from "./Episodes";
import { PlanetInfo } from "./PlanetInfo";
import { EpisodeInfo } from "./EpisodeInfo";


import { BrowserRouter as Router, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
          <Route path="/" exact component={Body} />
          <Route path="/characters/:id" exact component={Character} />
          <Route path="/planets" exact component={Planets} />
          <Route path="/episodes" exact component={Episodes} />
          <Route path="/planet-info/:id" exact component={PlanetInfo} />
          <Route path="/episode-info/:id" exact component={EpisodeInfo} />
          <Footer />
        </div>
      </ApolloProvider>
    </Router>
  );
};

export default App;
