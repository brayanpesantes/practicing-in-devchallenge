"use client";
import { useRef } from "react";
import Logo from "./Logo";
import QRCode from "qrcode.react";

type Props = {
  text: string;
};

export default function QRCodeView({ text }: Props) {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current.querySelector("canvas");
      if (canvas) {
        const link = document.createElement("a");
        link.download = "qr-code.png";
        canvas.style.borderRadius = "16px";
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    }
  };
  const shareQRCode = () => {
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current.querySelector("canvas");
      if (canvas) {
        const dataUrl = canvas.toDataURL("image/png");
        const blobData = dataUrl.split(",")[1];
        const bytes = window.atob(blobData);
        const arrayOfBytes = new Array(bytes.length);
        for (let i = 0; i < bytes.length; i++) {
          arrayOfBytes[i] = bytes.charCodeAt(i);
        }
        const blob = new Blob([new Uint8Array(arrayOfBytes)], {
          type: "image/png",
        });
        if (navigator.share) {
          navigator.share({
            title: "Código QR",
            text: "Código QR generado",
            url: text,
            files: [new File([blob], "qr-code.png", { type: "image/png" })],
          });
        } else {
          alert(
            "La función de compartir no está disponible en este navegador."
          );
        }
      }
    }
  };
  return (
    <div className="py-10 px-20">
      <div className="pb-24">
        <Logo />
      </div>
      <div className="flex items-center justify-center pb-12">
        <div
          className="size-[307px] bg-[#4e80ee33] rounded-full flex items-center justify-center"
          ref={qrCodeRef}
        >
          <QRCode
            style={{ borderRadius: "16px" }}
            value={text}
            className="w-full h-full block"
            size={240}
            includeMargin={true}
            renderAs="canvas"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-7">
        <button
          className="px-10 py-4 bg-[#3662E3] text-[#F2F5F9] text-base rounded-xl flex items-center gap-2.5"
          onClick={downloadQRCode}
        >
          Download
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="rotate-180 size-6"
          >
            <g fill="none">
              <circle
                cx="6"
                cy="6"
                r="6"
                fill="currentColor"
                fill-opacity=".25"
                transform="matrix(0 -1 -1 0 18 20)"
              />
              <path
                stroke="currentColor"
                stroke-linecap="round"
                d="M9.5 7.5L12 5m0 0l2.5 2.5M12 5v10"
              />
            </g>
          </svg>
        </button>
        <button
          className="px-10 py-4 bg-[#3662E3] text-[#F2F5F9] text-base rounded-xl flex items-center gap-2.5"
          onClick={shareQRCode}
        >
          Share
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
            <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
