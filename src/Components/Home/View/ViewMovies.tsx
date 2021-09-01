import axios from 'axios'
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import { baseurl } from '../../../Assets/utils'
import ItemsPerPage from './ItemsPerPage/ItemsPerPage'
import MovieItem from './MovieItem/MovieItem'
import MessageBar from '../../MessageBar/MessageBar'
import './ViewMovies.scss'
import { CloseIcon, LoadingIcon } from '../../../Assets/Icons'

const ViewMovies: FC<ViewMoviesProps> = ({ isActive }) => {
    const [state, setState] = useState<ViewMoviesState>({
        numberOfMovies: 10,
        movies: [],
        isLoading: false,
        hasError: false,
        videoToPlay: '',
        openPlayer: false,
    })

    const storeMovies = useCallback(async () => {
        setState(prevState => ({ ...prevState, isLoading: true }))
        const response = await axios.get(`${baseurl}/movies/${state.numberOfMovies}`)
        setState(prevState => ({ ...prevState, isLoading: false }))

        if (!(response.status === 200)) {
            if (!state.hasError) setState(prevState => {
                return { ...prevState, hasError: true }
            })
            return;
        }

        const data = response.data as Movie[];
        setState(prevState => ({ ...prevState, movies: data, hasError: false }))

    }, [state.hasError, state.numberOfMovies])

    useEffect(() => {
        storeMovies()
    }, [storeMovies, state.numberOfMovies])

    const handleItemsChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = Number(event.target.value) as 10 | 25 | 50 | 100;
        setState(prevState => ({ ...prevState, numberOfMovies: value }))
    }

    const handleVideoPlayer = (video: string) => {
        setState(prevState => ({ ...prevState, videoToPlay: video, openPlayer: true }))
    }

    const closePlayer = () => setState(prevState => ({ ...prevState, openPlayer: false }))

    return (
        <>
        <div className={`view-movie-body ${isActive ? 'view-movie-body-active' : 'view-movie-body-inactive'}`}>
            <div className="view-movie-container">
                    {
                        state.isLoading ? 
                        <LoadingIcon className="loading-icon" />
                        :
                        state.movies.map((movie, index) => (<MovieItem key={`movie-item-${index}`} movie={movie} handleClick={handleVideoPlayer} />))
                    }
            </div>
            <div className="view-movie-pagination">
                <ItemsPerPage value={state.numberOfMovies} handleChange={handleItemsChange} />
            </div>
        </div>
        {
            state.openPlayer &&
            <div className="view-movie-player">
                <video className="video" controls src={state.videoToPlay}/>
                <CloseIcon className="close-player-icon" onClick={closePlayer} />
            </div>
        }
        { state.hasError && <MessageBar handleClose={() => setState(prevState => ({ ...prevState, hasError: false }))} type="error" message="Something went wrong, did not receive response from server." /> }
        </>
    )
}

export default ViewMovies
