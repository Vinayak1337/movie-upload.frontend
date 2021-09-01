import { FC } from 'react'
import './MovieInput.scss'

const MovieInput: FC<MovieInputProps> = ({ inputValue, handleChange, label }) => {
    return (
        <div className="movie-input-body">
            <div className="movie-input-container">
                <input type="text" name={label} id={label} value={inputValue} onChange={handleChange} required />
                <span></span>
                <label htmlFor={label}>{ label }</label>
            </div>
        </div>
    )
}

export default MovieInput
