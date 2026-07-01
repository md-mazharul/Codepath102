import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(null);
  const [banList, setBanList] = useState([]);
  const [seenImages, setSeenImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const url = 'https://images-api.nasa.gov/search?q=mars&media_type=image&page=1';
      try {
        const response = await fetch(url);
        const data = await response.json();
        const items = data.collection.items;
        setImages(items);
        setCurrent(items[0]);
      } catch (error) {
        console.error('Error fetching NASA images:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const getAttributes = (item) => {
    const info = item.data[0];
    return [
      info.center,
      info.media_type,
      new Date(info.date_created).getFullYear().toString(),
      ...(info.keywords || []).slice(0, 4),
    ].filter(Boolean);
  };
  const addToSeen = (item) => {
    setSeenImages(prev => {
      const updated = [...prev, item];
      localStorage.setItem('seenImages', JSON.stringify(updated));
      return updated;
    });
  }

  const isBanned = (item) => {
    return getAttributes(item).some(attr => banList.includes(attr));
  };

  const banAttribute = (attr) => {
    if (!banList.includes(attr)) setBanList([...banList, attr]);
  };

  const unban = (attr) => {
    setBanList(banList.filter(a => a !== attr));
  };

  const showRandom = () => {
    const available = images.filter(img => !isBanned(img));
    if (available.length === 0) {
      alert('All images are banned! Remove some tags to continue.');
      return;
    }
    const random = available[Math.floor(Math.random() * available.length)];
    addToSeen(current);
    setCurrent(random);
  };

  if (loading) return <p>Loading Mars images...</p>;
  if (!current) return <p>No images found.</p>;

  const info = current.data[0];
  const imgUrl = current.links?.[0]?.href;
  const attributes = getAttributes(current);

  return (
    <div className="app">
      <div className="seen">
        <h1>Seen Images</h1>
        <div className="seen-images">
          {seenImages.map((item, i) => {
            const seenInfo = item.data[0];
            const seenUrl = item.links?.[0]?.href;
            return (
              <div key={i} style={{ width: '150px' }}>
                {seenUrl && (
                  <img
                    src={seenUrl}
                    alt={seenInfo.title}
                    style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '6px' }}
                  />
                )}
                <p className="seen-image-title">{seenInfo.title}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className = "discover">

      
        <h1>Mars Discover</h1>

        <button className="counter" onClick={showRandom}>
          Discover Another
        </button>

        {imgUrl && (
          <img
            src={imgUrl}
            alt={info.title}
            style={{ maxWidth: '100%', maxHeight: '500px', borderRadius: '8px', display: 'block', margin: '0 auto' }}
          />
        )}

        <h2>{info.title}</h2>
        <p style={{ color: '#888' }}>{info.date_created?.slice(0, 10)}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', margin: '12px 0' }}>
          {attributes.map(attr => (
            <button
              key={attr}
              onClick={() => banAttribute(attr)}
              style={{ padding: '4px 12px', borderRadius: '16px', cursor: 'pointer', background: '#f0f0f0', border: '1px solid #ccc' }}
            >
              {attr}
            </button>
          ))}
        </div>

        <p className="description">{info.description}</p>
      </div>
      <div className="ban">
        <div  style={{ marginTop: '32px', paddingTop: '16px' }}>
          <h3>Ban List</h3>
          {banList.length === 0 && <p style={{ color: '#aaa' }}>Click any tag to ban it</p>}
          <div className="ban-list">
            {banList.map(attr => (
              <button
                key={attr}
                onClick={() => unban(attr)}
                style={{ padding: '4px 12px', borderRadius: '16px', cursor: 'pointer', background: '#ff4d4d', color: 'white', border: 'none' }}
              >
                {attr} ✕
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
