"use client";

import { useState } from "react";

import DashboardSidebar from "@/app/dashboard/DashboardSidebar";
import DashboardNavbar from "@/app/dashboard/DashboardNavbar";
import MobileSidebar from "@/app/dashboard/MobileSidebar";


export default function DashboardLayout({
children,
}:{
children:React.ReactNode;
}){


const [open,setOpen]=useState(false);



return (

<div className="flex min-h-screen bg-slate-50">


<DashboardSidebar/>


<MobileSidebar
open={open}
close={()=>setOpen(false)}
/>


<div className="flex-1">


<DashboardNavbar
openSidebar={()=>setOpen(true)}
/>



<main className="p-5 lg:p-8">

{children}

</main>


</div>


</div>

);

}