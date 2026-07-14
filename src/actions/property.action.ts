export async function getProperties() {

  const res = await fetch(
    "http://localhost:5000/api/properties",
    {
      cache: "no-store",
    }
  );


  if(!res.ok){

    throw new Error(
      "Failed to fetch properties"
    );

  }


  const data =
  await res.json();


  return data.data;

}

export async function getOwnerProperties(
  ownerId:string
){


const res =
await fetch(

`http://localhost:5000/api/properties/owner/${ownerId}`,

{
cache:"no-store",
}

);



if(!res.ok){

throw new Error(
"Failed to fetch owner properties"
);

}



const data =
await res.json();



return data.data;


}