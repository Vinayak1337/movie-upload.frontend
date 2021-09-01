/// <reference types="react-scripts" />

type NavLocation = 'upload_movies' | 'view_movies' | null

interface LocationReducerAction {
    type: 'set_location';
    payload: NavLocation;
}

interface NavbarItemProps {
    isActive: boolean;
    handleClick: () => void;
    spanWidth: string;
    label: string;
}

interface LocationReducer {
    navLocation: NavLocation;
}
interface RootState {
    locationReducer: LocationReducer;
}

interface NavbarProps {
    setLocation: (location: NavLocation) => void;
    navLocation: NavLocation;
}

interface UploadMovieProps {
    isActive: boolean;
}

interface UploadMovieState {
    movieName: string;
    movieYear: string;
    movieLanguage: string;
    movieThumbnail: string;
    movieVideo: string;
    movieThumbnailRaw: any;
    movieVideoRaw: any;
    openYearSelect: boolean;
    isValid: boolean;
    thumbnailProgress: number;
    videoProgress: number;
    hasMessage: boolean;
    messageType: 'success' | 'error'
}

type UploadMovieAction = {
    type: 'set_movie_name' | 'set_movie_language' | 'set_movie_year' | 'set_movie_thumbnail' | 'set_movie_video';
    payload: string;
} | {
    type: 'set_thumbnail_raw' | 'set_video_raw';
    payload: any;
} | {
    type: 'set_open_select' | 'set_is_valid' | 'set_has_message';
    payload: boolean;
} | {
    type: 'set_video_progress' | 'set_thumbnail_progress';
    payload: number;
} | {
    type: 'set_message_type',
    payload: 'success' | 'error'
}

interface HomeProps {
    navLocation: NavLocation;
}

interface ViewMoviesProps {
    isActive: boolean;
}

interface ViewMoviesState {
    movies: Movie[],
    numberOfMovies: 10 | 25 | 50 | 100;
    isLoading: boolean;
    hasError: boolean;
    videoToPlay: string;
    openPlayer: boolean;
}

interface MessageBarProps {
    type: 'error' | 'success' | 'warning' | 'info';
    message: string;
    handleClose: () => void;
}

interface SelectYearOptionProps {
    label: string;
    handleChange: (year: string) => void;
}

interface SelectYearProps {
    isActive: boolean;
    selectedOption: string;
    toggleSelect: (value?: boolean) => void;
    handleChange: (year: string) => void;
}

interface MovieInputProps {
    inputValue: string;
    label: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

interface UploadItemProps {
    label: string;
    acceptOnly: 'image/*' | 'video/*';
    handleChange: (value: null | any) => void;
    uploadProgress: number;
}

interface Movie {
    language: string;
    movieName: string;
    releasedOn: string;
    thumbnailUrl: string;
    videoUrl: string;
    uploadedOn: number;
}

interface MovieItemProps {
    movie: Movie;
    handleClick: (movieVideo: string) => void;
}

interface ItemsPerPageProps {
    value: 10 | 25 | 50 | 100;
    handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}