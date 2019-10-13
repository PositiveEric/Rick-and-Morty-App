import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { Card, Col, Container, Row, Spinner, Button } from "react-bootstrap";
import { RouteComponentProps, Link } from "react-router-dom";

interface MatchParams {
  id: string;
}

export const FETCH_PLANET = gql`
  query($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      residents {
        id
        name
        image
      }
    }
  }
`;

interface Locations {
  location: Location;
}

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Resident[];
}

interface Resident {
  id: string;
  name: string;
  image: string;
}

interface LocationVariables {
  id: number;
}

export const PlanetInfo: React.FC<RouteComponentProps<MatchParams>> = ({
  match
}) => {
  const { loading, data } = useQuery<Locations, LocationVariables>(
    FETCH_PLANET,
    { variables: { id: parseInt(match.params.id) } }
  );
  const loc = loading || !data ? false : data.location;
  const res = loading || !data ? [] : data.location.residents;

  const spinner = <Spinner animation="grow" variant="warning" />;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <Card bg="dark" text="white">
            <Card.Title
              className="justify-content-center"
              style={{ margin: 5 }}
            >
              {loc ? loc.name : spinner}
            </Card.Title>
            <Card.Body>
              <Row>Location type: {loc ? loc.type : spinner}</Row>
              <Row>Dimension: {loc ? loc.dimension : spinner}</Row>
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
              Location inhabitants
            </Card.Title>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        {res.map((it, i) => (
          <Card
            key={i}
            bg="dark"
            text="white"
            style={{ width: "20rem", margin: 15 }}
          >
            <Card.Img variant="top" src={it.image} />
            <Card.Body>
              <Card.Title>{it.name}</Card.Title>
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
