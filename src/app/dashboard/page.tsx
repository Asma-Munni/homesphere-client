"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";


export default function DashboardPage() {

  const router = useRouter();


  const {
    data: session,
    isPending,
  } = authClient.useSession();



  useEffect(()=>{

    if(!isPending && session?.user){

      const role = session.user?.role;


      if(role==="admin"){
        router.push("/dashboard/admin");
      }


      else if(role==="property-holder"){
        router.push("/dashboard/holder");
      }


      else{
        router.push("/dashboard/tenant");
      }

    }


  },[
    session,
    isPending,
    router
  ]);



  return (

    <div className="flex min-h-[50vh] items-center justify-center">

      <p className="text-slate-600">
        Loading dashboard...
      </p>

    </div>

  );

}