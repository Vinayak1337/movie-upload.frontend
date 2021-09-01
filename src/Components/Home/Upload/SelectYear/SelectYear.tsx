import { FC, MutableRefObject, useEffect, useMemo, useRef, useCallback } from 'react'
import SelectYearOption from '../SelectYearOption/SelectYearOption'
import './SelectYear.scss'

const SelectYear: FC<SelectYearProps> = ({ isActive, toggleSelect, handleChange, selectedOption }) => {
    
    const selectRef = useRef() as MutableRefObject<HTMLDivElement>
    useMemo(() => isActive, [isActive])

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (!selectRef.current?.contains(event.target as Node) && isActive) {
            toggleSelect(false)
        }
    }, [isActive, toggleSelect])

    useEffect(() => {
            document.addEventListener("mousedown", handleClickOutside);
    }, [isActive, handleClickOutside])

    const handleOptionChange = (year: string) => {
        handleChange(year);
        toggleSelect()
    }

    const years = [];
    for (let i = 2021; i >= 1888; i--) years.push(String(i));

    return (
            <div className="year-select-box" ref={selectRef}>
                <div className={`select-options-container ${isActive ? 'select-year-isActive' : ''}`}>
                    {
                        years.map((value, index) => {
                            return <SelectYearOption key={`select-option-${index}`} label={value} handleChange={handleOptionChange} />
                        })
                    }
                </div>
                <div className="default-select-option" onClick={() => toggleSelect()}>
                    { selectedOption }
                </div>
            </div>
    )
}

export default SelectYear
