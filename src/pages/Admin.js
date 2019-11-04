import React from "react";
import SignOut from "./SignOut";
import { useQuery } from "@apollo/react-hooks";
import GET_POSTS from "../queries/getPosts";

function Admin(props) {
  const { data, loading, error } = useQuery(GET_POSTS);
  if (loading) return <p>Good things take time....</p>;
  if (error) return <p>Something went wrong...</p>;
  return (
    <div>
      <h2>Admin Page </h2>
      {data.entries.map(entry => (
        <h4 key={entry.id}>{entry.id}</h4>
      ))}
      <SignOut />
    </div>
  );
}

export default Admin;
