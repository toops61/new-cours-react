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

export interface usersFields {
    id: string;
    name: string;
    username: string;
    email: string;
    address: object;
    phone: string;
    website: string;
    geo: object;
}

export interface fetchFields {
    loading: boolean;
    data: usersFields[] | null;
    error: boolean;
}

export interface chronoFields {
    value: number;
    intervalID: number | null;
}

export interface taskFields {
    value?: string;
    id: string;
    priority?: string;
}