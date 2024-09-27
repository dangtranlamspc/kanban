import React, { useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

interface DecoupledEditorProps {
  data: string;
  onChange: (data: string) => void;
}

const DecoupledEditorComponent: React.FC<DecoupledEditorProps> = ({ data, onChange }) => {
  const editorRef = useRef<any>();
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <div ref={toolbarRef}></div>
      <CKEditor
        onReady={(editor: any) => {
          console.log('Editor is ready to use!', editor);
          editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
          );
          editorRef.current = editor;
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          onChange(data);
        }}
        editor={DecoupledEditor}
        data={data}
      />
    </div>
  );
};

export default DecoupledEditorComponent;
