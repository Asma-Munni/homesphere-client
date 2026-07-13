"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, LogOut } from "lucide-react";

import { authClient } from "@/lib/auth-client";

import {
  dashboardMenu,
} from "./dashboard-menu";


interface MobileSidebarProps {
  open: boolean;
  close: () => void;
}


export default function MobileSidebar({
  open,
  close,
}: MobileSidebarProps) {


  const pathname = usePathname();

  const router = useRouter();


  const {
    data: session,
  } = authClient.useSession();


  const user = session?.user;


  const role =
    user?.role ?? "tenant";


  const menus =
    dashboardMenu[
      role as keyof typeof dashboardMenu
    ];



  const handleLogout = async()=>{

    await authClient.signOut();

    router.push("/login");

    router.refresh();

  };



  if(!open) return null;



  return (

    <>

      {/* Overlay */}

      <div
        onClick={close}
        className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
      />



      {/* Sidebar */}

      <aside className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-white shadow-xl lg:hidden">


        <div className="flex items-center justify-between border-b border-slate-200 p-5">

          <h2 className="text-xl font-bold text-slate-900">
            Home
            <span className="text-teal-700">
              Sphere
            </span>
          </h2>


          <button
            onClick={close}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          >

            <X size={22}/>

          </button>


        </div>




        <div className="border-b border-slate-200 p-5">

          <p className="font-semibold text-slate-900">
            {user?.name}
          </p>


          <p className="text-sm capitalize text-teal-700">
            {role}
          </p>


        </div>





        <nav className="flex-1 space-y-2 p-5">


          {
            menus?.map((item)=>{

              const active =
              pathname === item.href;


              return (

                <Link

                  key={item.href}

                  href={item.href}

                  onClick={close}

                  className={`block rounded-xl px-4 py-3 text-sm font-medium ${
                    active
                    ?
                    "bg-teal-700 text-white"
                    :
                    "text-slate-600 hover:bg-teal-50 hover:text-teal-700"
                  }`}
                >

                  {item.title}

                </Link>

              );

            })
          }


        </nav>





        <button
          onClick={handleLogout}
          className="m-5 flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
        >

          <LogOut size={18}/>

          Logout

        </button>


      </aside>


    </>

  );
}