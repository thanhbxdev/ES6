import $ from "jquery"
import "jquery-validation"
import Swal from "sweetalert2"
import userAPI from "../../api/userAPI"
import { ADMIN, AUTH, AUTH_TOKEN } from "../../constant"
const LoginPage = {
    render() {
        return /*html*/ `
                    <div class="page-content">
                      <div>
                          <aside class="bg-gray-100 py-5">
                              <div class="grid grid-cols-3 gap-5 py-5">
                                  <div class="col-span-1">

                                  </div>
                                  <div class="col-span-1">
                                      <div class="text-center text-white uppercase text-2xl py-5 bg-green-600">
                                          <span>Login</span>
                                      </div>
                                      <div class="p-5 bg-white">
                                          <form action="" id="form-account">
                                              <div class="flex w-full pt-5">
                                                  <div class="bg-green-500 py-2 px-4 rounded-l">
                                                      <span><i class="fas fa-user text-white"></i></span>
                                                  </div>
                                                  <div class="w-full border border-green-200 rounded-r">
                                                      <input type="text" style="outline: none;" class="w-full p-2 " placeholder="Email" id="email" name="email">
                                                  </div>
                                              </div>
                                              <div class="flex w-full pt-5">
                                                  <div class="bg-green-500 py-2 px-4 rounded-l">
                                                      <span><i class="fas fa-lock text-white"></i></span>
                                                  </div>
                                                  <div class="w-full border border-green-200 rounded-r">
                                                      <input type="password" style="outline: none;" class="w-full p-2 " placeholder="Password" id="password"  name="password">
                                                  </div>
                                              </div>
                                              <div class="text-center pt-5">
                                                  <button type="submit" class="bg-green-600 px-5 py-3 rounded text-white hover:bg-gray-900 uppercase" style="outline:none">Login</button>
                                              </div>
                                              <div class="py-5 text-center">
                                                  <span>Not a member ? <a href="/#/register" class="text-green-500">Register now</a></span>
                                              </div>
                                          </form>
                                      </div>
                                  </div>
                                  <div class="col-span-1">

                                  </div>
                              </div>
                          </aside>
                          <!-- End Silde  -->
                          <aside class="bg-gray-900 text-white ">
                              <div class="container mx-auto p-5 ">
                                  <div class="grid grid-cols-12 gap-5 ">
                                      <div class="col-span-4 flex ">
                                          <div class="items-center text-5xl p-3 ">
                                              <i class="fa fa-database " aria-hidden="true "></i>
                                          </div>
                                          <div>
                                              <div>
                                                  <span>Extra fast delivery</span>
                                              </div>
                                              <div>
                                                  <span>Your order will be delivered 3-5 business days after all of your items are
                                                      available</span>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="col-span-4 flex ">
                                          <div class="items-center text-5xl p-3 ">
                                              <i class="fa fa-university " aria-hidden="true "></i>
                                          </div>
                                          <div>
                                              <div>
                                                  <span>Best price</span>
                                              </div>
                                              <div>
                                                  <span>We'll match the product prices of key online and local competitors for
                                                      immediately</span>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="col-span-4 flex ">
                                          <div class="items-center text-5xl p-3 ">
                                              <i class="fa fa-cube " aria-hidden="true "></i>
                                          </div>
                                          <div>
                                              <div>
                                                  <span>Guarantee</span>
                                              </div>
                                              <div>
                                                  <span>If the item you want is available, we can process a return and place a new
                                                      order</span>
                                              </div>
                                          </div>
                                      </div>

                                  </div>
                              </div>
                          </aside>
                          </div>
                     </div>
                   `
    },
    afterRender() {
        $("#form-account").validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                    minlength: 6,
                    maxlength: 16,
                },
            },
            messages: {
                email: {
                    email: "Định dạng Email không hợp lệ",
                    required: "Email không được để trống",
                },
                password: {
                    required: "Password không được để trống",
                    minlength: "Password tối thiểu 6 kí tự",
                    maxlength: "Password tối đa 16 kí tự",
                },
            },
            submitHandler: function(form) {
                const dataArray = $(form).serializeArray()
                const data = {}
                dataArray.forEach((item) => {
                        data[item.name] = item.value
                    })
                    // console.log("serializeArray: ", $(form).serializeArray())
                userAPI
                    .login(data)
                    .then((res) => {
                        console.log(res)
                        if (res.status != 200) {
                            Swal.fire({
                                icon: `warning`,
                                title: `Tài Khoản Hoặc Mật Khẩu Sai`,
                            })
                            return
                        }
                        localStorage.setItem(AUTH_TOKEN, res.data.token)
                        localStorage.setItem(AUTH, JSON.stringify(res.data.user))
                        if (res.data.user.role === ADMIN) {
                            document.location.href = "/#/admin"
                        } else {
                            document.location.href = "/"
                        }
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: `warning`,
                            title: `Đăng Nhập Không Thành Công`,
                        })
                    })
            },
        })
    },
}
export default LoginPage