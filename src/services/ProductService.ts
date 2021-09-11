import IProduct from "../types/IProduct";
import { BaseService } from "./BaseService";

export default class ProductService extends BaseService {

    // get products 
    async getProduct(): Promise<IProduct[]> {
        const res = await this.instance.get('products');
        return res.data;
    }

    // get product by id 
    async getProductById(id: number) {
        const res = await this.instance.get<IProduct>("products/" + id);
        return res;
    }

    // post product 
    async postProduct(data: IProduct) {
        const res = await this.instance.post("products/", data);
        return res;
    }

    // update product
    async updateProduct(data: IProduct, id: number) {
        const res = await this.instance.put("products/" + id, data);
        return res;
    }

    // delete product {
    async deleteProduct(id: number) {
        const res = await this.instance.delete("products/" + id)
        return res;
    }
}