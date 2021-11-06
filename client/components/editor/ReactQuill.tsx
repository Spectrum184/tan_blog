import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ConfirmModal from "components/ConfirmModal";

import { FC, useRef, useEffect, useCallback, useState } from "react";
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
  const [file, setFile] = useState<File>();
  const [visible, setVisible] = useState<boolean>(false);

  const handleFile = async (input: HTMLInputElement) => {
    const files = input.files;

    if (!files) return console.log("Chua chon file");

    const file = files[0];

    const err = checkImageFile(file);

    if (err) return console.log(err);

    setFile(file);
    setVisible(true);
  };

  const onUploadFile = async () => {
    if (!file) return;

    const photo = await uploadImage(file, "upload-post-image");

    const quill = quillRef.current;
    const range = quill?.getEditor().getSelection()?.index;

    if (range !== undefined)
      quill?.getEditor().insertEmbed(range, "image", `${photo.imageUrl}`);
  };

  const handleChangeImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = (e: Event) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      handleFile(input);
    };
  }, []);

  useEffect(() => {
    const quill = quillRef.current;

    if (!quill) return;

    const toolbar = quill.getEditor().getModule("toolbar");
    toolbar.addHandler("image", handleChangeImage);
  }, [handleChangeImage]);

  return (
    <div className="">
      <ConfirmModal
        header="Xác nhận upload file"
        content="Bạn có chắc chắn muốn upload ảnh này không?"
        visible={visible}
        setVisible={setVisible}
        onConfirm={onUploadFile}
      />
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="Viết nội dung bài đăng..."
        ref={quillRef}
        value={content}
        onChange={(e) => setContent(e)}
      />
    </div>
  );
};

export default Quill;
