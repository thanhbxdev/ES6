import { axiosClient } from "./axiosClient"

const ProductAPI = {
    getAll() {
        const url = "api/products"
        return axiosClient.get(url)
    },
    get(id) {
        const url = `api/product/${id}`
        return axiosClient.get(url)
    },
    async addProduct(product) {
        const url = `api/products`
        return axiosClient.post(url, product)
    },
    removeProduct(id) {
        const url = `api/product/${id}`
        return axiosClient.delete(url)
    },
    updateProduct(id, data) {
        const url = `api/product/${id}`
        return axiosClient.put(url, data)
    },
}
export default ProductAPI