import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { connect } from 'react-redux'
import { loadGraph } from '../actions'
const { isArray } = Array


const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#4fa2bb';
}

const Menu = ({ loadGraph }) => {

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

      loadGraph(loadedFile)

    }

    reader.readAsText(file)
  }, [])

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: ['application/json'], onDrop})

  return (
    <Container>
      <DropArea
        {...getRootProps({isDragActive, isDragAccept, isDragReject})}
      >
        <input {...getInputProps()} />
        Load Graph +
      </DropArea>
    </Container>
  )
}

export default connect(null, { loadGraph })(Menu)

//region Style

const Container = styled.div`
  box-sizing: border-box;
  width: 300px;
  background: #ececec;
  height: 100%;
  padding: 10px 15px;
`

const Title = styled.div`
  font-size: 1.2rem;
  opacity: 0.85;
  margin: 2px 0 5px 7px;
`

const DropArea = styled.div`
  background: ${props => getColor(props)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-size: 1.2rem;
  border-radius: 20px;
  padding: 15px 10px;
  &:focus {
    outline: none;
  }
`

//endregion