import { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";

const MyEditor = ({ placeholder, onChangeText, description }) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(description)
  },[description])

  const config = useMemo(() => {
    return {
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "",
    };
  }, [placeholder]);

  let onChange = (newContent) => {
    setContent(newContent);
    onChangeText(content);
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => onChange(newContent)}
    />
  );
};

export default MyEditor;
