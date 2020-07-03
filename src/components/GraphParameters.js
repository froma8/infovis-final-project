import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getParameters } from '../reducers'
import { setParameters, loadGraph } from '../actions'

const mapStateToProps = state => ({
  parameters: getParameters(state)
})

const GraphParameters = ({ parameters, closeModal, setParameters, loadGraph }) => {

  const [ localParams, setLocalParams ] = useState({...parameters})

  const onChange = (event) => {
    if (isNaN(event.target.value)) return
    setLocalParams({ ...localParams, [event.target.name]: event.target.value })
  }

  const submit = (event) => {
    event.preventDefault()
    closeModal()
    const values = {...localParams}
    Object.entries(values).forEach(([key, value]) => {
      values[key] = parseFloat(values[key])
    })
    setParameters(values)
    loadGraph()
  }

  return (
    <Form>
      <Field>
        <Label>Charge</Label>
        <Input
          name="charge"
          onChange={onChange}
          value={localParams.charge}
        />
      </Field>
      <Field>
        <Label>Link Strength</Label>
        <Input
          name="linkStrength"
          onChange={onChange}
          value={localParams.linkStrength}
        />
      </Field>
      <Field>
        <Label>Link Distance</Label>
        <Input
          name="linkDistance"
          onChange={onChange}
          value={localParams.linkDistance}
        />
      </Field>
      <Field>
        <Label>Gravity</Label>
        <Input
          name="gravity"
          onChange={onChange}
          value={localParams.gravity}
        />
      </Field>
      <Field>
        <Label>Iterations</Label>
        <Input
          name="iterations"
          onChange={onChange}
          value={localParams.iterations}
        />
      </Field>
      <Button onClick={submit}>Set parameters</Button>
    </Form>
  )
}

export default connect(mapStateToProps, { setParameters, loadGraph })(GraphParameters)

//region Style

const Form = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
`

const Field = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const Input = styled.input`
  box-sizing: border-box;
  padding: 5px;
`

const Label = styled.div`
  box-sizing: border-box;
  margin: 5px;
`

const Button = styled.button`
  background: gray;
  box-shadow: 0 0 0 transparent;
  border: 0 solid transparent;
  text-shadow: 0 0 0 transparent;
  margin: 10px;
  padding: 10px 15px;
  background: #008D22;
  color: #FFFFFF;
  font-size: 1rem;
  border-radius: 15px;
  &:hover {
    background: gray;
    box-shadow: 0 0 0 transparent;
    border: 0 solid transparent;
    text-shadow: 0 0 0 transparent;
    background: #016118;
  }
`
//endregion