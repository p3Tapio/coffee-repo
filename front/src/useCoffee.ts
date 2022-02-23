import axios from "axios";
import { Coffee, NewFavCoffee } from "./AppTypes";

const url = "http://localhost:3001/api/coffees";

const useCoffee = () => {
  const getCoffees = async (): Promise<Coffee[]> => {
    const response = await axios.get<Coffee[]>(url);
    const { data } = response;
    return data;
  };
  const addCoffee = async (newCoffee: NewFavCoffee): Promise<Coffee[]> => {
    const response = await axios.post<Coffee[]>(url, newCoffee);
    const { data } = response;
    return data;
  };
  return { getCoffees, addCoffee };
};
export default useCoffee;
