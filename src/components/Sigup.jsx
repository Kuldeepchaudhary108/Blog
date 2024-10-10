import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import { useForm } from "react-hook-form";
import authServie from "../appwrite/auth";
import Button from "./Button";
function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const create = async (data) => {
    try {
      const userData = await authServie.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(create)}>
        <Input
          label="Fullname:"
          type="Text"
          placeholder="Enter your Full name"
          {...register("Fullname", { required: true })}
        />
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
        <Button type="submit">Signup</Button>

        <p className="mt-2 text-center text-base text-black/60">
          You have allready account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
