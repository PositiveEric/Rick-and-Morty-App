import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { RouteComponentProps, Link } from "react-router-dom";

interface MatchParams {
  id: string;
}

export const FETCH_CHARACTER = gql`
  query($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      species
      gender
      location {
        name
      }
      origin {
        name
        dimension
        type
      }
      episode {
        id
        name
        episode
      }
    }
  }
`;

interface Characters {
  character: Character;
}

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  location: {
    name: string;
  };
  origin: {
    name: string;
    dimension: string;
    type: string;
  };
  episode: Episode[];
}

interface Episode {
  id: number;
  name: string;
  episode: string;
}

interface CharacterVariables {
  id: number;
}

export const Character: React.FC<RouteComponentProps<MatchParams>> = ({
  match
}) => {
  const { loading, data } = useQuery<Characters, CharacterVariables>(
    FETCH_CHARACTER,
    { variables: { id: parseInt(match.params.id) } }
  );
  // const char = loading || !data ? false : data.character;
  const episode = loading || !data ? [] : data.character.episode;

  // const spinner = <Spinner animation="grow" variant="warning" />;

  if (!data || !data.character) return <Spinner animation="grow" variant="warning" />;
  const { character } = data;

  return (
    <Container className="Carousel">
      <Row className="justify-content-center">
        <Col>
          <Card bg="dark" text="white">
            <Card.Title
              className="justify-content-center"
              style={{ margin: 5 }}
              
            >
              {character.name}
            </Card.Title>
            <Card.Img variant="top" src={character.image} />
          </Card>
        </Col>
        <Col>
          <Card bg="dark" text="white">
            <Card.Body>
              {/* <Card.Text style={{ margin: 5 }}> */}
                <Row>
                  <Col>Character ID: </Col>
                  <Col className="propTextColor">
                    {character.id}
                  </Col>
                </Row>
                <Row>
                  <Col>Species:</Col>
                  <Col className="propTextColor">
                    {character.species}
                  </Col>
                </Row>
                <Row>
                  <Col>Gender:</Col>
                  <Col className="propTextColor">
                    {character.gender}
                  </Col>
                </Row>
                <Row>
                  <Col>Status:</Col>
                  <Col className="propTextColor">
                    {character.status}
                  </Col>
                </Row>
                <Row>
                  <Col>Origin:</Col>
                  <Col className="propTextColor">
                    {character.origin.name}
                  </Col>
                </Row>
                <Row>
                  <Col>Type:</Col>
                  <Col className="propTextColor">
                    {character.origin.type}
                  </Col>
                </Row>
                <Row>
                  <Col>Dimension:</Col>
                  <Col className="propTextColor">
                    {character.origin.dimension}
                  </Col>
                </Row>
                <Row>
                  <Col>Current location:</Col>
                  <Col className="propTextColor">
                    {character.location.name}
                  </Col>
                </Row>
              {/* </Card.Text> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 15 }} className="justify-content-center">
        <Col>
          <Card bg="dark" text="white">
            {character.name} has appeared in the following episodes
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {episode.map((it, i) => (
          <Link key={i} to={`/episode-info/${it.id}`}>
            <Card
              bg="dark"
              text="white"
              style={{ width: "20rem", margin: 15, padding: 10 }}
              className="hoverCard"
              key={i}
            >
              <Card.Text key={i} className="headerLink">{it.name}</Card.Text>
              <Card.Text>{it.episode}</Card.Text>
            </Card>
          </Link>
        ))}
      </Row>
    </Container>
  );
};
