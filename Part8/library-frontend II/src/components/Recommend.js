import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { ME, ALL_BOOKS } from '../queries';

const Recommend = (props) => {
  const meResult = useQuery(ME);
  const [getBooks, result] = useLazyQuery(ALL_BOOKS);

  const [meBooks, setMeBooks] = useState([]);

  useEffect(() => {
    if (meResult.data && meResult.data.me) {
      getBooks({ variables: { genre: meResult.data.me.favoriteGenre } });
    }
  }, [meResult, getBooks]);

  useEffect(() => {
    if (result.data) setMeBooks(result.data.allBooks);
  }, [result, setMeBooks]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre : <strong></strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {meBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
