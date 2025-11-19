import { makeAutoObservable } from "mobx";

interface IType {
  id: number;
  name: string;
}

interface IBrand {
  id: number;
  name: string;
}

interface IDevice {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
}

export default class DeviceStore {
  _types: IType[];
  _brands: IBrand[];
  _devices: IDevice[];

  constructor() {
    this._types =[
      {id: 1, name: 'Холодильники'},
      {id: 2, name: 'Смартфоны'},
    ];
    this._brands = [
      {id: 1, name: 'Samsung'},
      {id: 2, name: 'Apple'},
    ];
    this._devices = [
      {id: 1, name: 'Iphone 11', price: 25000, rating: 5, img: 'https://placehold.co/600x400?text=iphone+11'},
      {id: 2, name: 'Iphone 12', price: 26000, rating: 5, img: 'https://placehold.co/600x400?text=iphone+12'},
      {id: 3, name: 'Iphone 13', price: 27000, rating: 5, img: 'https://placehold.co/600x400?text=iphone+13'},
      {id: 4, name: 'Iphone 14', price: 28000, rating: 5, img: 'https://placehold.co/600x400?text=iphone+14'},
    ];
    makeAutoObservable(this);
  }

  setTypes (types: IType[]) {
    this._types = types;
  }
   setBrands (brands: IBrand[]) {
    this._brands = brands;
  }
   setDevice (devices: IDevice[]) {
    this._devices = devices;
  }

  get types() {
    return this._types;
  }
   get brands() {
    return this._brands;
  }
   get devices() {
    return this._devices;
  }
}