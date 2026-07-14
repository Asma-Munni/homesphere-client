"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";


export default function AddPropertyPage() {

  const { data } = useSession();


const userId =
data?.session?.userId;


console.log(
  "USER ID:",
  userId
);


  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    price: "",
    location: "",
    category: "",
    bedrooms: "",
    bathrooms: "",
  });



  const [imageFile, setImageFile] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);




  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };





  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {


    const file =
      e.target.files?.[0];


    if(file){

      setImageFile(file);


      setPreview(
        URL.createObjectURL(file)
      );

    }


  };






 const uploadImage = async()=>{


  if(!imageFile){
    return "";
  }


  const formData = new FormData();


  formData.append(
    "image",
    imageFile
  );


  const res =
  await fetch(
    "http://localhost:5000/api/upload",
    {
      method:"POST",
      body:formData,
    }
  );


  const data =
  await res.json();


  return data.url;

};



const handleSubmit = async (
  e: React.FormEvent
) => {

  e.preventDefault();


  if(!userId){

    toast.error(
      "Please login first"
    );

    return;

  }


  try{


    setLoading(true);



    const imageUrl =
      await uploadImage();



    const propertyData = {

      ...formData,

      image:imageUrl,

      ownerId:userId,

    };



    console.log(
      "FINAL PROPERTY DATA:",
      propertyData
    );




    const res =
      await fetch(
        "http://localhost:5000/api/properties",
        {

          method:"POST",

          headers:{

            "Content-Type":
            "application/json",

          },


          body:
          JSON.stringify(propertyData),

        }
      );




    const data =
      await res.json();




    if(data.success){


      toast.success(
        "Property added successfully!"
      );



      setFormData({

        title:"",
        shortDescription:"",
        description:"",
        price:"",
        location:"",
        category:"",
        bedrooms:"",
        bathrooms:"",

      });



      setImageFile(null);

      setPreview("");

    }

    else{

      toast.error(
        "Failed to add property"
      );

    }



  }

  catch(error){


    console.log(
      "ADD PROPERTY ERROR:",
      error
    );


    toast.error(
      "Something went wrong"
    );


  }

  finally{

    setLoading(false);

  }


};


return (

<div className="mx-auto max-w-4xl space-y-6">


<div>

<h1 className="text-3xl font-bold text-slate-900">
Add New Property
</h1>


<p className="mt-2 text-slate-600">
Add your property details and upload property image.
</p>


</div>





<form

onSubmit={handleSubmit}

className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"

>




<div className="grid gap-5 md:grid-cols-2">





<div>

<label className="mb-2 block text-sm font-medium text-slate-700">
Property Title
</label>


<input

name="title"

value={formData.title}

onChange={handleChange}

placeholder="Modern Apartment"

className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-700"

/>


</div>





<div>

<label className="mb-2 block text-sm font-medium text-slate-700">
Category
</label>


<select

name="category"

value={formData.category}

onChange={handleChange}

className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-700"

>


<option value="">
Select category
</option>


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


</div>





<div>

<label className="mb-2 block text-sm font-medium text-slate-700">
Price
</label>


<input

type="number"

name="price"

value={formData.price}

onChange={handleChange}

placeholder="25000"

className="w-full rounded-xl border border-slate-300 px-4 py-3"

/>


</div>





<div>

<label className="mb-2 block text-sm font-medium text-slate-700">
Location
</label>


<input

name="location"

value={formData.location}

onChange={handleChange}

placeholder="Dhaka"

className="w-full rounded-xl border border-slate-300 px-4 py-3"

/>


</div>





<div>

<label className="mb-2 block text-sm font-medium text-slate-700">
Bedrooms
</label>


<input

type="number"

name="bedrooms"

value={formData.bedrooms}

onChange={handleChange}

placeholder="3"

className="w-full rounded-xl border border-slate-300 px-4 py-3"

/>


</div>





<div>

<label className="mb-2 block text-sm font-medium text-slate-700">
Bathrooms
</label>


<input

type="number"

name="bathrooms"

value={formData.bathrooms}

onChange={handleChange}

placeholder="2"

className="w-full rounded-xl border border-slate-300 px-4 py-3"

/>


</div>




</div>






<div>

<label className="mb-2 block text-sm font-medium text-slate-700">
Short Description
</label>


<input

name="shortDescription"

value={formData.shortDescription}

onChange={handleChange}

placeholder="Beautiful family apartment"

className="w-full rounded-xl border border-slate-300 px-4 py-3"

/>


</div>






<div>

<label className="mb-2 block text-sm font-medium text-slate-700">
Full Description
</label>


<textarea

rows={5}

name="description"

value={formData.description}

onChange={handleChange}

placeholder="Write detailed property description..."

className="w-full rounded-xl border border-slate-300 px-4 py-3"

/>


</div>







<div>

<label className="mb-2 block text-sm font-medium text-slate-700">
Property Image
</label>


<input

type="file"

accept="image/*"

onChange={handleImageChange}

className="w-full rounded-xl border border-slate-300 px-4 py-3"

/>




{
preview && (

<img

src={preview}

alt="Preview"

className="mt-4 h-48 w-full rounded-xl object-cover"

/>

)

}



</div>







<button

disabled={loading}

type="submit"

className="rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800 disabled:opacity-50"

>


{
loading
?
"Adding Property..."
:
"Add Property"
}


</button>




</form>


</div>

);

}