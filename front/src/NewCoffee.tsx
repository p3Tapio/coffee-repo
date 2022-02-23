import React, { FormEvent } from "react";
import { NewFavCoffee } from "./AppTypes";

const NewCoffee: React.FC<{
  submitCoffee: (event: React.FormEvent<HTMLFormElement>) => void;
  setNewCoffee: React.Dispatch<React.SetStateAction<NewFavCoffee>>;
  newCoffee: NewFavCoffee;
}> = ({ submitCoffee, newCoffee, setNewCoffee }) => (
  <div>
    <h5>Coffee form</h5>
    <br />
    <form onSubmit={submitCoffee}>
      <div className="form-group row formMarginBottom">
        <label htmlFor="coffeeName" className="col-sm-2 col-form-label">
          Name
        </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            type="text"
            id="coffeeName"
            value={newCoffee.name}
            onChange={(ev: FormEvent) =>
              setNewCoffee({
                ...newCoffee,
                name: (ev.target as HTMLTextAreaElement).value,
              })
            }
          />
        </div>
      </div>
      <div className="form-group row formMarginBottom">
        <label htmlFor="coffeeWeight" className="col-sm-2 col-form-label">
          Weight
        </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            type="number"
            min="0"
            id="coffeeWeight"
            value={newCoffee.weight || ""}
            onChange={(ev: FormEvent) =>
              setNewCoffee({
                ...newCoffee,
                weight: Number((ev.target as HTMLTextAreaElement).value),
              })
            }
          />
        </div>
      </div>
      <div className="form-group row formMarginBottom">
        <label htmlFor="coffeePrice" className="col-sm-2 col-form-label">
          Price
        </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            type="number"
            min="0"
            id="coffeePrice"
            value={newCoffee.price || ""}
            onChange={(ev: FormEvent) =>
              setNewCoffee({
                ...newCoffee,
                price: Number((ev.target as HTMLTextAreaElement).value),
              })
            }
          />
        </div>
      </div>
      <div className="form-group row formMarginBottom">
        <label htmlFor="coffeeRoast" className="col-sm-2 col-form-label">
          Roast
        </label>
        <div className="col-sm-10">
          <select
            className="form-control"
            id="coffeeRoast"
            value={newCoffee.roast}
            onChange={(ev: FormEvent) =>
              setNewCoffee({
                ...newCoffee,
                roast: Number((ev.target as HTMLTextAreaElement).value),
              })
            }
          >
            <option value="" disabled>
              Choose a roast!
            </option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
          </select>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "auto" }}>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
);

export default NewCoffee;
