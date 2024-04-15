import { kv } from "@vercel/kv";

export const POST = async (req: Request) => {
  try {
    const { code } = await req.json();
    const id = await kv.incr("codeId"); // Genera un ID único
    await kv.set(`code:${id}`, code);
    return new Response(JSON.stringify({ id }), { status: 200 });
  } catch (error) {
    console.error("Error al guardar el código:", error);
    return new Response(
      JSON.stringify({ message: "Error al guardar el código" }),
      { status: 500 }
    );
  }
};
