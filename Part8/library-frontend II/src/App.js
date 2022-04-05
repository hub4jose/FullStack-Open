import { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Recommend from './components/Recommend';
import LoginForm from './components/LoginForm';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import { ME, ALL_BOOKS, BOOK_ADDED } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [token, setToken] = useState(null);
  const meQuery = useQuery(ME);
  const client = useApolloClient();

  const updateCacheWith = (bookAdded) => {
    const includedIn = (set, object) =>
      set.map((s) => s.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });

    if (!includedIn(dataInStore.allBooks, bookAdded)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(bookAdded) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded = subscriptionData.data.bookAdded;
      window.alert(`New book added: ${bookAdded.title}`);
      updateCacheWith(bookAdded);
    },
  });

  useEffect(() => {
    if (!token) setToken(localStorage.getItem('library-token'));
  }, [token]);

  const result = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (result.data) setBooks(result.data.allBooks);
  }, [result]);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useEffect(() => {
    if (meQuery.data) {
      setUser(meQuery.data.me);
    }
  }, [meQuery]);

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} books={books} />

      {user && <NewBook show={page === 'add'} />}

      {user && <Recommend show={page === 'recommend'} />}

      {page === 'login' && <LoginForm setToken={setToken} setPage={setPage} />}
    </div>
  );
};

export default App;
