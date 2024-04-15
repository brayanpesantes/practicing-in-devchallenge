import { createClient } from "@/utils/supebase/client";

export const POST = async (req: Request) => {
  const supebase = createClient()

  try {
    const { code } = await req.json();
    const  {data,error} = await supebase.from('code_share').insert({code}).select().single()
    console.log(error);
    console.log(data);
    
    return Response.json( {
      statusCode: 200,
      body: JSON.stringify(data)
    })
  } catch (error) {
    console.error("Error al guardar el código:", error);
    return new Response(
      JSON.stringify({ message: "Error al guardar el código" }),
      { status: 500 }
    );
  }
};
