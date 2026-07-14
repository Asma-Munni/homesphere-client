"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  Building2,
  Heart,
  FileText,
  PlusCircle,
  Settings,
  LogOut,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";


const menuItems = {
  admin: [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Manage Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      title: "Manage Properties",
      href: "/dashboard/admin/properties",
      icon: Building2,
    },
  ],


  tenant: [
    {
      title: "Dashboard",
      href: "/dashboard/tenant",
      icon: LayoutDashboard,
    },
    {
      title: "Favorites",
      href: "/dashboard/tenant/favorites",
      icon: Heart,
    },
    {
      title: "Requests",
      href: "/dashboard/tenant/requests",
      icon: FileText,
    },
  ],


  "property-holder": [
    {
      title: "Dashboard",
      href: "/dashboard/holder",
      icon: LayoutDashboard,
    },
    {
      title: "Add Property",
      href: "/properties/add",
      icon: PlusCircle,
    },
    {
  title:"My Properties",
  href:"/dashboard/holder/properties",
  icon: Building2,
    
},
    
  ],
};


export default function DashboardSidebar() {

  const pathname = usePathname();

  const router = useRouter();


  const {
    data: session,
  } = authClient.useSession();


  const user = session?.user;


  const role =
    user?.role ?? "tenant";


  const menus =
    menuItems[
      role as keyof typeof menuItems
    ];



  const handleLogout = async () => {

    await authClient.signOut();

    router.push("/login");

    router.refresh();

  };



  return (

    <aside className="hidden min-h-screen w-72 border-r border-slate-200 bg-white lg:flex lg:flex-col">


      {/* Brand */}

      <div className="flex h-20 items-center border-b border-slate-200 px-6">

        <Link
          href="/"
          className="flex items-center gap-3"
        >

          <div className="relative size-11 overflow-hidden rounded-xl">

            <Image
              src="/Images/logo-homesphere.png"
              alt="HomeSphere"
              fill
              className="object-contain"
            />

          </div>


          <div>

            <p className="text-xl font-bold text-slate-900">
              Home
              <span className="text-teal-700">
                Sphere
              </span>
            </p>

            <p className="text-xs text-slate-500">
              Dashboard
            </p>

          </div>

        </Link>

      </div>




      {/* User */}

      <div className="border-b border-slate-200 p-6">

        <div className="flex items-center gap-3">


          {
            user?.image
            ?

            <img
              src={user.image}
              alt={user.name ?? "User"}
              className="size-12 rounded-full object-cover"
            />

            :

            <div className="flex size-12 items-center justify-center rounded-full bg-teal-100 text-lg font-bold text-teal-700">

              {
                user?.name
                ?.charAt(0)
                .toUpperCase()
              }

            </div>

          }



          <div className="min-w-0">

            <p className="truncate font-semibold text-slate-900">

              {user?.name}

            </p>


            <p className="text-sm capitalize text-teal-700">

              {role}

            </p>

          </div>


        </div>

      </div>





      {/* Menu */}

      <nav className="flex-1 space-y-2 p-5">

        {
          menus?.map((item)=>{

            const Icon = item.icon;


            const active =
              pathname === item.href;


            return (

              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active
                  ? "bg-teal-700 text-white"
                  : "text-slate-600 hover:bg-teal-50 hover:text-teal-700"
                }`}
              >

                <Icon size={19}/>

                {item.title}


              </Link>

            );

          })
        }


      </nav>





      {/* Bottom */}

      <div className="border-t border-slate-200 p-5">


        <Link
          href="/profile"
          className="mb-3 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >

          <Settings size={19}/>

          Profile

        </Link>



        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >

          <LogOut size={19}/>

          Logout

        </button>


      </div>


    </aside>

  );
}