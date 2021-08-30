import $ from "jquery"
import "jquery-validation"
import Swal from "sweetalert2"
import userAPI from "../../api/userAPI"

const RegisterPage = {
    render() {
        window.scrollTo(0, 0)
        try {
            return /*html*/ `
            <style>
                label.error {
                    color: red;
                }
            </style>
    <div>
        <aside clas=" py-5">
            <div class="grid grid-cols-8 gap-5 py-5 bg-gray-100">
                <div class="col-span-2">

                </div>
                <div class="col-span-4">
                    <div class="text-center text-white uppercase text-2xl py-5 bg-green-600">
                            <span>Register</span>
                    </div>
                    <div class="p-5 bg-white">
                        <form id="form-account">
                         <div class="flex w-full pt-5">
                            <div class="bg-green-500 py-2 px-4 rounded-l">
                                <span><i class="fas fa-user text-white"></i></span>
                            </div>
                            <div class="w-full border border-green-200 rounded-r">
                                <input type="text" name="name" placeholder="Name" class="w-full p-2" style="outline: none;" id="name">
                            </div>
                        </div>
                        <div class="flex w-full pt-5">
                            <div class="bg-green-500 py-2 px-4 rounded-l">
                                <span><i class="fas fa-envelope text-white"></i></span>
                            </div>
                            <div class="w-full border border-green-200 rounded-r">
                                <input name="email" type="email" placeholder="Email" class="w-full p-2" style="outline: none;" id="email">
                            </div>
                        </div>
                         <div class="flex w-full pt-5">
                            <div class="bg-green-500 py-2 px-4 rounded-l">
                                <span><i class="fas fa-lock text-white"></i></span>
                            </div>
                            <div class="w-full border border-green-200 rounded-r">
                                 <input name="password" type="password" placeholder="Password" class="w-full p-2" style="outline: none;" id="password">
                            </div>
                        </div>
                         <div class="flex w-full pt-5">
                            <div class="bg-green-500 py-2 px-4 rounded-l">
                                <span><i class="fas fa-lock text-white"></i></span>
                            </div>
                            <div class="w-full border border-green-200 rounded-r">
                                <input name="password_confirm" type="password" placeholder="Confirm Password" class="w-full p-2" style="outline: none;" id="password_confirm">
                            </div>
                        </div>
                        <div class="text-center my-5">
                        <button type="submit" class="bg-green-600 px-5 py-3 rounded text-white hover:bg-gray-900 uppercase" style="outline:none" id="btn">Create an
              account</button>
                    </div>
                     <div class="py-5 text-center">
                        <span>Member? <a href="/#/login" class="text-green-500">Login now</a></span>
                     </div>
                    </form>
                    </div>

                </div>
                <div class="col-span-2">

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
                                <span>Your order will be delivered 3-5 business days after all of your items are available</span>
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
                                <span>We'll match the product prices of key online and local competitors for immediately</span>
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
                                <span>If the item you want is available, we can process a return and place a new order</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </aside>
    </div>
                        `
        } catch (error) {
            console.log("error")
        }
    },
    afterRender() {
        $("#form-account").validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                },
                name: {
                    required: true,
                    maxlength: 50,
                    minlength: 6,
                },
                password: {
                    required: true,
                    minlength: 6,
                    maxlength: 16,
                },
                password_confirm: {
                    required: true,
                    equalTo: "#password",
                },
            },
            messages: {
                email: {
                    email: "Định dạng Email không hợp lệ",
                    required: "Email không được để trống",
                },
                name: {
                    maxlength: "Tên không vượt quá 50 kí tự",
                    minlength: "Tên tối thiểu 6 kí tự",
                    required: "Tên không được để trống",
                },
                password: {
                    required: "Password không được để trống",
                    minlength: "Password tối thiểu 6 kí tự",
                    maxlength: "Password tối đa 16 kí tự",
                },
                password_confirm: {
                    required: "Password Confirm không được để trống",
                    equalTo: "Password Confirm Sai",
                },
            },
            submitHandler: function(form) {
                const dataArray = $(form).serializeArray()
                const data = {}
                dataArray.forEach((item) => {
                    data[item.name] = item.value
                })
                console.log("serializeArray: ", $(form).serializeArray())
                userAPI.addUser(data).then((res) => {
                    if (res.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "Đã đăng ký tài khoản thành công",
                        }).then(() => {
                            document.location.href = "/#/login"
                        })
                    }
                })
            },
        })
        $("#email").on("change", () => {
            const email = $("#email").val()
            if (email && email.length > 0) {
                userAPI.check(email).then((res) => {
                    if (res.data && res.data.message) {
                        Swal.fire({
                            icon: "warning",
                            title: res.data.message,
                        })
                    }
                })
            }
        })
    },
}
export default RegisterPage