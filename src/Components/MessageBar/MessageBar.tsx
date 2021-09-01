import { FC } from 'react'
import { ErrorIcon, WarningIcon, InfoIcon, SuccessIcon, CloseIcon } from '../../Assets/Icons';
import './MessageBar.scss'

const MessageBar: FC<MessageBarProps> = ({ type, handleClose, message }) => {

    const getIcon = () => {
        switch (type) {

            case 'error':
                return <ErrorIcon className="message-bar-icon message-bar-main-icon"/>;
            
            case 'warning':
                return <WarningIcon className="message-bar-icon message-bar-main-icon"/>;

            case 'info':
                return <InfoIcon className="message-bar-icon message-bar-main-icon"/>;

            case 'success':
                return <SuccessIcon className="message-bar-icon message-bar-main-icon"/>;

        }
    }

    return (
        <div className="message-bar">
            <div className={`message-bar-container message-bar-${type}`}>
                {
                    getIcon()
                }
                <p>{message}</p>
                <CloseIcon className="message-bar-icon message-bar-close-icon" onClick={handleClose}/>
            </div>
        </div>
    )
}

export default MessageBar
