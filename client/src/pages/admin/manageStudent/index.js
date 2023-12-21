import React, { useEffect, useState } from "react";
import CreateAccount from "../../../components/screens/admin/account-management/CreateAccount";
import InfoAccount from "../../../components/screens/admin/account-management/InfoAccount";
import axios from "axios"
import { configHeader } from "../../../@core/plugin/configHeader";
function ManageStudent() {
    const [listUser, setListUser] = useState([]);
    useEffect(() => {
        getUserList();
    }, [])
    const getUserList = async () => {
        await axios.get("/api/admin/get-all-user", configHeader(JSON.parse(localStorage.getItem("userData")).token)[0]).then((res) => {
            setListUser(res.data?.data?.data)
        }).catch((err) => {
            console.log(err)
        })
    }
        ;
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div style={{ marginRight: 50, marginTop: 135, marginLeft: 50 }}>
            <CreateAccount setList={setListUser} getUserList={getUserList} />
            </div>
            <div style={{ marginRight: 50}}>
            <InfoAccount data={listUser} setList={setListUser} getUserList={getUserList} />
            </div>
        </div>
    );
}

export default ManageStudent;
