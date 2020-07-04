import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { connect } from 'react-redux'
import { loadRawGraph, loadGraph, setSelectGraphValue } from '../../actions'
const { isArray } = Array

const getBackgroundColor = ({isDragAccept, isDragReject, isDragActive}) => {
  if (isDragAccept) {
    return '#00e676';
  }
  if (isDragReject) {
    return '#ff1744';
  }
  if (isDragActive) {
    return '#2196f3';
  }
  return '#FAFAFA';
}

const getColor = ({isDragAccept, isDragReject, isDragActive}) => {
  if (isDragAccept || isDragReject || isDragActive) {
    return '#FFFFFF';
  }
  return '#727272';
}

const getBorderColor = ({isDragAccept, isDragReject, isDragActive}) => {
  if (isDragAccept || isDragReject || isDragActive) {
    return '#FFFFFF';
  }
  return '#9c9c9c';
}

const DropArea = ({ loadRawGraph, loadGraph, setSelectGraphValue }) => {

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()
    if (acceptedFiles.length === 0) {
      return alert('You must choose a json file')
    }
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      let loadedFile
      try {
        loadedFile = JSON.parse(reader.result)
      } catch(e) {
        return alert('JSON file malformed')
      }
      const { nodes, edges, communities } = loadedFile
      if (!isArray(nodes) || !isArray(edges || !isArray(communities))) {
        return alert('JSON file must contain 3 arrays: nodes, edges and communities')
      }

      loadRawGraph(loadedFile)
      loadGraph()
      setSelectGraphValue(null)
    }

    reader.readAsText(file)
  }, [loadRawGraph, loadGraph, setSelectGraphValue])


  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: ['application/json'], onDrop})

  return (
    <Container
      {...getRootProps({isDragActive, isDragAccept, isDragReject})}
    >
      <input {...getInputProps()} />
      Click or drag to load
    </Container>
  )
}

export default connect(null, { loadRawGraph, loadGraph, setSelectGraphValue })(DropArea)

//region Style

const Container = styled.div`
  background: ${props => getBackgroundColor(props)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${props => getColor(props)};
  font-size: 1.2rem;
  border-radius: 10px;
  border: 2px dashed ${props => getBorderColor(props)};
  padding: 15px 10px;
  &:focus {
    outline: none;
  }
`

//endregion