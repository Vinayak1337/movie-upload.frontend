import { ChangeEvent, MutableRefObject } from 'react'
import { FC, useRef } from 'react'
import { UploadIcon } from '../../../../Assets/Icons'
import './UploadItem.scss'

const UploadItem: FC<UploadItemProps> = ({ label, acceptOnly, handleChange, uploadProgress }) => {
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>

    const handleClick = () => {
        inputRef.current?.click()
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files || !files.length) return handleChange(null)
        const file = files[0]
        handleChange(file)
    }

    return (
        <div className="upload-item-body" onClick={handleClick}>
                <div className="upload-item-container">
                <p>{ label }</p>
                <UploadIcon className="upload-icon"/>
                <input type="file" name="" id="" multiple={false} accept={acceptOnly} ref={inputRef} onChange={handleInputChange} hidden/>
            </div>
            { uploadProgress || uploadProgress === 100 ? 
            <div className="upload-progress">
                <span className="upload-progress-bar" style={{width: `${uploadProgress}%`}}></span>
                <span className="empty-upload-progress"></span>
                <p>{`${uploadProgress}%`}</p>
            </div>
             : ''}
        </div>
    )
}

export default UploadItem
