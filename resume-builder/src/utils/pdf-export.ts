// PDF导出工具函数

import html2pdf from 'html2pdf.js'

interface PdfExportOptions {
  filename?: string
  paperSize?: 'a4' | 'letter'
  orientation?: 'portrait' | 'landscape'
  margin?: number
  quality?: number
}

const defaultOptions: Required<PdfExportOptions> = {
  filename: 'resume.pdf',
  paperSize: 'a4',
  orientation: 'portrait',
  margin: 10,
  quality: 1,
}

// 导出PDF
export async function exportToPdf(
  element: HTMLElement,
  options: PdfExportOptions = {}
): Promise<void> {
  const opts = { ...defaultOptions, ...options }

  const pdfOptions = {
    margin: opts.margin,
    filename: opts.filename,
    image: { type: 'jpeg' as const, quality: opts.quality },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
    },
    jsPDF: {
      unit: 'mm',
      format: opts.paperSize,
      orientation: opts.orientation,
    },
  }

  try {
    await html2pdf().set(pdfOptions).from(element).save()
  } catch (error) {
    console.error('PDF export failed:', error)
    throw new Error('PDF导出失败')
  }
}

// 生成PDF Blob
export async function generatePdfBlob(
  element: HTMLElement,
  options: PdfExportOptions = {}
): Promise<Blob> {
  const opts = { ...defaultOptions, ...options }

  const pdfOptions = {
    margin: opts.margin,
    image: { type: 'jpeg' as const, quality: opts.quality },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
    },
    jsPDF: {
      unit: 'mm',
      format: opts.paperSize,
      orientation: opts.orientation,
    },
  }

  try {
    return await html2pdf().set(pdfOptions).from(element).outputPdf('blob')
  } catch (error) {
    console.error('PDF generation failed:', error)
    throw new Error('PDF生成失败')
  }
}

// 打印预览
export function printResume(element: HTMLElement): void {
  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    throw new Error('无法打开打印窗口')
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>打印简历</title>
      <style>
        @page {
          size: A4;
          margin: 15mm;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.5;
          color: #333;
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      </style>
    </head>
    <body>
      ${element.innerHTML}
    </body>
    </html>
  `)

  printWindow.document.close()
  printWindow.focus()

  // 等待内容加载完成后打印
  setTimeout(() => {
    printWindow.print()
    printWindow.close()
  }, 500)
}
