import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

interface MatchParams {
  id: string;
}

export const FETCH_EPISODE = gql`
  query($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      created
      characters {
        id
        name
        image
      }
    }
  }
`;

interface Episodes {
  episode: Episode;
}
interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  created: string;
  characters: Character[];
}

interface Character {
  id: number;
  name: string;
  image: string;
}

interface EpisodeVariables {
  id: number;
}

export const EpisodeInfo: React.FC<RouteComponentProps<MatchParams>> = ({
  match
}) => {
  const { loading, data } = useQuery<Episodes, EpisodeVariables>(
    FETCH_EPISODE,
    { variables: { id: parseInt(match.params.id) } }
  );
  const episode = loading || !data ? false : data.episode;
  const char = loading || !data ? [] : data.episode.characters;

  const spinner = <Spinner animation="grow" variant="warning" />;

  return (
    <Container>
      <Row>
        <Col>
          <Card bg="dark" text="white">
            <Card.Title
              className="justify-content-center"
              style={{ margin: 5 }}
            >
              {episode ? episode.name : spinner}
            </Card.Title>
            <Card.Body>
              <Row>
                Episode: {episode ? episode.episode : spinner}
              </Row>
              <Row>
                Created: {episode ? episode.created : spinner}
              </Row>
              <Row>
                Air Date: {episode ? episode.air_date : spinner}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 5 }}>
        <Col>
          <Card bg="dark" text="white">
            <Card.Title
              className="justify-content-center"
              style={{ margin: 5 }}
            >
              Characters in this Episode
            </Card.Title>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        {char.map((it, i) => (
          <Card
            key={i}
            bg="dark"
            text="white"
            style={{ width: "20rem", margin: 15 }}
          >
            <Card.Title>{it.name}</Card.Title>
            <Card.Img variant="top" src={it.image} />
            <Card.Body>
              <Link to={`/characters/${it.id}`}>
                <Button variant="outline-warning">Learn More!</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};
