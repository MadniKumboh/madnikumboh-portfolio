import React, { useEffect, useRef } from 'react';
import resumeDataUrl from '../../public/assets/Madni-Kumboh-Resume.pdf?inline';
import { Icon } from './Visuals.jsx';

const fileName = 'Madni-Kumboh-Resume.pdf';
const pdfUrl = `${import.meta.env.BASE_URL}assets/${fileName}`;

export default function ResumeDownload({ className, children }) {
  const pending = useRef(new Map());
  useEffect(() => () => {
    for (const [url, timer] of pending.current) { window.clearTimeout(timer); URL.revokeObjectURL(url); }
    pending.current.clear();
  }, []);

  function download(event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    // The PDF travels with the app, so saving does not require another authenticated request.
    try {
      const base64 = resumeDataUrl.slice(resumeDataUrl.indexOf(',') + 1);
      const bytes = Uint8Array.from(atob(base64), char => char.charCodeAt(0));
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url; link.download = fileName;
      document.body.appendChild(link);
      link.click(); link.remove();
      const timer = window.setTimeout(() => { URL.revokeObjectURL(url); pending.current.delete(url); }, 30000);
      pending.current.set(url, timer);
      event.preventDefault();
    } catch {
      // If file-saving APIs are unavailable, the normal link opens the PDF.
    }
  }

  return <span className="resume-links">
    <a className={className} href={pdfUrl} download={fileName} target="_blank" rel="noopener noreferrer" onClick={download}>{children}<Icon name="download"/></a>
    <a className="resume-open-link" href={pdfUrl} target="_blank" rel="noopener noreferrer">Open PDF <Icon name="arrow-up-right"/></a>
  </span>;
}
