import React from "react";
import { Editor } from "@tinymce/tinymce-react";
const TinyEditor = () => {
  const handelChange = (e) => {
   console.log(e.targrt)
  };
  return (
    <>
      <Editor
        apiKey="bsysxtn43r9q180kzwnqm9hq24l6t57pr4k2he2ghz1wgm8q"
        cloudChannel="dev"
        init={{
          selector: "textarea",
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
        }}
        
        textChange={e=>handelChange(e)}
      />
    </>
  );
};

export default TinyEditor;
