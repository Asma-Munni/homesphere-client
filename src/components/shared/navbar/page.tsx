"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";

import { authClient } from "@/lib/auth-client";


const guestLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Explore",
    href: "/properties",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];


const userLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Explore",
    href: "/properties",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Add Property",
    href: "/properties/add",
  },
  {
    label: "Manage Property",
    href: "/properties/manage",
  },
];


export function AppNavbar() {

  const router = useRouter();

  const pathname = usePathname();


  const [open, setOpen] = useState(false);


  const {
    data: session,
    isPending,
  } = authClient.useSession();


  const user = session?.user;


  const links = isPending
    ? []
    : user
    ? userLinks
    : guestLinks;



  const handleLogout = async () => {

    await authClient.signOut();

    router.push("/login");

    router.refresh();

  };



  return (

<header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">

<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">


{/* Logo */}

<Link
href="/"
className="flex items-center gap-3"
>

<div className="relative size-10 overflow-hidden rounded-xl">

<Image
src="/Images/logo-homesphere.png"
alt="HomeSphere Logo"
fill
priority
className="object-contain"
/>

</div>


<div className="hidden leading-tight sm:block">

<p className="text-xl font-bold text-slate-900">

Home<span className="text-teal-700">
Sphere
</span>

</p>

</div>

</Link>





{/* Desktop Navigation */}

<nav className="hidden items-center gap-7 lg:flex">

{links.map((link)=>(

<Link
key={link.href}
href={link.href}
className={`text-sm font-medium transition ${
pathname === link.href
? "text-teal-700"
: "text-slate-600 hover:text-teal-700"
}`}
>

{link.label}

</Link>

))}

</nav>





{/* Desktop Right */}

<div className="hidden items-center gap-4 lg:flex">


{
isPending ? (

<div className="h-9 w-24 animate-pulse rounded-xl bg-slate-100" />

)

:

user ? (

<>

<Link
href="/profile"
className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 transition hover:bg-slate-50"
>


{
user.image ? (

<Image
src={user.image}
alt={user.name ?? "User"}
width={32}
height={32}
className="size-8 rounded-full object-cover"
/>

)

:

(

<div className="flex size-8 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-700">

{
user.name
?.charAt(0)
.toUpperCase()
}

</div>

)

}



<span className="max-w-28 truncate text-sm font-semibold text-slate-700">

{user.name}

</span>


</Link>




<button
onClick={handleLogout}
className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
>

<LogOut size={16}/>

Logout

</button>


</>

)

:

(

<>

<Link
href="/login"
className="text-sm font-semibold text-slate-700 transition hover:text-teal-700"
>

Login

</Link>


<Link
href="/register"
className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
>

Register

</Link>


</>

)

}


</div>





{/* Mobile Button */}

<button
onClick={()=>setOpen(!open)}
className="rounded-lg p-2 text-slate-700 lg:hidden"
aria-label="Toggle menu"
>

{
open
?
<X/>
:
<Menu/>
}

</button>


</div>






{/* Mobile Menu */}

{
open && (

<div className="border-t border-slate-200 bg-white px-4 py-5 lg:hidden">


<div className="flex flex-col gap-4">


{
links.map((link)=>(

<Link
key={link.href}
href={link.href}
onClick={()=>setOpen(false)}
className="text-sm font-medium text-slate-700"
>

{link.label}

</Link>

))

}



{
isPending ? null :

user ? (

<button
onClick={handleLogout}
className="flex items-center gap-2 text-sm font-semibold text-red-600"
>

<LogOut size={16}/>

Logout

</button>

)

:

(

<div className="flex gap-4">


<Link
href="/login"
className="text-sm font-semibold text-slate-700"
>

Login

</Link>


<Link
href="/register"
className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white"
>

Register

</Link>


</div>

)

}


</div>


</div>

)

}


</header>

  );
}