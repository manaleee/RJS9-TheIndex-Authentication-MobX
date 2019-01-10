import React from "react";
import { observer } from "mobx-react";

// Components
import AuthorCard from "./AuthorCard";
import SearchBar from "./SearchBar";
import AddAuthorCard from "./AddAuthorCard";

// Store
import authorStore from "./stores/AuthorStore";
import authStore from "./stores/authStore";

const AuthorsList = () => {
  const authorCards = authorStore.filteredAuthors.map(author => (
    <AuthorCard key={author.id} author={author} />
  ));

  return (
    <div>
      <h3>Authors</h3>
      <SearchBar store={authorStore} />
      <div className="row">
        {authStore.user && <AddAuthorCard />}
        {authorCards}
      </div>
    </div>
  );
};

export default observer(AuthorsList);
