import React, { useEffect, useState } from 'react'
import { Row, Col, Label, Input, Form } from 'reactstrap'
import { Controller, useForm } from "react-hook-form"

import { useDispatch, useSelector } from 'react-redux'
import ErrorNotificationToast from "../../../components/toast/ToastFail"
import SuccessNotificationToast from "../../../components/toast/ToastSuccess"
import toast from "react-hot-toast"
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'
import Select from "react-select"
import { getUserInfoById } from "../store/action"
import { useNavigate } from 'react-router-dom'
import FormControl from '@mui/material/FormControl'
import axios from "axios"
import { configHeader } from '../../../@core/plugin/configHeader'
import { isObjEmpty } from "../../../utility/Utils"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField } from '@mui/material'
import { logout } from "../../../redux/actions/auth"

const options = () => {
    return [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" }
    ]
}
const Profile = () => {
    const dispatch = useDispatch()
    const [isDisable, setIsDisable] = useState(true)
    const store = useSelector(state => state.user?.userInfo)
    const [data, setData] = useState(JSON.parse(localStorage.getItem("userData")))
    const [errorGender, setErrorGender] = useState(false)
    const [gender, setGender] = useState(data?.gender || "")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const schema = yup.object().shape({
        fullname: yup.string().required(),
        major: yup.string().required(),
        facility: yup.string().required(),
        phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid')
    })
    useEffect(() => {
        setData(JSON.parse(localStorage.getItem("userData")))
        dispatch(getUserInfoById(
            JSON.parse(localStorage.getItem("userData"))._id,
            () => handleLogoutUser()
        ))
    }, [])

    const defaultValues = {
        fullname: data?.name,
        phoneNumber: data?.phoneNumber,
        gender: data?.gender,
        class: data?.stClass,
        major: data?.major,
        facility: data?.facility
    }
    const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })
    const handleLogoutUser = () => {
        dispatch(logout(
            data?._id,
            setLoading,
            () => navigate("/login")
        ))
        localStorage.removeItem("userData")
        localStorage.removeItem("token")
    }

    const onSubmit = e => {
        if (isObjEmpty(errors)) {
            const userData = {}
            userData.id = data._id
            userData.fullName = e.fullname
            userData.phone = e.phoneNumber
            userData.gender = gender.value
            userData.facility = e.facility
            userData.major = e.major
            axios.post("/api/update-by-id", userData, configHeader(JSON.parse(localStorage.getItem("userData")).token)[0])
                .then(res => {
                    toast.success(<SuccessNotificationToast message={res?.data?.userData?.errMessage} />)
                    dispatch(getUserInfoById(
                        JSON.parse(localStorage.getItem("userData"))._id,
                        () => handleLogoutUser()
                    ))
                    setIsDisable(true)
                })
                .catch(err => {
                    if (err.response.data.message) {
                        toast.error(<ErrorNotificationToast message={err.response.data.message} />)
                    } else {
                        toast.error(<ErrorNotificationToast message={"Something's wrong with one or more field!"} />)
                    }
                })
        }
    }
    return (
        <div id="profile">
            <div className="wrapper">
                <Row>
                    <Col lg={12} sm={6} xs={12} className="mb-3">
                        <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col lg={6} sm={6} xs={12} className="mb-3">
                                    <FormControl fullWidth sx={{ mb: 3 }}>
                                        <Label htmlFor='auth-login-v2-password'>
                                            Mã số sinh viên
                                        </Label>
                                        <TextField
                                            disabled
                                            id="id"
                                            autoComplete="off"
                                            autoFocus
                                            defaultValue={data?.idUser}
                                        />
                                    </FormControl>
                                </Col>
                                <Col lg={6} sm={6} xs={12} className="mb-3">
                                    <FormControl fullWidth sx={{ mb: 3 }}>
                                        <Label htmlFor='auth-login-v2-password' className="text-left" error={Boolean(errors.fullname)}>
                                            Họ và tên
                                        </Label>
                                        <Controller
                                            name='fullname'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                    disabled={isDisable}
                                                    autoFocus
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    error={Boolean(errors.fullname)}
                                                />
                                            )}
                                        />
                                        {errors.fullname && (
                                            <FormHelperText sx={{ color: 'error.main' }}>{errors.fullname.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Col>
                                <Col lg={6} sm={6} xs={12} className="mb-3">
                                    <FormControl fullWidth className="mb-3">
                                        <Label className="form-label" for="phoneNumber" error={Boolean(errors.phoneNumber)}>
                                            Số điện thoại
                                        </Label>
                                        <Controller
                                            name='phoneNumber'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                    disabled={isDisable}
                                                    autoFocus
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    error={Boolean(errors.phoneNumber)}
                                                />
                                            )}
                                        />
                                        {errors.phoneNumber && (
                                            <FormHelperText sx={{ color: 'error.main' }}>{errors.phoneNumber.message}</FormHelperText>
                                        )}

                                    </FormControl>
                                </Col>
                                <Col lg={6} sm={6} xs={12} className="mb-3">
                                    <FormControl fullWidth sx={{ mb: 3 }}>
                                        <Label htmlFor='auth-login-v2-password' error={Boolean(errors.facility)}>
                                            Khoa
                                        </Label>
                                        <Controller
                                            name='facility'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                    disabled={isDisable}
                                                    autoFocus
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    error={Boolean(errors.facility)}
                                                />
                                            )}
                                        />
                                        {errors.facility && (
                                            <FormHelperText sx={{ color: 'error.main' }}>{errors.facility.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Col>

                                <Col lg={6} sm={6} xs={12} className="mb-3">
                                    <Label className="form-label" for="gender">
                                        Giới tính
                                    </Label>
                                    <Select
                                        styles={{
                                            valueContainer: (provided, state) => ({
                                                ...provided,
                                                height: '58px',
                                                padding: '0 6px'
                                            }),
                                        }}
                                        className="gender"
                                        classNamePrefix="select"
                                        isLoading={false}
                                        isClearable={false}
                                        isDisabled={isDisable}
                                        placeholder={gender || ""}
                                        isRtl={false}
                                        isSearchable={true}
                                        name="gender"
                                        options={options()}
                                        value={gender}
                                        onChange={(value) => {
                                            setErrorGender(false)
                                            setGender(value)
                                        }}
                                    />
                                </Col>
                                <Col lg={6} sm={6} xs={12} className="mb-3">
                                    <FormControl fullWidth sx={{ mb: 3 }}>
                                        <Label htmlFor='auth-login-v2-password'>
                                            Email
                                        </Label>
                                        <TextField
                                            disabled
                                            id="email"
                                            autoComplete="off"
                                            autoFocus
                                            defaultValue={data?.email}
                                        />
                                    </FormControl>
                                </Col>
                                <Col lg={6} sm={6} xs={12} className="mb-3">
                                    <FormControl fullWidth sx={{ mb: 3 }}>
                                        <Label htmlFor='auth-login-v2-password' error={Boolean(errors.major)}>
                                            Chuyên Ngành
                                        </Label>
                                        <Controller
                                            name='major'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                    disabled={isDisable}
                                                    autoFocus
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    error={Boolean(errors.major)}
                                                />
                                            )}
                                        />
                                        {errors.major && (
                                            <FormHelperText sx={{ color: 'error.main' }}>{errors.major.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Col>
                                <Col lg={6} sm={6} xs={12} className="mb-3">
                                    <FormControl fullWidth sx={{ mb: 3 }}>
                                        <Label htmlFor='auth-login-v2-password' error={Boolean(errors.class)}>
                                            Lớp
                                        </Label>
                                        <Controller
                                            name='class'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                    disabled
                                                    autoFocus
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    error={Boolean(errors.class)}
                                                />
                                            )}
                                        />
                                        {errors.class && (
                                            <FormHelperText sx={{ color: 'error.main' }}>{errors.class.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Col>
                                <Col lg={12} sm={6} xs={12} className="mb-3 d-flex justify-content-end">
                                    {
                                        isDisable ?
                                            <div style={{ backgroundColor: '#1cc4a1'}} className="btn-edit" size='large' variant='contained' type="button" sx={{ mb: 4 }} onClick={() => setIsDisable(false)}>
                                                <div className='btn-text' style={{ backgroundColor: '#1cc4a1'}}>
                                                    Edit
                                                </div>
                                            </div>
                                            : <Button size='large' variant='contained' type="submit" sx={{ mb: 4 }} style={{ backgroundColor: '#1cc4a1'}}>
                                                Save changes
                                            </Button>
                                    }
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </div>

        </div >
    )
}
export default Profile;