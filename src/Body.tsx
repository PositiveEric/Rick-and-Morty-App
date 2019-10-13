import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useState } from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';

export const FETCH_CHARACTERS = gql`
  query($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        image
        species
        status
      }
    }
  }
`;

interface CharacterData {
  characters: Characters;
}
interface Characters {
  results: Character[];
}
interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
}
interface CharacterVariables {
  page: number;
}

export const Body: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { loading, data, fetchMore } = useQuery<
    CharacterData,
    CharacterVariables
  >(FETCH_CHARACTERS, { variables: { page: 1 } });
  const characters = loading || !data ? [] : data.characters.results;

  const pageScrollEnd = () =>
    fetchMore({
      variables: { page: page + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setPage(page + 1);
        return {
          characters: {
            __typename: 'characters',
            results: [
              ...prev.characters.results,
              ...fetchMoreResult.characters.results
            ]
          }
        };
      }
    });

  return (
    <Container fluid>
      <Row className="justify-content-center">
        {characters.map((it, i) => (
          <Link
            to={`/characters/${it.id}`}
            style={{ textDecoration: 'none' }}
            key={i}
          >
            <Card
              text="white"
              style={{ width: '20rem', margin: 15, background: 'grey' }}
              className="hoverCard"
            >
              <Card.Img variant="top" src={it.image} />
              <Card.Body>
                <Card.Title className="headerLink">{it.name}</Card.Title>
                <Card.Text className="cardText">
                  Species: {it.species}
                </Card.Text>
                <Card.Text className="cardText">
                  Current status: {it.status}
                </Card.Text>
              </Card.Body>
            </Card>
            {i === characters.length - 5 && (
              <Waypoint onEnter={pageScrollEnd} />
            )}
          </Link>
        ))}
      </Row>
    </Container>
  );
};
