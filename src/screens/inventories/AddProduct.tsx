import { DecoupledEditorComponent } from '../../components';
import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const AddProduct = () => {
  const [editorData, setEditorData] = useState<string>();
  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-8'>
            {/* <DecoupledEditorComponent 
              data={editorData}
              onChange={(data) => setEditorData(data)}
            /> */}
            <Editor
								// disabled={isLoading || isCreating}
								apiKey='5x7i1xpxvigj4ztpvzche6j60glkwmwc1f0wa5ts6qywlr9o'
								// onInit={(evt, editor) => (editorRef.current = editor)}
								// initialValue={content !== '' ? content : ''}
								init={{
									height: 500,
									menubar: true,
									plugins: [
										'advlist',
										'autolink',
										'lists',
										'link',
										'image',
										'charmap',
										'preview',
										'anchor',
										'searchreplace',
										'visualblocks',
										'code',
										'fullscreen',
										'insertdatetime',
										'media',
										'table',
										'code',
										'help',
										'wordcount',
									],
									toolbar:
										'undo redo | blocks | ' +
										'bold italic forecolor | alignleft aligncenter ' +
										'alignright alignjustify | bullist numlist outdent indent | ' +
										'removeformat | help',
									content_style:
										'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
								}}
							/>
            {/* <div>
              <h2>Editor Output:</h2>
            <div dangerouslySetInnerHTML={{ __html: editorData }} />
          </div> */}
          </div> 
          <div className='col-4'>
            Categories
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct

