import React from "react";
import { CoffeeListProps } from "./AppTypes";

const CoffeeList: React.FC<CoffeeListProps> = ({ coffeeList }) => {
  if (!coffeeList || coffeeList.length === 0) return null;
  return (
    <div className="coffeeListContainer">
      <h5>Your Coffees</h5>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Weight</th>
            <th scope="col">Price</th>
            <th scope="col">Roast</th>
          </tr>
        </thead>
        <tbody>
          {coffeeList.map((coffee) => {
            return (
              <tr key={coffee.id}>
                <td>{coffee.name}</td>
                <td>{coffee.weight}</td>
                <td>{coffee.price}</td>
                <td>{coffee.roast}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CoffeeList;
