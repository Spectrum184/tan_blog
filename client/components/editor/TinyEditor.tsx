import { FC, Dispatch, SetStateAction } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { IPostData } from "interface/post";

type PropTypes = {
  setPostData: Dispatch<SetStateAction<IPostData>>;
};

const TinyEditor: FC<PropTypes> = ({ setPostData }) => {
  return (
    <Editor
      initialValue="<p>Bắt đầu viết bài...</p>"
      apiKey="eoc9cg2gn42my9e811a17ycspmtznm88z5jrhpj5jri1zp64"
      init={{
        height: 500,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | " +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
      onEditorChange={(content: string) =>
        setPostData((prev) => {
          return { ...prev, content: content };
        })
      }
    />
  );
};

export default TinyEditor;
