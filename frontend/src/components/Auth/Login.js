import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../redux/slices/auth/authSlice";
import ErrorMsg from "../ErrorMsg/ErrorMsg";


const Login = () => {
  // dispatch
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "brightbediako.x@gmail.com",
    password: "1234567",
  });
  //---Destructuring---
  const { email, password } = formData;
  //---onchange handler----
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //---onsubmit handler----
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = { email, password };
    //dispatch login action
    dispatch(loginUserAction(formData));
  };

  // get data from store
  const { error, loading, userInfo } = useSelector((state) => state?.users?.userAuth);

  // redirect if logged in success
  // if (userInfo?.userFound?.isAdmin) {
  //   window.location.href = "/admin";
  // } else {
  //   window.location.href = "/customer-profile";
  // }


  return (
    <>
      <section className="py-20 bg-gray-100 overflow-x-hidden">
        <div className="relative container px-4 mx-auto">
          <div className="absolute inset-0 bg-blue-200 my-24 -ml-4" />
          <div className="relative flex flex-wrap bg-white">
            <div className="w-full md:w-4/6 px-4">
              <div className="lg:max-w-3xl mx-auto py-20 px-4 md:px-10 lg:px-20">
                <h3 className="mb-8 text-4xl md:text-5xl font-bold font-heading">
                  Login to your account
                </h3>
                <p className="mb-10 font-semibold font-heading">
                  Welcome back!
                </p>
                {/* err */}
                {error && <ErrorMsg message={error?.message} />}
                <form
                  className="flex flex-wrap -mx-4"
                  onSubmit={onSubmitHandler}>
                  <div className="w-full md:w-1/2 px-4 mb-8 md:mb-12">
                    <label>
                      <h4 className="mb-5 text-gray-400 uppercase font-bold font-heading">
                        Your Email
                      </h4>
                      <input
                        name="email"
                        value={email}
                        onChange={onChangeHandler}
                        className="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                        type="email"
                      />
                    </label>
                  </div>
                  <div className="w-full md:w-1/2 px-4 mb-12">
                    <label>
                      <h4 className="mb-5 text-gray-400 uppercase font-bold font-heading">
                        Password
                      </h4>
                      <input
                        name="password"
                        value={password}
                        onChange={onChangeHandler}
                        className="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                        type="password"
                      />
                    </label>
                  </div>

                  <div className="w-full px-4">
                    {loading ? 
                    <button disabled className="bg-gray-800 text-white font-bold font-heading py-5 px-8 rounded-md uppercase">
                      Loading...
                    </button>: 
                    <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold font-heading py-5 px-8 rounded-md uppercase">
                      Login
                    </button>}
                  </div>
                </form>
              </div>
            </div>
            <div
              className="w-full md:w-2/6 h-128 md:h-auto flex items-center lg:items-end px-4 pb-20 bg-cover bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://cdn.pixabay.com/photo/2021/10/11/11/12/countryside-6700296_1280.jpg")',
              }}></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
