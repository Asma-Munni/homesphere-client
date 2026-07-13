import { getProperties } from "@/actions/property.action";

import PropertyCard from "@/components/properties/PropertyCard";



export default async function PropertiesPage(){


const properties =
await getProperties();



return (

<div className="mx-auto max-w-7xl px-6 py-10">


<div className="mb-10">


<h1 className="text-4xl font-bold text-slate-900">

Explore Properties

</h1>


<p className="mt-3 text-slate-600">

Find your perfect home from our available properties.

</p>


</div>






<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">


{

properties.map((property:any)=>(

<PropertyCard

key={property._id}

property={property}

/>


))

}


</div>




</div>

);

}