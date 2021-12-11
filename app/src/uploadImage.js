import React, { useState } from 'react'
const ImageUploader = (props) => {
    const uploaderOnChange = props.uploaderOnChange
    const url = props.url
    return (
        <div>
            <hr></hr>
            <p>Please upload one image (optional)</p>
            <div className='mb-3'>
                <input type="file" onChange={(e)=>{
                    uploaderOnChange(e)
                    }}></input>
                {/* <button onClick={uploadImage}>Upload</button> */}
            </div>
            <img className='w-25' src={url} alt=''/>
            <hr></hr>
        </div>
    )
}
export default ImageUploader;