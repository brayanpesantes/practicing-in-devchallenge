"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  "company-email": string;
  "company-size": string;
  subject: string;
  message: string;
};

const companySizeOptions = [
  { label: "50-100 empleados", value: "50-100" },
  { label: "101-150 empleados", value: "101-150" },
  { label: "151-200 empleados", value: "151-200" },
];

const subjectOptions = [
  {
    label: "Desarrollo de Landing Pages",
    value: "Building Landing pages",
  },
  { label: "Desarrollo de E-commerce", value: "Building E-commerce" },
  { label: "Desarrollo de Dashboards", value: "Building Dashboard" },
];

export const CardForm = () => {
  const { control, handleSubmit, register } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => alert(JSON.stringify(data));

  return (
    <div className="w-full xl:w-[810px] xl:mx-auto pt-10">
      <form
        className="p-4 md:p-8 mx-6 lg:mx-8 xl:mx-auto flex flex-col gap-6 bg-[#CDD5E0]/20 rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col lg:flex-row gap-[18px] w-full ">
          <div className="w-full">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              placeholder="Tu Nombre"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="company-email">Email de la empresa</Label>
            <Input
              id="company-email"
              type="email"
              placeholder="tu@empresa.com"
              name="company-email"
              control={control}
              rules={{
                required: "El correo electrónico es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Correo electrónico inválido",
                },
              }}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-[18px] w-full">
          <div className="w-full">
            <Label htmlFor="company-size">Tamaño de la empresa</Label>
            <Select
              id="company-size"
              name="company-size"
              control={control}
              rules={{ required: "debe de seleccionar una opción" }}
              options={companySizeOptions}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="subject">Asunto</Label>
            <Select
              id="subject"
              name="subject"
              control={control}
              rules={{ required: "debe de seleccionar una opción" }}
              options={subjectOptions}
            />
          </div>
        </div>
        <div className="w-full">
          <Label>Mensaje</Label>
          <textarea
            id="message"
            {...register("message")}
            className="mt-1 w-full ps-3 resize-none rounded-xl h-52 placeholder:text-[#111729]"
            placeholder="Escribe tu mensaje aquí..."
          ></textarea>
        </div>
        <Button type="submit">Contactar con ventas</Button>
      </form>
    </div>
  );
};
