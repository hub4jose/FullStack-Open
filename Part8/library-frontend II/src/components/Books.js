import { useState, useEffect } from 'react';

import { useQuery } from '@apollo/client';
import Genres from './Genres';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const books = props.books;

  const [booksByGenre, setBooksByGenre] = useState(books);
  const [genre, setGenre] = useState(null);
  const [genres, setGenres] = useState('');

  const result = useQuery(ALL_BOOKS, {
    onCompleted: (data) => {
      //setBooks(data.allBooks);
      setBooksByGenre(booksByGenre);
    },
  });

  useEffect(() => {
    const genres = [];
    books.forEach((book) => {
      if (book.genres) {
        book.genres.forEach((genre) => {
          genres[genre] = genre;
        });
      }
    });
    setGenres(Object.keys(genres));
  }, [books]);

  useEffect(() => {
    const booksByGenre = !genre
      ? books
      : books.filter((book) => book.genres.includes(genre));
    setBooksByGenre(booksByGenre);
  }, [genre, books]);

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      <Genres genres={genres} setGenre={setGenre} />
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksByGenre.map((a) => (
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

export default Books;
