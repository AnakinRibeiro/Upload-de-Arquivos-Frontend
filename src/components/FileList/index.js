import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

import { Container, FileInfo, Preview } from './styles';

const FileList = ({ files }) => {
  const { uploadedFiles } = files;

  return (
    <Container>
      {uploadedFiles && uploadedFiles.map(file => file.name)}
    </Container>
  );
};

export default FileList;
