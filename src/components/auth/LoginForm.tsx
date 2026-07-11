"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  Home,
  Loader2,
  LogIn,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";



export default function LoginForm() {


  const router = useRouter();


  const [showPassword,setShowPassword] =
    useState(false);


  const [loading,setLoading] =
    useState(false);


  const [error,setError] =
    useState("");



  const [formData,setFormData] =
    useState({

      email:"",
      password:"",

    });



  const handleChange = (
    e:React.ChangeEvent<HTMLInputElement>
  )=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });

  };





  const handleLogin =
  async(
    e:React.FormEvent
  )=>{

    e.preventDefault();


    setError("");



    if(
      !formData.email ||
      !formData.password
    ){

      setError(
        "Please enter email and password"
      );

      return;

    }



    try{


      setLoading(true);



      const {error} =
      await authClient.signIn.email({

        email:
        formData.email,


        password:
        formData.password,


        callbackURL:"/",

      });



      if(error){

        setError(
          error.message ??
          "Invalid credentials"
        );

        return;

      }



      router.push("/");


      router.refresh();



    }
    catch{

      setError(
        "Something went wrong. Try again."
      );

    }
    finally{

      setLoading(false);

    }


  };







  const handleGoogleLogin =
  async()=>{

    try{


      await authClient.signIn.social({

        provider:"google",

        callbackURL:"/",

      });


    }
    catch{

      setError(
        "Google login failed"
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
py-8
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


{/* Left */}

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
mt-12
text-4xl
font-bold
leading-tight
"
>

Welcome Back

</h1>



<p
className="
mt-4
text-slate-200
"
>

Login to continue finding
your perfect home.

</p>



</div>






{/* Right */}

<div
className="
p-5
sm:p-8
"
>


<h2
className="
text-3xl
font-bold
text-slate-900
"
>

Login

</h2>


<p
className="
mt-2
text-sm
text-slate-600
"
>

Access your HomeSphere account.

</p>





<button

type="button"

onClick={handleGoogleLogin}

className="
mt-6
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
font-bold
text-lg
"
>
G
</span>


Continue with Google


</button>







<div
className="
my-5
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
onSubmit={handleLogin}
className="
space-y-4
"
>


<Input

label="Email"

name="email"

type="email"

placeholder="example@email.com"

value={formData.email}

onChange={handleChange}

/>





<div
className="
relative
"
>


<Input

label="Password"

name="password"

type={
showPassword
?
"text"
:
"password"
}

placeholder="********"

value={formData.password}

onChange={handleChange}

/>



<button

type="button"

onClick={()=>
setShowPassword(
!showPassword
)
}

className="
absolute
right-4
top-9
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







{
error && (

<p
className="
rounded-xl
bg-red-50
p-3
text-sm
text-red-600
"
>

{error}

</p>

)

}







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
size={18}
className="animate-spin"
/>
:
<LogIn
size={18}
/>
}


Login


</button>




</form>







<p
className="
mt-5
text-center
text-sm
text-slate-600
"
>

Do not have an account?

{" "}

<a
href="/register"
className="
font-semibold
text-teal-700
"
>

Create Account

</a>


</p>




</div>



</div>


</section>

  );

}





interface InputProps
extends React.InputHTMLAttributes<HTMLInputElement>{

label:string;

}



function Input({

label,

...props

}:InputProps){


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