import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Card, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Waypoint } from "react-waypoint";

export const FETCH_PLANETS = gql`
  query($page: Int!) {
      locations(page: $page) {
        results {
          id
          name
          type
          dimension
          residents {
            id
            name
          }
        }
      }
  }
`;

interface LocationData {
  locations: Locations;
}

interface Locations {
  results: Location[];
}

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: {
    id: number;
    name: string;
  };
}

interface LocationVariables {
  page: number;
}

export const Planets: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { loading, data, fetchMore } = useQuery<
    LocationData,
    LocationVariables
  >(FETCH_PLANETS, { variables: { page: 1 } });
  const locations = loading || !data ? [] : data.locations.results;

  const pageScrollEnd = () =>
    fetchMore({
      variables: { page: page + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setPage(page + 1);
        return {
          locations: {
            __typename: "locations",
            results: [
              ...prev.locations.results,
              ...fetchMoreResult.locations.results
            ]
          }
        };
      }
    });

  return (
    <Container fluid>
      <Row className="justify-content-center">
        {locations.map((it, i) => (
          <Card
            key={i}
            bg="dark"
            text="white"
            style={{ width: "20rem", margin: 15, backgroundColor: "white" }}
          >
            <Card.Body>
              <Card.Title>{it.name}</Card.Title>
              <Card.Text className="propTextColor">Type: {it.type}</Card.Text>
              <Card.Text className="propTextColor">
                Dimension: {it.dimension}
              </Card.Text>
              <Link to={`/planet-info/${it.id}`}>
                <Button variant="outline-warning">Learn More!</Button>
              </Link>
            </Card.Body>
            {i === locations.length - 5 && <Waypoint onEnter={pageScrollEnd} />}
          </Card>
        ))}
      </Row>
    </Container>
  );
};
