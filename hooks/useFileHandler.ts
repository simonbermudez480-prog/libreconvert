"use client";

import { useState, useEffect, useCallback } from "react";

export interface ManagedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  ext: string;
  targetFormat: string;
  status: "idle" | "converting" | "completed" | "error";
  progress: number;
  resultBlob?: Blob;
  resultUrl?: string;
  resultFileName?: string;
  resultMimeType?: string;
  pagesCount?: number;
  error?: string;
}

export const SUPPORTED_EXTENSIONS = [
  "pdf",
  "docx",
  "doc",
  "jpg",
  "jpeg",
  "png",
  "webp",
  "xlsx",
  "txt",
  "html",
];

export function getDefaultTargetFormat(ext: string): string {
  const cleanExt = ext.toLowerCase();
  switch (cleanExt) {
    case "docx":
    case "doc":
      return "pdf";
    case "pdf":
      return "docx";
    case "jpg":
    case "jpeg":
    case "png":
    case "webp":
      return "pdf";
    case "xlsx":
      return "pdf";
    case "txt":
      return "pdf";
    case "html":
      return "pdf";
    default:
      return "pdf";
  }
}

export function getAvailableTargetFormats(ext: string): { value: string; label: string }[] {
  const cleanExt = ext.toLowerCase();
  switch (cleanExt) {
    case "docx":
    case "doc":
      return [
        { value: "pdf", label: "PDF (.pdf)" },
        { value: "txt", label: "Texto Plano (.txt)" },
        { value: "html", label: "Página Web (.html)" },
      ];
    case "pdf":
      return [
        { value: "docx", label: "Word (.docx)" },
        { value: "jpg", label: "Imágenes (.jpg)" },
        { value: "png", label: "Imágenes (.png)" },
        { value: "xlsx", label: "Excel (.xlsx)" },
        { value: "txt", label: "Texto Plano (.txt)" },
      ];
    case "jpg":
    case "jpeg":
    case "png":
    case "webp":
      return [
        { value: "pdf", label: "Documento PDF (.pdf)" },
        { value: "png", label: "Convertir a PNG" },
        { value: "jpg", label: "Convertir a JPG" },
      ];
    case "xlsx":
      return [
        { value: "pdf", label: "Documento PDF (.pdf)" },
        { value: "csv", label: "Valores CSV (.csv)" },
      ];
    case "txt":
      return [
        { value: "pdf", label: "Documento PDF (.pdf)" },
        { value: "docx", label: "Word (.docx)" },
      ];
    default:
      return [{ value: "pdf", label: "PDF (.pdf)" }];
  }
}

export function useFileHandler() {
  const [files, setFiles] = useState<ManagedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const addedList: ManagedFile[] = [];

    fileArray.forEach((file) => {
      const parts = file.name.split(".");
      const ext = parts.length > 1 ? parts.pop()?.toLowerCase() || "" : "";

      if (!SUPPORTED_EXTENSIONS.includes(ext)) {
        setNotice(`El archivo "${file.name}" no está soportado todavía. Por favor usa Word, PDF o imágenes.`);
        return;
      }

      addedList.push({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        file,
        name: file.name,
        size: file.size,
        ext,
        targetFormat: getDefaultTargetFormat(ext),
        status: "idle",
        progress: 0,
      });
    });

    if (addedList.length > 0) {
      setFiles((prev) => [...prev, ...addedList]);
      setNotice(null);
    }
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target?.resultUrl) {
        URL.revokeObjectURL(target.resultUrl);
      }
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clearFiles = useCallback(() => {
    setFiles((prev) => {
      prev.forEach((f) => {
        if (f.resultUrl) URL.revokeObjectURL(f.resultUrl);
      });
      return [];
    });
  }, []);

  const setTargetFormat = useCallback((id: string, format: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, targetFormat: format } : f))
    );
  }, []);

  const updateFileStatus = useCallback(
    (
      id: string,
      status: ManagedFile["status"],
      progress = 0,
      resultBlob?: Blob,
      error?: string,
      resultFileName?: string,
      resultMimeType?: string,
      pagesCount?: number
    ) => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id !== id) return f;
          const resultUrl = resultBlob ? URL.createObjectURL(resultBlob) : f.resultUrl;
          return {
            ...f,
            status,
            progress,
            resultBlob: resultBlob || f.resultBlob,
            resultUrl,
            resultFileName: resultFileName || f.resultFileName,
            resultMimeType: resultMimeType || f.resultMimeType,
            pagesCount: pagesCount !== undefined ? pagesCount : f.pagesCount,
            error,
          };
        })
      );
    },
    []
  );

  // Global Ctrl+V / Cmd+V paste support
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files && e.clipboardData.files.length > 0) {
        e.preventDefault();
        addFiles(e.clipboardData.files);
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [addFiles]);

  return {
    files,
    isDragging,
    setIsDragging,
    addFiles,
    removeFile,
    clearFiles,
    setTargetFormat,
    updateFileStatus,
    notice,
    setNotice,
  };
}
