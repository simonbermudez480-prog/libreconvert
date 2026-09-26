"use client";

import React, { useState, useEffect } from "react";
import { convertDocument, mergePdfs, splitPdf, compressPdf } from "@/lib/converters";
import * as XLSX from "xlsx";
import { Document, Paragraph, TextRun, Packer } from "docx";
import { jsPDF } from "jspdf";
import { PDFDocument } from "pdf-lib";

interface TestResult {
  id: string;
  name: string;
  category: string;
  inputName: string;
  outputName?: string;
  outputSize?: number;
  mimeType?: string;
  status: "pending" | "running" | "pass" | "fail";
  durationMs?: number;
  error?: string;
}

export default function TestSuitePage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [summary, setSummary] = useState({ total: 0, passed: 0, failed: 0 });

  useEffect(() => {
    runAllTests();
  }, []);

  const runAllTests = async () => {
    setIsRunning(true);
    const testList: TestResult[] = [
      { id: "1", name: "DOCX a PDF", category: "Documentos", inputName: "test.docx", status: "pending" },
      { id: "2", name: "PDF a DOCX (Word editable)", category: "Documentos", inputName: "test.pdf", status: "pending" },
      { id: "3", name: "PDF a JPG (1 página -> imagen)", category: "Imágenes", inputName: "single.pdf", status: "pending" },
      { id: "4", name: "PDF a JPG (Multi-página -> ZIP)", category: "Imágenes", inputName: "multi.pdf", status: "pending" },
      { id: "5", name: "PDF a PNG (Multi-página -> ZIP)", category: "Imágenes", inputName: "multi.pdf", status: "pending" },
      { id: "6", name: "JPG a PDF", category: "Imágenes a PDF", inputName: "foto.jpg", status: "pending" },
      { id: "7", name: "PNG a PDF", category: "Imágenes a PDF", inputName: "grafico.png", status: "pending" },
      { id: "8", name: "JPG a PNG", category: "Transcodificación", inputName: "foto.jpg", status: "pending" },
      { id: "9", name: "PNG a JPG", category: "Transcodificación", inputName: "grafico.png", status: "pending" },
      { id: "10", name: "PDF a Excel (.xlsx)", category: "Hojas de cálculo", inputName: "tablas.pdf", status: "pending" },
      { id: "11", name: "PDF a CSV (.csv)", category: "Hojas de cálculo", inputName: "tablas.pdf", status: "pending" },
      { id: "12", name: "Excel (.xlsx) a CSV", category: "Hojas de cálculo", inputName: "datos.xlsx", status: "pending" },
      { id: "13", name: "Excel (.xlsx) a PDF", category: "Hojas de cálculo", inputName: "datos.xlsx", status: "pending" },
      { id: "14", name: "DOCX a Texto (.txt)", category: "Texto plano", inputName: "test.docx", status: "pending" },
      { id: "15", name: "DOCX a HTML (.html)", category: "Marcado web", inputName: "test.docx", status: "pending" },
      { id: "16", name: "PDF a Texto (.txt)", category: "Texto plano", inputName: "test.pdf", status: "pending" },
      { id: "17", name: "TXT a PDF", category: "Texto a Docs", inputName: "notas.txt", status: "pending" },
      { id: "18", name: "TXT a Word (.docx)", category: "Texto a Docs", inputName: "notas.txt", status: "pending" },
      { id: "19", name: "Unir varios PDF (Merge)", category: "Utilidades PDF", inputName: "doc1.pdf + doc2.pdf", status: "pending" },
      { id: "20", name: "Dividir páginas PDF (Split)", category: "Utilidades PDF", inputName: "multi.pdf (pág 1)", status: "pending" },
      { id: "21", name: "Comprimir PDF", category: "Utilidades PDF", inputName: "test.pdf", status: "pending" },
    ];

    setResults(testList);

    // Generar artefactos de prueba sintéticos
    // A. DOCX
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun({ text: "LibreConvert Documento de Prueba", bold: true, size: 32 })],
            }),
            new Paragraph({
              children: [new TextRun({ text: "Este es un párrafo de texto para validar conversión." })],
            }),
          ],
        },
      ],
    });
    const docxBlob = await Packer.toBlob(doc);
    const docxFile = new File([docxBlob], "test.docx", {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // B. PDF 1 página
    const pdf1 = new jsPDF();
    pdf1.text("Página única de prueba LibreConvert", 20, 20);
    const pdf1Blob = pdf1.output("blob");
    const singlePdfFile = new File([pdf1Blob], "single.pdf", { type: "application/pdf" });

    // C. PDF 2 páginas
    const pdf2 = new jsPDF();
    pdf2.text("Página 1: Introducción a la auditoría", 20, 20);
    pdf2.addPage();
    pdf2.text("Página 2: Conclusiones y validación", 20, 20);
    const pdf2Blob = pdf2.output("blob");
    const multiPdfFile = new File([pdf2Blob], "multi.pdf", { type: "application/pdf" });

    // D. Imágenes
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 150;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#f97316";
    ctx.fillRect(0, 0, 200, 150);
    ctx.fillStyle = "#ffffff";
    ctx.font = "16px sans-serif";
    ctx.fillText("LibreConvert", 20, 80);

    const jpgBlob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), "image/jpeg", 0.9));
    const jpgFile = new File([jpgBlob], "foto.jpg", { type: "image/jpeg" });

    const pngBlob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), "image/png"));
    const pngFile = new File([pngBlob], "grafico.png", { type: "image/png" });

    // E. Excel
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      ["ID", "Nombre", "Rol", "Estado"],
      [1, "Simón", "Admin", "Activo"],
      [2, "Ana", "Editor", "Activo"],
      [3, "Carlos", "Viewer", "Inactivo"],
    ]);
    XLSX.utils.book_append_sheet(wb, ws, "Usuarios");
    const xlsxArray = XLSX.write(wb, { type: "array", bookType: "xlsx" });
    const xlsxFile = new File([xlsxArray], "datos.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // F. TXT
    const txtFile = new File(
      ["# LibreConvert\nPrimer renglón de notas.\nSegundo renglón con datos."],
      "notas.txt",
      { type: "text/plain" }
    );

    let passCount = 0;
    let failCount = 0;

    for (let i = 0; i < testList.length; i++) {
      const t = testList[i];
      setResults((prev) =>
        prev.map((item) => (item.id === t.id ? { ...item, status: "running" } : item))
      );

      const startTime = performance.now();
      try {
        let outName = "";
        let outSize = 0;
        let outMime = "";

        if (t.id === "1") {
          const res = await convertDocument(docxFile, "pdf");
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
        } else if (t.id === "2") {
          const res = await convertDocument(singlePdfFile, "docx");
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
        } else if (t.id === "3") {
          const res = await convertDocument(singlePdfFile, "jpg");
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
          if (!outName.endsWith(".jpg")) throw new Error(`Esperado .jpg pero se obtuvo ${outName}`);
        } else if (t.id === "4") {
          const res = await convertDocument(multiPdfFile, "jpg");
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
          if (!outName.endsWith(".zip")) throw new Error(`Esperado .zip para multi-página pero se obtuvo ${outName}`);
        } else if (t.id === "5") {
          const res = await convertDocument(multiPdfFile, "png");
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
          if (!outName.endsWith(".zip")) throw new Error(`Esperado .zip para multi-página pero se obtuvo ${outName}`);
        } else if (t.id === "6") {
          const res = await convertDocument(jpgFile, "pdf");
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
        } else if (t.id === "7") {
          const res = await convertDocument(pngFile, "pdf");
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
        } else if (t.id === "8") {
          const res = await convertDocument(jpgFile, "png");
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
        } else if (t.id === "9") {
          const res = await convertDocument(pngFile, "jpg");
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
        } else if (t.id === "10") {
          const res = await convertDocument(singlePdfFile, "xlsx");
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
        } else if (t.id === "11") {
          const res = await convertDocument(singlePdfFile, "csv");
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
        } else if (t.id === "12") {
          const res = await convertDocument(xlsxFile, "csv");
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
        } else if (t.id === "13") {
          const res = await convertDocument(xlsxFile, "pdf");
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
        } else if (t.id === "14") {
          const res = await convertDocument(docxFile, "txt");
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
        } else if (t.id === "15") {
          const res = await convertDocument(docxFile, "html");
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
        } else if (t.id === "16") {
          const res = await convertDocument(singlePdfFile, "txt");
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
        } else if (t.id === "17") {
          const res = await convertDocument(txtFile, "pdf");
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
        } else if (t.id === "18") {
          const res = await convertDocument(txtFile, "docx");
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
        } else if (t.id === "19") {
          const res = await mergePdfs([singlePdfFile, multiPdfFile]);
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
        } else if (t.id === "20") {
          const res = await splitPdf(multiPdfFile, "1");
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
        } else if (t.id === "21") {
          const res = await compressPdf(multiPdfFile);
          outName = res.fileName;
          outSize = res.blob.size;
          outMime = res.mimeType;
        }

        const duration = Math.round(performance.now() - startTime);
        if (outSize <= 0) throw new Error("El archivo generado está vacío (0 bytes).");

        passCount++;
        setResults((prev) =>
          prev.map((item) =>
            item.id === t.id
              ? {
                  ...item,
                  status: "pass",
                  outputName: outName,
                  outputSize: outSize,
                  mimeType: outMime,
                  durationMs: duration,
                }
              : item
          )
        );
      } catch (err: any) {
        failCount++;
        const duration = Math.round(performance.now() - startTime);
        setResults((prev) =>
          prev.map((item) =>
            item.id === t.id
              ? {
                  ...item,
                  status: "fail",
                  error: err?.message || String(err),
                  durationMs: duration,
                }
              : item
          )
        );
      }
    }

    setSummary({ total: testList.length, passed: passCount, failed: failCount });
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-[#181512] text-[#FAF8F5] p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#302822]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-bold mb-2">
              <span>● AUDITORÍA AUTOMATIZADA DE PROCESOS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              LibreConvert Engine QA Suite
            </h1>
            <p className="text-sm text-[#A89A8D] mt-1">
              Verificación exhaustiva de los 21 procesos de conversión y utilidades client-side.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-[#241E1A] border border-[#3A302A] rounded-2xl px-5 py-3 text-center">
              <span className="text-xs uppercase text-[#A89A8D] font-semibold block">Total Tests</span>
              <span className="text-2xl font-black text-white">{results.length}</span>
            </div>
            <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-2xl px-5 py-3 text-center">
              <span className="text-xs uppercase text-emerald-400 font-semibold block">Aprobados</span>
              <span id="passed-count" className="text-2xl font-black text-emerald-400">{summary.passed}</span>
            </div>
            <div className="bg-rose-950/40 border border-rose-800/60 rounded-2xl px-5 py-3 text-center">
              <span className="text-xs uppercase text-rose-400 font-semibold block">Fallidos</span>
              <span id="failed-count" className="text-2xl font-black text-rose-400">{summary.failed}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-[#302822] bg-[#201A16]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1C1713] text-[#A89A8D] uppercase text-[11px] font-bold tracking-wider border-b border-[#302822]">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Conversión</th>
                <th className="py-3 px-4">Categoría</th>
                <th className="py-3 px-4">Entrada</th>
                <th className="py-3 px-4">Resultado Generado</th>
                <th className="py-3 px-4">Tiempo</th>
                <th className="py-3 px-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2B231D]">
              {results.map((r, idx) => (
                <tr key={r.id} className="hover:bg-[#27201B] transition-colors">
                  <td className="py-3 px-4 text-[#A89A8D] font-mono text-xs">{idx + 1}</td>
                  <td className="py-3 px-4 font-bold text-white">{r.name}</td>
                  <td className="py-3 px-4 text-xs text-[#C5B8AC]">{r.category}</td>
                  <td className="py-3 px-4 font-mono text-xs text-[#E8DCCF]">{r.inputName}</td>
                  <td className="py-3 px-4 font-mono text-xs">
                    {r.outputName ? (
                      <div>
                        <span className="text-emerald-400 font-bold">{r.outputName}</span>
                        <span className="text-[#8E8074] ml-2">({(r.outputSize! / 1024).toFixed(1)} KB)</span>
                      </div>
                    ) : r.error ? (
                      <span className="text-rose-400 font-sans">{r.error}</span>
                    ) : (
                      <span className="text-[#8E8074]">...</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-xs font-mono text-[#A89A8D]">
                    {r.durationMs !== undefined ? `${r.durationMs}ms` : "-"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {r.status === "pass" && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        PASS
                      </span>
                    )}
                    {r.status === "fail" && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        FAIL
                      </span>
                    )}
                    {r.status === "running" && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
                        RUNNING
                      </span>
                    )}
                    {r.status === "pending" && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#3A302A] text-[#8E8074]">
                        WAIT
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex items-center justify-between text-xs text-[#8E8074]">
          <span>LibreConvert Automated Compliance Verification</span>
          <span>Arquitectura 100% Client-Side Wasm / Canvas / Web Workers</span>
        </div>
      </div>
    </div>
  );
}
