"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Home,
  Loader2,
  UserPlus,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

type Role = "tenant" | "property-holder";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  image: string;
  role: Role;
}

export default function SignupForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState<SignupFormData>({
      name: "",
      email: "",
      password: "",
      image: "",
      role: "tenant",
    });


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSignup = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      setError(
        "Please fill all required fields"
      );
      return;
    }


    try {
      setLoading(true);


      const { error } =
        await authClient.signUp.email({

          name: formData.name,

          email: formData.email,

          password: formData.password,

          image:
            formData.image || undefined,

          role: formData.role,

        });


      if (error) {
        setError(
          error.message ??
            "Signup failed"
        );
        return;
      }


      router.push("/login");


    } catch {

      setError(
        "Something went wrong. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };



  const handleGoogleSignup =
    async () => {

      try {

        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/",
        });

      } catch {

        setError(
          "Google signup failed"
        );

      }
    };



  return (

    <section
      className="
      flex
      min-h-screen
      items-center
      bg-slate-50
      py-4
      "
    >

      <div
        className="
        mx-auto
        grid
        max-w-5xl
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-xl
        lg:grid-cols-2
        "
      >


        {/* Left Branding */}

        <div
          className="
          hidden
          bg-gradient-to-br
          from-teal-700
          to-slate-950
          p-10
          text-white
          lg:block
          "
        >

          <div
            className="
            flex
            items-center
            gap-3
            "
          >

            <div
              className="
              flex
              size-11
              items-center
              justify-center
              rounded-xl
              bg-white/10
              "
            >
              <Home />
            </div>


            <h2
              className="
              text-2xl
              font-bold
              "
            >
              HomeSphere
            </h2>

          </div>


          <h1
            className="
            mt-10
            text-4xl
            font-bold
            leading-tight
            "
          >
            Find a place
            that feels
            like home.
          </h1>


          <p
            className="
            mt-4
            text-base
            leading-7
            text-slate-200
            "
          >
            Join tenants and property
            holders building a smarter
            property community.
          </p>


        </div>




        {/* Form */}


        <div
          className="
          p-5
          sm:p-8
          "
        >


          <div
            className="
            mb-5
            "
          >

            <h2
              className="
              text-3xl
              font-bold
              text-slate-900
              "
            >
              Create Account
            </h2>


            <p
              className="
              mt-2
              text-sm
              text-slate-600
              "
            >
              Start your HomeSphere journey.
            </p>

          </div>




          <button
            type="button"
            onClick={handleGoogleSignup}
            className="
            mb-4
            flex
            h-11
            w-full
            items-center
            justify-center
            gap-3
            rounded-xl
            border
            border-slate-200
            font-semibold
            text-slate-700
            transition
            hover:bg-slate-50
            "
          >

            <span
              className="
              text-lg
              font-bold
              "
            >
              G
            </span>

            Continue with Google

          </button>





          <div
            className="
            mb-4
            flex
            items-center
            gap-3
            "
          >

            <div
              className="
              h-px
              flex-1
              bg-slate-200
              "
            />

            <span
              className="
              text-xs
              text-slate-400
              "
            >
              OR
            </span>


            <div
              className="
              h-px
              flex-1
              bg-slate-200
              "
            />

          </div>






          <form
            onSubmit={handleSignup}
            className="
            space-y-3
            "
          >


            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />


            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
            />


            <Input
              label="Photo URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://image-url.com"
            />



            <div>

              <label
                className="
                mb-1
                block
                text-sm
                font-semibold
                text-slate-700
                "
              >
                Account Type
              </label>


              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="
                h-11
                w-full
                rounded-xl
                border
                border-slate-200
                px-4
                outline-none
                focus:border-teal-600
                "
              >

                <option value="tenant">
                  Tenant / User
                </option>


                <option value="property-holder">
                  Property Holder
                </option>


              </select>

            </div>





            <div className="relative">

              <Input
                label="Password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
              />


              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                absolute
                right-4
                top-8
                text-slate-500
                "
              >

                {
                  showPassword
                    ?
                    <EyeOff size={18}/>
                    :
                    <Eye size={18}/>
                }

              </button>


            </div>




            {error && (

              <p
                className="
                rounded-xl
                bg-red-50
                p-2
                text-sm
                text-red-600
                "
              >
                {error}
              </p>

            )}






            <button
              disabled={loading}
              className="
              flex
              h-11
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-teal-700
              font-semibold
              text-white
              transition
              hover:bg-teal-800
              disabled:opacity-60
              "
            >

              {
                loading
                  ?
                  <Loader2
                    className="animate-spin"
                    size={18}
                  />
                  :
                  <UserPlus size={18}/>
              }


              Create Account

            </button>



          </form>


          <p
            className="
            mt-4
            text-center
            text-sm
            text-slate-600
            "
          >

            Already have an account?

            {" "}

            <a
              href="/login"
              className="
              font-semibold
              text-teal-700
              "
            >
              Login
            </a>

          </p>


        </div>


      </div>


    </section>

  );
}




interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {

  label: string;

}



function Input({
  label,
  ...props
}: InputProps) {

  return (

    <div>

      <label
        className="
        mb-1
        block
        text-sm
        font-semibold
        text-slate-700
        "
      >
        {label}
      </label>


      <input
        {...props}
        className="
        h-11
        w-full
        rounded-xl
        border
        border-slate-200
        px-4
        text-sm
        outline-none
        transition
        placeholder:text-slate-400
        focus:border-teal-600
        focus:ring-2
        focus:ring-teal-100
        "
      />

    </div>

  );
}