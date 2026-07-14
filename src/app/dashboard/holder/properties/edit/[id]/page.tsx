"use client";


import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function EditPropertyPage(){


const params = useParams();

const router = useRouter();


const id =
params.id as string;



const [formData,setFormData] =
useState({

title:"",
shortDescription:"",
description:"",
price:"",
location:"",
category:"",
bedrooms:"",
bathrooms:"",
image:""

});



const [loading,setLoading] =
useState(true);



const [updating,setUpdating] =
useState(false);





// Load existing property

useEffect(()=>{


const fetchProperty = async()=>{


try{


const res =
await fetch(

`http://localhost:5000/api/properties/${id}`,

{
cache:"no-store"
}

);



const data =
await res.json();



if(data.success){

setFormData(
data.data
);

}



}

catch(error){

console.log(error);

toast.error(
"Failed to load property"
);

}

finally{

setLoading(false);

}


};



fetchProperty();



},[id]);







const handleChange = (

e:
React.ChangeEvent<
HTMLInputElement |
HTMLTextAreaElement |
HTMLSelectElement
>

)=>{


setFormData({

...formData,

[e.target.name]:
e.target.value

});


};







const handleSubmit = async(

e:React.FormEvent

)=>{


e.preventDefault();



try{


setUpdating(true);



const token =
localStorage.getItem(
"token"
);



if(!token){

toast.error(
"Please login first"
);

return;

}




const res =
await fetch(

`http://localhost:5000/api/properties/${id}`,

{


method:"PATCH",


headers:{


"Content-Type":
"application/json",


"Authorization":
`Bearer ${token}`


},



body:
JSON.stringify(formData)


}

);



const data =
await res.json();




if(data.success){


toast.success(
"Property updated successfully!"
);



router.push(
"/dashboard/holder/properties"
);


}

else{


toast.error(
data.message ||
"Update failed"
);


}



}

catch(error){


console.log(error);


toast.error(
"Something went wrong"
);


}

finally{


setUpdating(false);


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

<div className="mx-auto max-w-3xl space-y-6">



<div>

<h1 className="text-3xl font-bold text-slate-900">

Edit Property

</h1>


<p className="mt-2 text-slate-600">

Update your property information

</p>


</div>







<form

onSubmit={handleSubmit}

className="space-y-5 rounded-2xl border bg-white p-6 shadow-sm"

>



<input

name="title"

value={formData.title}

onChange={handleChange}

placeholder="Property title"

className="w-full rounded-xl border p-3"

/>





<input

name="shortDescription"

value={formData.shortDescription}

onChange={handleChange}

placeholder="Short description"

className="w-full rounded-xl border p-3"

/>







<textarea

name="description"

value={formData.description}

onChange={handleChange}

rows={5}

placeholder="Description"

className="w-full rounded-xl border p-3"

/>







<input

type="number"

name="price"

value={formData.price}

onChange={handleChange}

placeholder="Price"

className="w-full rounded-xl border p-3"

/>







<input

name="location"

value={formData.location}

onChange={handleChange}

placeholder="Location"

className="w-full rounded-xl border p-3"

/>







<select

name="category"

value={formData.category}

onChange={handleChange}

className="w-full rounded-xl border p-3"

>


<option value="Apartment">

Apartment

</option>


<option value="House">

House

</option>


<option value="Villa">

Villa

</option>


</select>







<div className="grid gap-4 md:grid-cols-2">


<input

type="number"

name="bedrooms"

value={formData.bedrooms}

onChange={handleChange}

placeholder="Bedrooms"

className="rounded-xl border p-3"

/>





<input

type="number"

name="bathrooms"

value={formData.bathrooms}

onChange={handleChange}

placeholder="Bathrooms"

className="rounded-xl border p-3"

/>



</div>







<button

disabled={updating}

className="rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white disabled:opacity-50"

>


{
updating
?
"Updating..."
:
"Update Property"
}


</button>





</form>




</div>


);


}