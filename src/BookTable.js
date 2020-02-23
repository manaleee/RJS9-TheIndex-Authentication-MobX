import React from "react";

import BookRow from "./BookRow";

const BookTable = ({ books }) => {
  const bookRows = books.map(book => <BookRow key={book.id} book={book} />);
  return (
    <table className="mt-3 table">
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Authors</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>{bookRows}</tbody>
    </table>
  );
};

export default BookTable;
