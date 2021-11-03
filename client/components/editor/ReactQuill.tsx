import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { FC, useRef, useEffect, useCallback } from "react";
import { checkImageFile, uploadImage } from "utils/fileUpload";

const container = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown

  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ script: "sub" }, { script: "super" }], // superscript/subscript

  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ align: [] }],

  ["clean", "link", "image", "video"],
];

type PropTypes = {
  setContent: (value: string) => void;
  content: string;
};

const Quill: FC<PropTypes> = ({ setContent, content }) => {
  const modules = { toolbar: { container } };
  const quillRef = useRef<ReactQuill>(null);

  const handleChangeImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const files = input.files;

      if (!files) return console.log("Chua chon file");

      const file = files[0];

      const err = checkImageFile(file);

      if (err) return console.log(err);

      const photo = await uploadImage(file, "upload-post-image");

      console.log(photo);

      const quill = quillRef.current;
      const range = quill?.getEditor().getSelection()?.index;

      if (range !== undefined)
        quill?.getEditor().insertEmbed(range, "image", `${photo.imageUrl}`);
    };
  }, []);

  useEffect(() => {
    const quill = quillRef.current;

    if (!quill) return;

    const toolbar = quill.getEditor().getModule("toolbar");
    toolbar.addHandler("image", handleChangeImage);
  }, [handleChangeImage]);

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      placeholder="Viết nội dung bài đăng..."
      ref={quillRef}
      value={content}
      onChange={(e) => setContent(e)}
    />
  );
};

export default Quill;
