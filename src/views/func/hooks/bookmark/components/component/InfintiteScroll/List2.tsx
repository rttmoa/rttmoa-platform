import React, { useState } from 'react';
import useInfiniteScroll from "./useInfiniteScroll";



const List2: React.FC = () => {
  const [listItems, setListItems] = useState(Array.from(Array(15).keys(), n => n + 1));
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems) 

  function fetchMoreListItems() {
    setTimeout(() => {
      setListItems(prevState => ([...prevState, ...Array.from(Array(15).keys(), n => n + prevState.length + 1)]));
			// FIXME: 在子组件中指定setIsFetching类型<any>
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

export default List2;
