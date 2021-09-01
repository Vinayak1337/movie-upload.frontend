import { FC } from 'react'
import { connect } from 'react-redux'
import UploadMovie from '../../Components/Home/Upload/UploadMovie'
import ViewMovies from '../../Components/Home/View/ViewMovies'
import './Home.scss'

const Home: FC<HomeProps> = ({ navLocation }) => {
    return (
        <div className="main-page">
            <div className="main-page-items">
                <UploadMovie isActive={ navLocation === 'upload_movies' } />
                <ViewMovies isActive={ navLocation === 'view_movies'} />
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    navLocation: state.locationReducer.navLocation
})

export default connect(mapStateToProps)(Home)
