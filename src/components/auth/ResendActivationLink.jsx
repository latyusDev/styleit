import React, { useState } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { useAuth } from "@/store/useAuth";
import m_logo from "@/images/m_logo.png";
import Image from "../global/Image";
import { Button } from "../ui/button";

const ResendActivationLink = () => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user  = Cookies.get('user')?JSON.parse(Cookies.get('user')):null

  const navigate = useNavigate();

  const handleLogin = () => {
    Cookies.remove('resendToken')
    navigate("/login");
  };

  const resendLink = async (e) => {
    e.preventDefault();
    const resendToken = Cookies.get("resendToken");
    if (!resendToken) {
      toast("You are not unauthorized", {
        action: { label: <X size={16} /> },
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "/resend-activation",
        { email },
        {
          headers: {
            Authorization: `Bearer ${resendToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
       if (response.status === 200 && response?.data?.status === 'error') {
        setIsSent(false);
        toast(response?.data?.message, {
          action: { label: <X size={16} /> },
        });
      }

      if (response.status === 200 && response?.data?.status === 'success') {
        setIsSent(true);
        toast(response?.data?.message, {
          action: { label: <X size={16} /> },
        });
      }
    } catch (error) {
      toast(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong, try again",
        {
          action: { label: <X size={16} /> },
        }
      );
    } finally {
      setIsLoading(false);
      setIsSent(false);

    }
  };
  const returningUser = !!user

  return (
    <div>
      <form
        onSubmit={resendLink}
        className="font-lato max-w-xl mx-auto mt-12 shadow-md border p-6 rounded-xl"
      >
        <Image src={m_logo} className="mx-auto mb-3" />
        {
          returningUser?
        <div className="text-center mb-4 ">
            <h1 className=" text-xl font-bold md:font-bold md:text-2xl ">
          Welcome back {user?.first_name} 👋
        </h1>
        <p className="text-gray-500 text-sm leading-4 md:leading-5 md:text-md">Fill in your email to verify your account and get started</p>
        </div>:
        <div className="text-center mb-4 ">
            <h1 className=" text-xl font-bold mt-2 md:font-bold md:text-2xl ">
          Resend Activation Link
        </h1>
        <p className="text-gray-500 text-sm text-center mb-3 leading-4 md:leading-5 md:text-md">Fill in your email to verify your account and get started</p>
        </div>

        }

        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-5 placeholder-gray-400"
        />

        <Button
          type="submit"
          disabled={isLoading || !email}
          className="bg-primary w-full disabled:cursor-not-allowed mt-5 py-2.5 rounded-md text-white text-lg flex justify-center items-center"
        >
          {isLoading ? (
            <span className="flex items-center gap-1"><Loader2 className="animate-spin size-5" /> resending...</span>
          ) : (
            "Resend Link"
          )}
        </Button>
     
      </form>

      {isSent && (
        <p className="text-center text-lg mt-8 text-gray-500">
          We’ve sent a new activation link to <span className="font-medium">{email}</span>.
          <br />
          After verifying, click here to{" "}
          <span
            className="text-primary cursor-pointer underline"
            onClick={handleLogin}
          >
            Login again
          </span>
        </p>
      )}
    </div>
  );
};

export default ResendActivationLink;