import { axiosClient } from "./axiosClient"

const userAPI = {
    getAll() {
        const url = "/user"
        return axiosClient.get(url)
    },
    get(id) {
        const url = `/user/${id}`
        return axiosClient.get(url)
    },
    addUser(user) {
        const url = `/api/signup`
        return axiosClient.post(url, user)
    },
    removeUser(id) {
        const url = `/user/${id}`
        return axiosClient.delete(url)
    },
    updateCate(id, data) {
        const url = `/user/${id}`
        return axiosClient.put(url, data)
    },
    check(email) {
        return axiosClient.get(`/api/user/check?email=${email}`)
    },
    login(data) {
        return axiosClient.post(`/api/signin`, data)
    },
}
export default userAPI