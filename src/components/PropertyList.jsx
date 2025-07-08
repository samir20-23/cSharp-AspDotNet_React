import { useEffect, useState } from 'react';

export default function PropertyList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/properties')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div>
      {items.map(p => <div key={p.id}>{p.title}</div>)}
    </div>
  );
}
