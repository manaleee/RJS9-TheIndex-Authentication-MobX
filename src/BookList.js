import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

// Components
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";

// Stores
import bookStore from "./stores/BookStore";

const BookList = props => {
  const bookColor = props.match.params.bookColor;
  let books;
  let allBooksButton;

  if (!bookColor) {
    books = bookStore.filteredBooks;
  } else {
    books = bookStore.getBooksByColor(bookColor);
    allBooksButton = (
      <Link to="/books">
        <button className="btn">All Books</button>
      </Link>
    );
  }

  return bookStore.loading ? (
    <Loading />
  ) : (
    <div className="books">
      <h3>Books</h3>
      <SearchBar store={bookStore} />
      {allBooksButton}
      <BookTable books={books} />
    </div>
  );
};

export default observer(BookList);
