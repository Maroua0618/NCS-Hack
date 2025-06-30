/* global console */
import { useEffect, useState } from 'react';
import 'whatwg-fetch'; // Polyfill for fetch API

function TestPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/test')
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        console.log('Fetched from backend:', result);
      })
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  return (
    <div>
      <h2>Data from MongoDB:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default TestPage;
