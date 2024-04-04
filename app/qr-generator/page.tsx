"use client";
import { useState } from "react";
import Input from "./_components/Input";
import QRCodeView from "./_components/QRCodeView";

export default function QrGeneratorPage() {
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const showGeneratorCode = () => {
    setShowQRCode(true);
  };
  const hideGeneratorCode = () => {
    setShowQRCode(false);
  };
  const handleInputChange = (url: string) => {
    setUrl(url);
  };
  return (
    <div className="max-w-screen-xl min-h-screen bg-[#111729] bg-qr bg-no-repeat bg-right font-outfit">
      {showQRCode ? (
        <QRCodeView text={url} />
      ) : (
        <Input
          generator={showGeneratorCode}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
}
