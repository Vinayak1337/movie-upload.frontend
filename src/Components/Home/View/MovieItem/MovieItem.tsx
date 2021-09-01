import { FC } from 'react'
import moment from 'moment'
import './MovieItem.scss'

const MovieItem: FC<MovieItemProps> = ({ movie, handleClick }) => {
    const onClick = () => {
        handleClick(movie.videoUrl);
    }

    return (
        <div className="movie-item-body">
            <div className="movie-item-container">
                <div className="movie-item-thumbnail">
                    <img className="skeleton" src={movie.thumbnailUrl} alt={movie.movieName} onClick={onClick} />
                </div>
                <div className="movie-item-info">
                    <div className="movie-item-info-1">
                        <h3 className="movie-item-name" onClick={onClick}>{ movie.movieName.charAt(0).toUpperCase() + movie.movieName.slice(1) }</h3>
                        <p className="uploaded-at">{moment(movie.releasedOn).format('MMM Do YYYY,  hh:mm a')}</p>
                    </div>
                    <div className="movie-item-info-2">
                        <div className="movie-item-info-container">
                            <p className="label">Released on:</p>
                            <p className="value">{ movie.releasedOn}</p>
                        </div>
                        <div className="movie-item-info-container">
                            <p className="label">Language:</p>
                            <p className="value">{ movie.language }</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieItem
