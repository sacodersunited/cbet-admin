import React, { useCallback, useState, useEffect } from "react"
import { Image } from "react-bootstrap"
import { useDropzone } from "react-dropzone"
import dropzone from "./images/DropZone.png"
import dropzone_Active from "./images/DropZone Active.png"
import dropzone_Complete from "./images/DropZone Complete.png"
import dropzone_Uploading from "./images/DropZone Uploading.png"
import styled from "styled-components"
import { FaSpinner } from "react-icons/fa/index"

const SpinSpinner = styled(FaSpinner)`
  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }
  animation: spin 1.5s infinite;
`

export default function CbetDropzone(props) {
  const [isUploading, setIsUploading] = useState(false)
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    if (acceptedFiles.length === 0) {
      return
    }

    props.upload(acceptedFiles, setIsUploading(false))
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  useEffect(() => {
    console.log("cbetDropzone initial props", props)
  }, [])

  function clickUpload(e) {
    e.preventDefault()
    setIsUploading(true)
  }

  return (
    <div {...getRootProps()} style={{ width: "404px" }}>
      <input {...getInputProps()} />

      {isDragActive ? (
        <Image src={dropzone_Active} onClick={clickUpload} fluid />
      ) : null}

      {isUploading ? (
        <React.Fragment>
          <SpinSpinner style={{ marginTop: "5px" }} data-testid="spinner" />
          <Image src={dropzone_Uploading} onClick={clickUpload} fluid />
        </React.Fragment>
      ) : null}

      {props.complete ? <Image src={dropzone_Complete} fluid /> : null}

      {isUploading === false &&
      props.complete === false &&
      props.editImageUrl === "" ? (
        <Image src={dropzone} onClick={clickUpload} fluid />
      ) : (
        <Image src={props.editImageUrl} fluid />
      )}
    </div>
  )
}
