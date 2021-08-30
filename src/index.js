import Header from "./components/Header.js"
import AboutPgae from "./pages/AboutPage.js"
import AdminCategoryAddPage from "./pages/admin/AdminCategoryAddPage.js"
import AdminCategoryEdit from "./pages/admin/AdminCategoryEdit.js"
import AdminCategoryPage from "./pages/admin/AdminCategoryPage.js"
import AdminPage from "./pages/admin/AdminPage.js"
import AdminProductAddPage from "./pages/admin/AdminProductAddPage.js"
import AdminProductEditPage from "./pages/admin/AdminProductEditPage.js"
import AdminProductPage from "./pages/admin/AdminProductPage.js"
import LoginPage from "./pages/auth/Login.page.js"
import Logout from "./pages/auth/Logout.js"
import RegisterPage from "./pages/auth/Register.page.js"
import BlogPage from "./pages/BlogPage.js"
import BlogPostPage from "./pages/BlogPostPage.js"
import Cart from "./pages/Cart.js"
import CategoryPage from "./pages/CategoryPage.js"
import ContactPage from "./pages/ContactPage.js"
import Error404Page from "./pages/Error404Page.js"
import HomePage from "./pages/Homepage.js"
import ProductDetails from "./pages/ProductDetails.js"
import ProductsPage from "./pages/ProductsPage.js"
import { $, parseRequestUrl } from "./unlti.js"
/*End Import*/
const routes = {
    "/": HomePage,
    "/product": ProductsPage,
    "/product/:id": ProductDetails,
    "/category/:id": CategoryPage,
    "/contact": ContactPage,
    "/about": AboutPgae,
    "/blog": BlogPage,
    "/blog-post/:id": BlogPostPage,
    "/cart": Cart,
    "/admin": AdminPage,
    "/admin-list-product": AdminProductPage,
    "/admin-add-product": AdminProductAddPage,
    "/admin-edit-product/:id": AdminProductEditPage,
    "/admin-list-category": AdminCategoryPage,
    "/admin-add-category": AdminCategoryAddPage,
    "/admin-edit-category/:id": AdminCategoryEdit,
    // "/admin-list-blog": AdminBlogPage,
    // "/admin-add-blog": AdminBlogAddPage,
    // "/admin-edit-blog/:id": AdminBlogEditPage,
    "/register": RegisterPage,
    "/login": LoginPage,
    "/logout": Logout,
}

const router = async() => {
    const { resource, id } = parseRequestUrl()
    const parseUrl = (resource ? `/${resource}` : "/") + (id ? "/:id" : "")
    const page = routes[parseUrl] ? routes[parseUrl] : Error404Page
    $("#header").innerHTML = await Header.render()
    $("#main-content").innerHTML = await page.render()
        // $('#footer').innerHTML = footer.render();
    await page.afterRender()
}
const scroll = $("#scroll button")
scroll.addEventListener("click", function() {
    window.scrollTo(0, 0)
})
window.addEventListener("DOMContentLoaded", router)
window.addEventListener("hashchange", router)