export interface ResponseForItem {
  id: number,
  type: string,
  name: string,
  price: number,
  barcode: string,
  count: number,
  image: string,
  error?: object,
}
