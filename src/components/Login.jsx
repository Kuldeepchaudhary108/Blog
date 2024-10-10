import React from "react";
import { useDispatch } from "react-redux";
import { Link, useDispatch } from "react-router-dom";
import Input from "./Input";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import Button from "./Button";
function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const disPatch = useDispatch();
  const [error, setError] = useState();

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) disPatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(login)}>
        <Input
          placeholder="Enter your Email"
          label="Email"
          type="email"
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        ></Input>
        <Input
          label="password:"
          type="password"
          placeholder="Enter your password"
          {...register("Passwor", { required: true })}
        />
        <Button type="submit">Login</Button>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
