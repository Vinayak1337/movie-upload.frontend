import { ChangeEvent, FC, useEffect, useReducer } from 'react'
import MovieInput from './MovieInput/MovieInput';
import SelectYear from './SelectYear/SelectYear';
import UploadItem from './UploadItem/UploadItem';
import './UploadMovie.scss'
import axios from 'axios'
import { baseurl } from '../../../Assets/utils';
import MessageBar from '../../MessageBar/MessageBar';

const SET_MOVIE_NAME = 'set_movie_name',
    SET_MOVIE_YEAR = 'set_movie_year',
    SET_MOVIE_LANGUAGE = 'set_movie_language',
    SET_MOVIE_THUMBNAIL = 'set_movie_thumbnail',
    SET_MOVIE_VIDEO = 'set_movie_video',
    SET_THUMBNAIL_RAW = 'set_thumbnail_raw',
    SET_VIDEO_RAW = 'set_video_raw',
    SET_OPEN_SELECT = 'set_open_select',
    SET_IS_VALID = 'set_is_valid',
    SET_THUMBNAIL_PROGRESS = 'set_thumbnail_progress',
    SET_VIDEO_PROGRESS = 'set_video_progress',
    SET_HAS_MESSAGE = 'set_has_message',
    SET_MESSAGE_TYPE = 'set_message_type';

const UploadMovie: FC<UploadMovieProps> = ({ isActive }) => {
    const [state, dispatch] = useReducer(stateReducer, {
        movieName: '',
        movieYear: 'Select Movie Year',
        movieLanguage: '',
        movieThumbnail: '',
        movieVideo: '',
        movieThumbnailRaw: null,
        movieVideoRaw: null,
        openYearSelect: false,
        isValid: false,
        thumbnailProgress: 0,
        videoProgress: 0,
        hasMessage: false,
        messageType: 'success',
    });

    const { movieName, movieYear, movieLanguage, movieThumbnail, movieVideo } = state;

    useEffect(() => {
        if ((!movieThumbnail || !movieVideo || movieYear.includes(' ') || !(movieName.length > 2) || !((movieLanguage.length > 1) || movieLanguage.length < 10))) dispatch({
            type: SET_IS_VALID,
            payload: false,
        })
        else dispatch({
            type: SET_IS_VALID,
            payload: true,
        })
    }, [movieName, movieYear, movieLanguage, movieThumbnail, movieVideo])

    const handleYearChange = (year: string) => {
        dispatch({
            type: SET_MOVIE_YEAR,
            payload: year,
        })
    }

    const toggleYearSelect = (value?: boolean) => {
        dispatch({
            type: SET_OPEN_SELECT,
            payload: value === false ? false : !state.openYearSelect,
        })
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: SET_MOVIE_NAME,
            payload: event.target.value,
        })
    }

    const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: SET_MOVIE_LANGUAGE,
            payload: event.target.value,
        })
    }

    const handleThumbnailChange = (value: null | any) => {
        dispatch({
            type: SET_THUMBNAIL_RAW,
            payload: value,
        })
        if (value) dispatch({
            type: SET_MOVIE_THUMBNAIL,
            payload: value.name,
        })
        else dispatch({
            type: SET_MOVIE_THUMBNAIL,
            payload: '',
        })
    }

    const handleVideoChange = (value: null | any) => {
        dispatch({
            type: SET_VIDEO_RAW,
            payload: value,
        })
        if (value) dispatch({
            type: SET_MOVIE_VIDEO,
            payload: value.name,
        })
        else dispatch({
            type: SET_MOVIE_VIDEO,
            payload: '',
        })
    }

    const uploadThumbnail = async () => {
        try {
            const { movieThumbnailRaw } = state
            if (!movieThumbnailRaw) return;
            const data = new FormData()
            const filename = movieThumbnailRaw.name.split('.').reverse().pop()

            data.append('thumbnail', movieThumbnailRaw, `${filename.replace(/ +/g, '_')}${Date.now()}`)

            const options = {
                onUploadProgress: (progressEvent: { loaded: any; total: any; }) => {
                const {loaded, total} = progressEvent
                const percent = Math.floor( (loaded * 100) / total )
        
                if( percent < 100 ){
                    dispatch({
                        type: SET_THUMBNAIL_PROGRESS,
                        payload: percent,
                    })
                }
                }
            }

            const response = await axios.post(`${baseurl}/upload/thumbnail`, data, options)
            if (response.status === 200) {
                dispatch({
                    type: SET_THUMBNAIL_PROGRESS,
                    payload: 100,
                })

                setTimeout(() => dispatch({
                    type: SET_THUMBNAIL_PROGRESS,
                    payload: 0,
                }), 1000)
                return response.data;
            }

            toggleMessage('error')
            return null;
        } catch (error) {
            console.log(error)
        }
    }

    const uploadVideo = async () => {
        try {
            const { movieVideoRaw } = state
            if (!movieVideoRaw) return;
            const data = new FormData()
            let filename = movieVideoRaw.name.split('.').reverse().pop()
            data.append('video', movieVideoRaw, `${filename.replace(/ +/g, '_')}${Date.now()}`)

            const options = {
                onUploadProgress: (progressEvent: { loaded: any; total: any; }) => {
                const {loaded, total} = progressEvent;
                const percent = Math.floor( (loaded * 100) / total )
        
                if( percent < 100 ){
                    dispatch({
                        type: SET_VIDEO_PROGRESS,
                        payload: percent,
                    })
                }
                }
            }

            const response = await axios.post(`${baseurl}/upload/video`, data, options)
            if (response.status === 200) {
                dispatch({
                    type: SET_VIDEO_PROGRESS,
                    payload: 100,
                })

                setTimeout(() => dispatch({
                    type: SET_VIDEO_PROGRESS,
                    payload: 0,
                }), 1000)
                return response.data
            }
            toggleMessage('error')
            return null;
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async () => {
        const uploadData = await Promise.all([
            uploadThumbnail(),
            uploadVideo(),
        ])

        if (!uploadData[0] || !uploadData[1]) return;

        const data = {
            movieName,
            releasedOn: movieYear,
            language: movieLanguage,
            thumbnailUrl: uploadData[0],
            videoUrl: uploadData[1],
        }

        const response = await axios.post(`${baseurl}/movies`, data)
        if (response.status === 200) {
            toggleMessage('success')
            return;
        }
        toggleMessage('error')
    }

    const toggleMessage = (type: 'success' | 'error') => {
        dispatch({
            type: SET_MESSAGE_TYPE,
            payload: type,
        })

        dispatch({
            type: SET_HAS_MESSAGE,
            payload: true,
        })

        setTimeout(() => dispatch({
            type: SET_HAS_MESSAGE,
            payload: false,
        }), 5000)
    }

    const closeMessageBar = () => {
        dispatch({
            type: SET_HAS_MESSAGE,
            payload: false,
        })
    }

    const getMessage = () => {
        if (state.messageType === 'error') return 'Something went wrong, please try again.'
        return 'Successcully uploaded the movie.'
    }

    return (
        <>
        <div className={`upload-movie-body ${isActive ? 'upload-movie-body-active' : 'upload-movie-body-inactive'}`}>
            <MovieInput inputValue={state.movieName} handleChange={handleNameChange} label="Movie Name"/>
            <MovieInput inputValue={state.movieLanguage} handleChange={handleLanguageChange} label="Movie Language"/>
            <SelectYear handleChange={handleYearChange} isActive={state.openYearSelect} toggleSelect={toggleYearSelect} selectedOption={state.movieYear}/>
            <UploadItem label={ state.movieThumbnail || "Upload Thumbnail" } acceptOnly="image/*" handleChange={handleThumbnailChange} uploadProgress={state.thumbnailProgress} />
            <UploadItem label={ state.movieVideo || "Upload Video" } acceptOnly="video/*" handleChange={handleVideoChange} uploadProgress={state.videoProgress} />
            <button type="button" disabled={!state.isValid} onClick={handleSubmit}>Upload</button>
        </div>
        { state.hasMessage ?
        <MessageBar type={state.messageType} handleClose={closeMessageBar} message={getMessage()} />
        : ''}
        </>
    )
}

const stateReducer = (state: UploadMovieState, action: UploadMovieAction) => {
    switch (action.type) {

        case SET_MOVIE_NAME:
            return { ...state, movieName: action.payload };

        case SET_MOVIE_YEAR:
            return { ...state, movieYear: action.payload };
        
        case SET_MOVIE_LANGUAGE:
            return { ...state, movieLanguage: action.payload };
    
        case SET_MOVIE_THUMBNAIL:
            return { ...state, movieThumbnail: action.payload };

        case SET_MOVIE_VIDEO:
            return { ...state, movieVideo: action.payload };
    
        case SET_THUMBNAIL_RAW:
            return { ...state, movieThumbnailRaw: action.payload };

        case SET_VIDEO_RAW:
            return { ...state, movieVideoRaw: action.payload };

        case SET_OPEN_SELECT:
            return { ...state, openYearSelect: action.payload };

        case SET_IS_VALID:
            return { ...state, isValid: action.payload };
        
        case SET_THUMBNAIL_PROGRESS:
            return { ...state, thumbnailProgress: action.payload }

        case SET_VIDEO_PROGRESS:
            return { ...state, videoProgress: action.payload }
        
        case SET_HAS_MESSAGE:
            return { ...state, hasMessage: action.payload }

        case SET_MESSAGE_TYPE:
            return { ...state, messageType: action.payload }
        
        default: return state;
    }
}

export default UploadMovie