import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Waypoint } from "react-waypoint";

export const FETCH_EPISODES = gql`
  query($page: Int!) {
    episodes(page: $page) {
      results {
        id
        name
        episode
        air_date
        created
      }
    }
  }
`;

interface EpisodeData {
  episodes: Episodes;
}

interface Episodes {
  results: Episode[];
}
interface Episode {
  id: number;
  name: string;
  episode: string;
  air_date: string;
  created: string;
}

interface EpisodeVariables {
  page: number;
}

export const Episodes: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { loading, data, fetchMore } = useQuery<EpisodeData, EpisodeVariables>(
    FETCH_EPISODES,
    { variables: { page: 1 } }
  );
  const episodes = loading || !data ? [] : data.episodes.results;

  const pageScrollEnd = () =>
    fetchMore({
      variables: { page: page + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setPage(page + 1);
        return {
          episodes: {
            __typename: "episodes",
            results: [
              ...prev.episodes.results,
              ...fetchMoreResult.episodes.results
            ]
          }
        };
      }
    });

  return (
    <Container fluid>
      <Row className="justify-content-center">
        {episodes.map((it, i) => (
          <Link
            key={i}
            to={`/episode-info/${it.id}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              bg="dark"
              text="white"
              style={{ width: "20rem", margin: 15 }}
              className="hoverCard"
            >
              <Card.Body>
                <Card.Title>{it.name}</Card.Title>
                <Card.Text className="propTextColor">
                  Episode: {it.episode}
                </Card.Text>
                <Card.Text className="propTextColor">
                  Aired: {it.air_date}
                </Card.Text>
                <Card.Text className="propTextColor">
                  Made: {it.created}
                </Card.Text>
              </Card.Body>
            </Card>
            {i === episodes.length - 5 && <Waypoint onEnter={pageScrollEnd} />}
          </Link>
        ))}
      </Row>
    </Container>
  );
};
