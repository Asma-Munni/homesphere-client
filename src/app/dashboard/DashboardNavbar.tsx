"use client";

import Image from "next/image";
import { Menu } from "lucide-react";


interface DashboardNavbarProps {

  openSidebar:()=>void;

}


import { authClient } from "@/lib/auth-client";


export default function DashboardNavbar({
  openSidebar,
}: DashboardNavbarProps){


const {
 data:session,
}=authClient.useSession();


const user=session?.user;



return (

<header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-8">


<button

onClick={openSidebar}

className="rounded-lg p-2 text-slate-700 lg:hidden"

>

<Menu size={24}/>

</button>





<div className="ml-auto flex items-center gap-3">


{
user?.image
?

<img
src={user.image}
alt={user.name ?? "User"}
className="size-9 rounded-full object-cover"
/>

:

<div className="flex size-9 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-700">

{
user?.name
?.charAt(0)
.toUpperCase()
}

</div>

}


<div className="hidden sm:block">

<p className="text-sm font-semibold text-slate-900">

{user?.name}

</p>


<p className="text-xs capitalize text-teal-700">

{user?.role}

</p>

</div>


</div>


</header>

);

}