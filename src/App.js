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
    const uploadingFiles = files.map(file => ({
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

    setUploadedFiles(uploadedFiles.concat(uploadingFiles));

    uploadingFiles.forEach(processUpload);
  };

  const updateFile = (id, data) => {
    setUploadedFiles(
      uploadedFiles.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    );
  };

  const processUpload = uploadedFile => {
    const data = new FormData();

    data.append('file', uploadedFile.file, uploadedFile.name);

    api.post('posts', data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total));

        updateFile(uploadedFile.id, {
          progress
        });
      }
    });
  };

  return (
    <Container>
      <Content>
        <Upload onUpload={handleUpload} />
        {!!uploadedFiles.length && <FileList files={uploadedFiles} />}
      </Content>
      <GlobalStyles />
    </Container>
  );
}

export default App;
