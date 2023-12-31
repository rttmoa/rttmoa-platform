import React, { useState, useEffect } from 'react';

const List = () => {
  const [listItems, setListItems] = useState(Array.from(Array(15).keys(), n => n + 1));
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  function handleScroll() { 
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
    console.log(123)
    setIsFetching(true);
  }

  function fetchMoreListItems() {
    setTimeout(() => {
      setListItems(prevState => ([...prevState, ...Array.from(Array(15).keys(), n => n + prevState.length + 1)]));
      setIsFetching(false);
    }, 2000);
  }

  return (
    <>
      <ul className="list-group mb-2">
        {listItems.map((listItem, key) => <li key={key} className="list-group-item">List Item {listItem}</li>)}
      </ul>
      {isFetching && 'Fetching more list items...'}
    </>
  );
};

export default List;
