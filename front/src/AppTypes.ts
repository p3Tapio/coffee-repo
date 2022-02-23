export interface NewFavCoffee {
  name?: string;
  weight?: number;
  price?: number;
  roast?: number;
}

export interface Coffee extends NewFavCoffee {
  id: string;
}

export interface CoffeeListProps {
  coffeeList: Coffee[] | undefined;
}
