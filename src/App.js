import React, { useState } from 'react';
import { usePaginatedQuery } from 'react-query';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

const fetchData = async (key, term) => {
  const response = await fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`);
  return response.json();
}

function App() {
  const [term, setTerm] = useState('');
  const { 
    resolvedData, 
    status 
  } = usePaginatedQuery(['images', term], fetchData);

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />

      {status !== 'loading' && resolvedData.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1> }

      {status === 'loading' ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-3 gap-4">
        {resolvedData.hits.map(image => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>}
    </div>
  );
}

export default App;
