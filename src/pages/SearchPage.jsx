import { useState, useEffect } from 'react';
import { searchUsers } from '../api/user'; // Your API call
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim() !== '') {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 300); // 👈 300ms debounce

    return () => clearTimeout(delayDebounceFn); // Cleanup on next input
  }, [query]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const users = await searchUsers(query);
      setResults(users);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen pt-6">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-2 border rounded w-full"
        />
      </div>

      <div className="w-full max-w-2xl mt-6 space-y-4">
        {loading && <p className="text-center text-gray-400">Searching...</p>}
        {!loading && results.length === 0 && query && (
          <p className="text-center text-gray-500">No results found</p>
        )}
        {results.map((user) => (
          <Link
            to={`/profile/${user._id}`}
            key={user._id}
            className="block bg-white p-4 rounded shadow hover:bg-gray-50 transition"
          >
            <div className="flex items-center space-x-4">
              <img
                src={`http://localhost:5000/${user.profilePicture}`}
                className="w-12 h-12 rounded-full object-cover"
                alt="User"
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
