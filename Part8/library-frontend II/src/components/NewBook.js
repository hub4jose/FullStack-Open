import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOK, ALL_BOOKS } from '../queries';

import Notify from './Notify';

const NewBook = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      notify(error.graphQLErrors[0].message);
    },
    update: (store, response) => {
      console.log('inside update from newbook', response.data);
      const includedIn = (set, object) =>
        set.map((p) => p.id).includes(object.id);

      const dataInStore = store.readQuery({ query: ALL_BOOKS });
      console.log(dataInStore);
      if (!includedIn(dataInStore.allBooks, response.data.addBook)) {
        console.log('not found inside the cache');
        store.writeQuery({
          query: ALL_BOOKS,
          data: {
            allBooks: dataInStore.allBooks.concat(response.data.addBook),
          },
        });
      } else {
        console.log('found inside the cache');
      }
    },
  });

  if (!props.show) {
    return null;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const submit = async (event) => {
    event.preventDefault();

    try {
      createBook({
        variables: { title, published: parseInt(published), author, genres },
      });
    } catch (error) {
      notify(error.message);
    }

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
