import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const navs = [
    {
        id: "/annoucement",
        value: "Thông báo",

    },
    {
        id: "/guide",
        value: "Hướng dẫn",
    },
    {
        id: "/preference",
        value: "Đề tài tham khảo",
    },
    // {
    //     id: "/lecturer-list",
    //     value: "Thông tin liên hệ",
    // },
]

const student_navs = [
    {
        id: "/student/register-thesis",
        value: "Đăng ký đề tài",
    },
    {
        id: "/student/manage-thesis",
        value: "Quản lý đề tài",

    }
]

const management_navs = [
    {
        id: "/management/register-thesis",
        value: "Đăng ký đề tài",
    },
    {
        id: "/management/manage-thesis",
        value: "Quản lý đề tài",
    },
    {
        id: "/management/approve-thesis",
        value: "Duyệt đề tài",
    },
    // {
    //     id: "/management/assigned-lecturer",
    //     value: "Phân GVPB",
    // }
]

const admin_navs = [
    {
        id: "/admin/manage-user",
        value: "Tài khoản",
    },
    {
        id: "/admin/manage-thesis",
        value: "Đề tài",
    }
]
const lenturer_navs = [
    {
        id: "/lecturer/register-thesis",
        value: "Đăng ký đề tài",
    },
    {
        id: "/lecturer/manage-thesis",
        value: "Quản lý đề tài",
    },
    // {
    //     id: "/lecturer/assigned-thesis",
    //     value: "Đề tài được phân công",
    // }
]
const Navbar = ({ role }) => {
    return (
        <div id="ftc-nav">
            <ul className="navbar-navb  display">
                {!role && navs.map((nav, index) => {
                    return (
                        <>
                            {nav.submenu ? (
                                <li className="navb-item" key={index} style={{ cursor: "pointer" }}>
                                    <a className="navb-link" >
                                        <span>{nav.value} <ArrowDropDownIcon /></span>
                                    </a>
                                    <ul className="dropdown"
                                    >
                                        {nav.submenu.map((submenu, index) => (
                                            <li key={index} className="dropdown-item">
                                                <a href={submenu.url}>{submenu.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </li >
                            ) : (
                                <li className="navb-item" key={index} >
                                    <a href={nav.id} className="navb-link" >
                                        <span>{nav.value}</span>
                                    </a>
                                </li>
                            )
                            }
                        </>
                    );
                })}
                {role === "Student" && student_navs.map((nav, index) => {
                    return (
                        <>
                            {nav.submenu ? (
                                <li className="navb-item" key={index} style={{ cursor: "pointer" }}>
                                    <a className="navb-link" >
                                        <span>{nav.value} <ArrowDropDownIcon /></span>
                                    </a>
                                    <ul className="dropdown"
                                    >
                                        {nav.submenu.map((submenu, index) => (
                                            <li key={index} className="dropdown-item">
                                                <a href={submenu.url}>{submenu.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </li >
                            ) : (
                                <li className="navb-item" key={index} >
                                    <a href={nav.id} className="navb-link" >
                                        <span>{nav.value}</span>
                                    </a>
                                </li>
                            )
                            }
                        </>
                    );
                })}
                {role === "Lecturer" && lenturer_navs.map((nav, index) => {
                    return (
                        <>
                            {nav.submenu ? (
                                <li className="navb-item" key={index} style={{ cursor: "pointer" }}>
                                    <a className="navb-link" >
                                        <span>{nav.value} <ArrowDropDownIcon /></span>
                                    </a>
                                    <ul className="dropdown"
                                    >
                                        {nav.submenu.map((submenu, index) => (
                                            <li key={index} className="dropdown-item">
                                                <a href={submenu.url}>{submenu.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </li >
                            ) : (
                                <li className="navb-item" key={index} >
                                    <a href={nav.id} className="navb-link" >
                                        <span>{nav.value}</span>
                                    </a>
                                </li>
                            )
                            }
                        </>
                    );
                })}
                {role === "Management" && management_navs.map((nav, index) => {
                    return (
                        <>
                            {nav.submenu ? (
                                <li className="navb-item" key={index} style={{ cursor: "pointer" }}>
                                    <a className="navb-link" >
                                        <span>{nav.value} <ArrowDropDownIcon /></span>
                                    </a>
                                    <ul className="dropdown"
                                    >
                                        {nav.submenu.map((submenu, index) => (
                                            <li key={index} className="dropdown-item">
                                                <a href={submenu.url}>{submenu.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </li >
                            ) : (
                                <li className="navb-item" key={index} >
                                    <a href={nav.id} className="navb-link" >
                                        <span>{nav.value}</span>
                                    </a>
                                </li>
                            )
                            }
                        </>
                    );
                })}
                {role === "Admin" && admin_navs.map((nav, index) => {
                    return (
                        <>
                            {nav.submenu ? (
                                <li className="navb-item" key={index} style={{ cursor: "pointer" }}>
                                    <a className="navb-link" >
                                        <span>{nav.value} <ArrowDropDownIcon /></span>
                                    </a>
                                    <ul className="dropdown"
                                    >
                                        {nav.submenu.map((submenu, index) => (
                                            <li key={index} className="dropdown-item">
                                                <a href={submenu.url}>{submenu.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </li >
                            ) : (
                                <li className="navb-item" key={index} >
                                    <a href={nav.id} className="navb-link" >
                                        <span>{nav.value}</span>
                                    </a>
                                </li>
                            )
                            }
                        </>
                    );
                })}
            </ul>
        </div>
    );
}

export default Navbar;