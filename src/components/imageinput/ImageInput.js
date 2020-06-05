import React from 'react';
import './ImageInput.css'

const ImageInput = ({ onInputChange, onSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'Faces will be detected in your images. Upload an image to test our system.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5 center'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
                    <button className='w-30 grow f4 link ph3 pv2 dib' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageInput;
