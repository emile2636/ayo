import { Component } from 'react'
import CustomInputNumber from './components/CustomInputNumber'

class App extends Component {
  onChange(name, value) {
    console.log('onChange', name, value)
  }
  onBlur(name, value) {
    console.log('onBlur', name, value)
  }
  render() {
    const { onChange, onBlur } = this
    return (
      <div className='flex items-center justify-center h-screen bg-slate-600'>
        <CustomInputNumber
          name='demo-input-number'
          min={0}
          max={30}
          step={1}
          onChange={onChange}
          onBlur={}
        />
      </div>
    )
  }
}

export default App
