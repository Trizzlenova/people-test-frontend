import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import People from "../pages/People";
import Show from "../pages/Show";

function Main(props) {
  const [people, setPeople] = useState(null);

  const URL = "https://people-404.herokuapp.com/people";

  const getPeople = () => {
    // fetching all people from our heroku URL
    fetch(URL)
      .then((response) => response.json())
      .then((result) => setPeople(result));
  };

  const createPeople = async (person) => {
    // make post request to create People
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  };

  useEffect(() => getPeople(), []);

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={<People people={people} createPeople={createPeople} />}
        />
        <Route path="/people/:id" render={(rp) => <Show {...rp} />} />
      </Routes>
    </main>
  );
}

export default Main;
