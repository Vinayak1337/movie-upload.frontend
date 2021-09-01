import { FC } from 'react'
import './ItemsPerPage.scss'

const ItemsPerPage: FC<ItemsPerPageProps> = ({ value, handleChange }) => {
    return (
        <div className="items-per-page-body">
            <p className="ipp-label">Movies per page:</p>
            <select name="items-per-page-select" id="items-per-page-select" onChange={handleChange} value={value}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    )
}

export default ItemsPerPage
