import { makeAutoObservable } from "mobx";

export interface IType {
  id: number;
  name: string;
}

export interface IBrand {
  id: number;
  name: string;
}

export interface IDevice {
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
  _selectedType: IType;
  _selectedBrand: IBrand;
  
  constructor() {
    this._types =[
      {id: 1, name: 'Холодильники'},
      {id: 2, name: 'Смартфоны'},
      {id: 3, name: 'Ноутбуки'},
      {id: 4, name: 'Телевизоры'},
    ];
    this._brands = [
      {id: 1, name: 'Samsung'},
      {id: 2, name: 'Apple'},
      {id: 3, name: 'Lenovo'},
      {id: 4, name: 'Asus'},
    ];
    this._devices = [
      {id: 1, name: 'Iphone 11', price: 25000, rating: 5, img: 'https://placehold.co/140x150?text=iphone+11'},
      {id: 2, name: 'Iphone 12', price: 26000, rating: 5, img: 'https://placehold.co/140x150?text=iphone+12'},
      {id: 3, name: 'Iphone 13', price: 27000, rating: 5, img: 'https://placehold.co/140x150?text=iphone+13'},
      {id: 4, name: 'Iphone 14', price: 28000, rating: 5, img: 'https://placehold.co/140x150?text=iphone+14'},
      {id: 5, name: 'Iphone 14', price: 28000, rating: 5, img: 'https://placehold.co/140x150?text=iphone+14'},
      {id: 6, name: 'Iphone 14', price: 28000, rating: 5, img: 'https://placehold.co/140x150?text=iphone+14'},
      {id: 7, name: 'Iphone 14', price: 28000, rating: 5, img: 'https://placehold.co/140x150?text=iphone+14'},
      {id: 8, name: 'Iphone 14', price: 28000, rating: 5, img: 'https://placehold.co/140x150?text=iphone+14'},
    ];
    this._selectedType = {id: 0, name: 'change'};
    this._selectedBrand = {id: 0, name: 'change'};
    makeAutoObservable(this);
  }

  setTypes(types: IType[]) {
    this._types = types;
  }
   setBrands(brands: IBrand[]) {
    this._brands = brands;
  }
   setDevice(devices: IDevice[]) {
    this._devices = devices;
  }
  setSelectedType(type: IType) {
    this._selectedType = type;
  }
  setSelectedBrand(brand: IBrand) {
    this._selectedBrand = brand;
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
  get selectedType() {
    return this._selectedType;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
}