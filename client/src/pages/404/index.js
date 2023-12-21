// ** React Imports
import { Link } from "react-router-dom"

// ** Reactstrap Imports
import { Button } from "reactstrap"
import source from "../../assets/error.svg"
const PageNotFound = () => {
    const role = JSON.parse(localStorage.getItem("userData"))?.role
    return (
        <div className="misc-wrapper">
            <Link className="brand-logo" to="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h2 className="text-primary" style={{ fontWeight: "bold" }}>
                    Thesis Management
                </h2>
            </Link>
            <div className="misc-inner p-2 p-sm-3">
                <div className="w-100 text-center">
                    <h2 className="mb-1">Page Not Found 🕵🏻‍♀️</h2>
                    <p className="mb-2">Oops! 😖 The requested URL was not found on this server</p>
                    <Button tag={Link} to={`/${role?.toLowerCase()}`} color="primary" className="btn-sm-block mb-2" style={{ backgroundColor: '#1cc4a1'}}>
                        Come back
                    </Button>
                    <img className="img-fluid" src={source} alt="Not authorized page" />
                </div>
            </div>
        </div>
    )
}
export default PageNotFound
