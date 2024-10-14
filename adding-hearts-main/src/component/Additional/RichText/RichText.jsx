import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { Box, Container } from "@mantine/core";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const RichText = ({ value, onChange }) => {
  const [editorHtml, setEditorHtml] = useState(value || ""); // Initialize with form value

  useEffect(() => {
    setEditorHtml(value); // Sync editor with form's initial value
  }, [value]);

  const handleChange = (html) => {
    setEditorHtml(html);
    onChange(html); // Call parent onChange handler to update form
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headers (h1-h6, no header)
      [{ font: [] }], // Font selection
      [{ size: [] }], // Font size selection
      ["bold", "italic", "underline", "strike"], // Basic formatting
      [{ color: [] }, { background: [] }], // Font color and background
      [{ script: "sub" }, { script: "super" }], // Subscript / Superscript
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }], // Lists
      [{ indent: "-1" }, { indent: "+1" }], // Indent / Outdent
      ["link", "image", "video"], // Link, image, and video
      [{ align: [] }], // Text alignment
      ["blockquote", "code-block"], // Blockquote and code block
      [{ direction: "rtl" }], // Text direction (Right to Left)
      ["clean"], // Clear formatting button
    ],
  };

  return (
    <Box p={0} mt={10}>
      <ReactQuill
        value={editorHtml}
        onChange={handleChange}
        modules={modules}
        style={{ minHeight: 300 }}
      />
    </Box>
  );
};

export default RichText;
