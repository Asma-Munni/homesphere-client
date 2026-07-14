import Image from "next/image";
import Link from "next/link";


interface Property {

  _id:string;

  title:string;

  shortDescription:string;

  price:number | string;

  location:string;

  category:string;

  bedrooms:number | string;

  bathrooms:number | string;

  image:string;

}




export default function PropertyCard({

property

}:{

property:Property

}) {


return (

<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1">


<div className="relative h-60 w-full">


<Image

src={property.image}

alt={property.title}

fill

className="object-cover"

/>


</div>





<div className="space-y-3 p-5">


<div className="flex items-start justify-between gap-3">


<h2 className="text-xl font-bold text-slate-900">

{property.title}

</h2>



<span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">

{property.category}

</span>


</div>





<p className="text-sm text-slate-600">

{property.shortDescription}

</p>





<p className="text-lg font-bold text-teal-700">

৳ {property.price}

</p>





<div className="text-sm text-slate-500">

📍 {property.location}

<br/>

🛏 {property.bedrooms} Bedrooms

&nbsp; | &nbsp;

🚿 {property.bathrooms} Bathrooms

</div>





<Link

href={`/properties/${property._id}`}

className="mt-4 block rounded-xl bg-teal-700 px-4 py-3 text-center font-semibold text-white transition hover:bg-teal-800"

>

View Details

</Link>




</div>


</div>


);


}