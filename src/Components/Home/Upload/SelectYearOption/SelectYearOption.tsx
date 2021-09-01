import { FC } from 'react'
import './SelectYearOption.scss'

const SelectYearOption: FC<SelectYearOptionProps> = ({ label, handleChange }) => {
    return (
        <div className="select-year-option" onClick={() => {
            handleChange(label)
        }}>
            <input type="radio" name="select-year-option-name" className="select-option-radio" id={label} />
            <label htmlFor={label}>{ label }</label>
        </div>
    )
}

export default SelectYearOption
