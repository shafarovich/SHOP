import { makeAutoObservable } from 'mobx';

export default class BasketStore {
  constructor() {
    this._products = [];
    makeAutoObservable(this);
  }
  setProducts(products) {
    this._products = products;
  }
  clearProducts() {
    this._products = [];
  }
  get products() {
    return this._products;
  }
}