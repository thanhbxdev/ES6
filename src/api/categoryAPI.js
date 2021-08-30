import { axiosClient } from "./axiosClient";

const CategoryAPI = {
    getAll() {
        const url = 'api/category/list';
        return axiosClient.get(url);
    },
    get(id) {
        const url = `api/category/${id}`;
        return axiosClient.get(url);
    },
    addCategory(category) {
        const url = `api/category/create`;
        return axiosClient.post(url, category);
    },
    removeCategory(id) {
        const url = `api/category/${id}`;
        return axiosClient.delete(url);
    },
    updateCate(id, data) {
        const url = `api/category/${id}`;
        return axiosClient.put(url, data);
    }
}
export
default CategoryAPI;