import React from "react";
import { useDropzone } from "react-dropzone";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useCallback } from "react";
import { filesQuery } from "./Files";

const UPLOAD_BLOG_IMAGE = gql`
  mutation UploadFile($file: Upload!, $id: ID!) {
    uploadImage(file: $file, blogId: $id)
  }
`;

export const Upload = () => {
  const [uploadImage] = useMutation(UPLOAD_BLOG_IMAGE, {
    refetchQueries: [{ query: filesQuery }]
  });

  const onDrop = useCallback(
    ([file]) => {
      uploadImage({ variables: { file, id: "5e7086bce3400b219811a65c" } });
    },
    [uploadImage]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        display: `flex`,
        height: `100px`,
        border: `1px dashed black`,
        alignItems: `center`,
        justifyContent: `center`
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag & Drop files here or click to select files</p>
      )}
    </div>
  );
};
