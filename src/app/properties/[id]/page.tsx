import Image from "next/image";


async function getProperty(id: string) {


  const res = await fetch(
    `http://localhost:5000/api/properties/${id}`,
    {
      cache: "no-store",
    }
  );


  if (!res.ok) {

    throw new Error(
      "Failed to fetch property"
    );

  }


  const data =
    await res.json();


  return data.data;

}





export default async function PropertyDetailsPage({

  params,

}: {

  params: Promise<{
    id: string;
  }>;

}) {


  const { id } = await params;


  const property =
    await getProperty(id);



  return (

    <div className="mx-auto max-w-6xl px-6 py-10">


      <div className="grid gap-8 lg:grid-cols-2">



        <div className="relative h-[450px] overflow-hidden rounded-3xl">


          <Image

            src={property.image}

            alt={property.title}

            fill

            className="object-cover"

          />


        </div>





        <div className="space-y-5">


          <span className="rounded-full bg-teal-100 px-4 py-2 text-sm text-teal-700">

            {property.category}

          </span>




          <h1 className="text-4xl font-bold text-slate-900">

            {property.title}

          </h1>




          <p className="text-lg text-slate-600">

            {property.description}

          </p>





          <div className="rounded-2xl bg-slate-100 p-5">


            <p className="text-2xl font-bold text-teal-700">

              ৳ {property.price}

            </p>


            <p className="mt-2 text-slate-600">

              📍 {property.location}

            </p>


            <p className="mt-2 text-slate-600">

              🛏 {property.bedrooms} Bedrooms

              &nbsp; | &nbsp;

              🚿 {property.bathrooms} Bathrooms

            </p>


          </div>




          <button

            className="rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800"

          >

            Contact Owner

          </button>



        </div>


      </div>


    </div>

  );

}