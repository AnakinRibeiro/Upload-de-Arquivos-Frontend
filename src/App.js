import React, { useState, useEffect } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import api from './services/api';

import GlobalStyles from './styles/global';
import { Container, Content } from './styles';

import Upload from './components/Upload/index';
import FileList from './components/FileList/index';

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUpload = files => {
    const uploadedFiless = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));

    setUploadedFiles({
      uploadedFiles: uploadedFiles.concat(uploadedFiless)
    });
  };

  return (
    <Container>
      <Content>
        <Upload onUpload={handleUpload} />
        <FileList files={uploadedFiles} />
      </Content>
      <GlobalStyles />
    </Container>
  );
}

export default App;
