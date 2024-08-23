import React from 'react';
import { useEffect, useState } from 'react';

const Wishlist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/games') // HIER an BE anbinden
      .then((response) => {
        if (!response.ok) {
          throw new Error('Netzwerkantwort war nicht ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data); // data =  Array von Objekten
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Lade...</p>;
  }

  if (error) {
    return <p>Fehler: {error.message}</p>;
  }

  return (
    <div className="bg-[#141414] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5   gap-14 p-28  w-full  dark:text-white">
      {data.map((item, index) => (
        <div
          key={index}
          className="item relative border-8 border-[#1CE0AF]  hover:border-4 hover:border-[#1DD0E0] rounded-lg  w-1/10 min-w-[200px] h-80 bg-[#141414] "
        >
          <div
            className="absolute inset-0 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${item.cover_url})` }}
          ></div>
          <div className="absolute inset-0 bg-[#141414] bg-opacity-50 rounded-lg"></div>
          <button
            className="absolute top-2 right-2 z-20 text-[#1CE0AF]"
            aria-label="Toggle Heart"
          >
            ❤️
          </button>
          <div className="absolute bottom-0 w-full flex justify-center items-end">
            <h2 className="relative z-10 text-lg font-semibold text-center  text-[#1CE0AF] mt-auto p-4">
              {item.name}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;

{
  /* <div key={index} class="de-item" style="background-size: cover; background-repeat: no-repeat;">
<div class="d-overlay" style="background-size: cover; background-repeat: no-repeat;">
    <div class="d-label" style="background-size: cover; background-repeat: no-repeat;">
        20% OFF
    </div>
    <div class="d-text" style="background-size: cover; background-repeat: no-repeat;">
        <h4>{item.name}</h4>
        <p class="d-price">Starting at <span class="price">$14.99</span></p>
        <a class="btn-main btn-fullwidth" href="pricing-table-one.html" data-hover="Order Now"><span>Order Now</span></a>
    </div>
</div>
<img src={item.cover_url} class="img-fluid" alt="">
</div> */
}
