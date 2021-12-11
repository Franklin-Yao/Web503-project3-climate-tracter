import React, { useState } from 'react'
const ImageUploader = (props) => {
    const uploaderOnChange = props.uploaderOnChange
    const uploadImage = props.uploadImage
    const url = props.url
    return (
        <div>
            <hr></hr>
            <p>Please upload one image (optional)</p>
            <div className='mb-3 row'>
                <input type="file" className='col-6' onChange={(e)=>{
                    uploaderOnChange(e)
                    }}></input>
                <div className='col-6 d-flex justify-content-end'>
                    <button onClick={uploadImage}>Upload</button>
                </div>
            </div>
            <img className='w-25' src={url} alt=''/>
            <hr></hr>
        </div>
    )
}
export default ImageUploader;