"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { RefObject } from "react";

interface PdfExportButtonProps {
  contentRef: RefObject<HTMLDivElement | null>;
  fileName?: string;
}

export default function PdfExportButton({ contentRef, fileName = "resume" }: PdfExportButtonProps) {
  const handleDownload = async () => {
    if (!contentRef.current) return;

    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <Button 
      variant="outline" 
      className="flex items-center gap-2"
      onClick={handleDownload}
    >
      <Download size={16} />
      Download PDF
    </Button>
  );
}


