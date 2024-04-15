"use client";
import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import { useParams } from "next/navigation";

export default function ViewCodePage() {
  const [code, setCode] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await fetch(`/api/getCode/${id}`);
        const { code } = await response.json();
        setCode(code || "");
      } catch (error) {
        console.error("Error al obtener el código:", error);
      }
    };

    if (id) {
      fetchCode();
    }
  }, [id]);

  return (
    <div>
      <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={{ readOnly: true }}
      />
    </div>
  );
}
