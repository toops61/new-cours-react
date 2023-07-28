//Persos
export interface dataFields {
    pseudo:string;
    persoName:string;
}

export interface persoCard extends dataFields {
    id:string;
}

//Fruity
export interface fruitFields {
    name:string;
    url: string;
    price: number;
    id: string;
}

export interface cartFruitFields extends fruitFields {
    quantity: number
}