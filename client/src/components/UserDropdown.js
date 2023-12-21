// ** React Imports
import { useEffect, useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/actions/auth"

// ** Custom Components
import Avatar from "./avatar"

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap"
import { User, Power } from "react-feather"

// ** Default Avatar Image
import defaultAvatar from "../assets/im_user.png"

const UserDropdown = () => {
  // ** Store Vars
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const id = useRef()
  const dispatch = useDispatch()
  const data = JSON.parse(localStorage.getItem("userData"))
  const role = data?.role
  const handleLogoutUser = () => {
    dispatch(logout(
      data?._id,
      setLoading,
      () => navigate("/")
    ))
    localStorage.removeItem("userData")
    localStorage.removeItem("token")
  }
  //** Vars
  const userAvatar = defaultAvatar

  return (
    <>
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
          <Avatar img={userAvatar} className={`bg-white ${userAvatar ? "" : "default"}`} />
          <div className="user-nav d-inline align-items-start">
            <span className="user-name font-weight-bold">{JSON.parse(localStorage.getItem("userData"))?.name}</span>
          </div>
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem tag={Link} to={`/${role?.toLowerCase()}/profile`}>
            <User size={16} style={{ marginRight: "7.5px" }} />
            <span className="align-middle">Profile</span>
          </DropdownItem>
          <DropdownItem onClick={handleLogoutUser}>
            <Power size={16} style={{ marginRight: "7.5px" }} />
            <span className="align-middle">Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  )
}

export default UserDropdown
