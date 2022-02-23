import React, { useEffect, useState } from "react";
import "./App.css";
import { Coffee, NewFavCoffee } from "./AppTypes";

import NewCoffee from "./NewCoffee";
import CoffeeList from "./CoffeeList";
import useCoffee from "./useCoffee";

const initialCoffee: NewFavCoffee = {
  name: "",
  weight: 0,
  price: 0,
  roast: 1,
};

const App: React.FC = () => {
  const [showList, setShowList] = useState<boolean>(false);
  const [coffeeList, setCoffeeList] = useState<Coffee[]>();
  const [newCoffee, setNewCoffee] = useState<NewFavCoffee>(initialCoffee);
  const { getCoffees, addCoffee } = useCoffee();

  useEffect(() => {
    if (!coffeeList) {
      getCoffees().then((coffees) => setCoffeeList(coffees));
    }
  }, [getCoffees, coffeeList]);

  const handleNewCoffee = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!newCoffee.name || !newCoffee.weight || !newCoffee.price) {
      return;
    }

    const coffees = await addCoffee(newCoffee);
    setCoffeeList(coffees);
    setNewCoffee(initialCoffee);
    setShowList(true);
  };

  const text = showList
    ? coffeeList && coffeeList.length > 0
      ? "Below you can see your favorite coffees!"
      : "No coffees yet!"
    : "With the form below, you can add your favorite coffee!";

  return (
    <div className="mainContainer">
      <h1>Hello</h1>
      <p>{text}</p>
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => setShowList(!showList)}
      >
        {showList ? "Add new coffee" : "See your favorites"}
      </button>
      <hr />
      {showList ? (
        <CoffeeList coffeeList={coffeeList} />
      ) : (
        <NewCoffee
          submitCoffee={handleNewCoffee}
          newCoffee={newCoffee}
          setNewCoffee={setNewCoffee}
        />
      )}
    </div>
  );
};

export default App;
