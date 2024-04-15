import { kv } from "@vercel/kv";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const code = await kv.get(`code:${id}`);
    return new Response(JSON.stringify({ code }), { status: 200 });
  } catch (error) {
    console.error("Error al obtener el código:", error);
    return new Response(
      JSON.stringify({ message: "Error al obtener el código" }),
      { status: 500 }
    );
  }
};
