"use client";

import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";



export default function HolderPropertiesPage(){
const router = useRouter();

const { data: session } =
useSession();



const [properties,setProperties] =
useState<any[]>([]);



const [loading,setLoading] =
useState(true);




const userId =
  session?.session?.userId;

useEffect(() => {
  const fetchProperties =
    async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {
        setLoading(false);
        router.replace("/login");
        return;
      }

      try {
        setLoading(true);

        const response =
          await fetch(
            `${API_URL}/properties/my-properties`,
            {
              method: "GET",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },

              cache: "no-store",
            }
          );

        const result =
          await response.json();

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ??
              "Failed to load properties"
          );
        }

        setProperties(
          Array.isArray(
            result.data
          )
            ? result.data
            : []
        );
      } catch (error) {
        console.error(
          "FETCH PROPERTIES ERROR:",
          error
        );

        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

  void fetchProperties();
}, [userId, router]);

const handleDelete = async(
id:string
)=>{


const confirmDelete =
confirm(
"Are you sure you want to delete this property?"
);



if(!confirmDelete){

return;

}




const token =
localStorage.getItem(
"token"
);



if(!token){

alert(
"Please login first"
);

return;

}





const res =
await fetch(

`${API_URL}/properties/${id}`,

{

method:"DELETE",


headers:{


"Authorization":
`Bearer ${token}`


}


}

);




const data =
await res.json();



if(data.success){


setProperties(

prev =>
prev.filter(
(property)=>
property._id !== id
)

);


alert(
"Property deleted successfully"
);


}

else{


alert(
data.message ||
"Delete failed"
);


}



};





if(loading){

return (

<div className="p-10">

Loading...

</div>

);

}







return (

<div className="space-y-8">


<div>

<h1 className="text-3xl font-bold">

My Properties

</h1>


<p className="text-slate-600 mt-2">

Manage your properties

</p>


</div>







{
properties.length===0 ?


<div className="rounded-xl border p-10 text-center">

No property found

</div>


:


<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">


{

properties.map((property)=>(


<div

key={property._id}

className="overflow-hidden rounded-2xl border bg-white shadow"

>



<div className="relative h-52">


<Image

src={property.image}

alt={property.title}

fill

className="object-cover"

/>


</div>





<div className="p-5 space-y-3">


<h2 className="text-xl font-bold">

{property.title}

</h2>



<p className="font-semibold text-teal-700">

৳ {property.price}

</p>



<p>

📍 {property.location}

</p>



<div className="flex gap-3">


<button

onClick={()=>{

router.push(
`/dashboard/holder/properties/edit/${property._id}`
)

}}

className="rounded-lg bg-blue-600 px-4 py-2 text-white"

>

Edit

</button>



<button

onClick={()=>
handleDelete(property._id)
}

className="rounded-lg bg-red-600 px-4 py-2 text-white"

>

Delete

</button>


</div>



</div>


</div>


))


}


</div>


}




</div>


);


}