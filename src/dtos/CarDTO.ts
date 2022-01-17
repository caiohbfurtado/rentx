type Acessory = {
  name: string;
  type: string;
}

export type CarDTO = {
  id: string;
  about: string;
  accessories: Acessory[];
  brand: string;
  name: string;
  fuel_type: string;
  photos: string[];
  rent: {
    period: string;
    price: number;
  }
  thumbnail: string;
}