import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "@/components/textbooks/EditorToolbar";
import "react-quill/dist/quill.snow.css";

export const Editor = (props) => {
  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        value={props.text || ''}
        onChange={props.handleChange}
        onFocus={props.handleFocus}
        onBlur={props.handleBlur}
        placeholder={props.placeholder}
        // modules={modules}
        // formats={formats}
        theme="snow"
        style={{height:"250px"}}
      />
    </div>
  );
};

export default Editor;
