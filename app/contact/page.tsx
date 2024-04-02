import { CardForm } from "./_components/CardForm";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
export default function ContactPage() {
  return (
    <div className="max-w-screen-xl  min-h-screen bg-contact font-beVietnamPro bg-cover bg-no-repeat">
      <Header />
      <Hero />
      <CardForm />
      <div className="w-full h-20"></div>
    </div>
  );
}
