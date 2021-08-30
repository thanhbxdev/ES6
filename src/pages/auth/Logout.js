import Auth from "../../auth"

const Logout = {
    render() {
        Auth.logout()
        document.location.href = "/"
    },
}
export default Logout