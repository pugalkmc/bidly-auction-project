import './PageNotFound.css'
import { Link } from 'react-router-dom';

const PageNotFound = ()=> {
    return (
        <div className="page-not-found">
            <h3>404 Page Not Found</h3>
            <Link to='/home' style={{display:'block'}}>To do Home Page</Link>
        </div>
    )
}

export default PageNotFound;