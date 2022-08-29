import react, { useEffect } from 'react'
import { useState } from 'react';
import { useFormik, validateYupSchema } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const Formik = () => {
    const [initialData, setInitialData] = useState(null)

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(e);
    }

    useEffect(() => {
        axios.get("http://localhost:3001/users/1").then(res => setInitialData(res.data)).catch(err => console.log(err))
    }, [])

    const formik = useFormik({
        initialValues: initialData || {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            gender: "",
        },
        onSubmit: submitHandler,
        // validate: (value) => {
        //     let error = {};
        //     if (!value.name)
        //         error.name = "name empity";
        //     if (!value.email)
        //         error.email = "email empity";
        //     if (!value.password)
        //         error.password = "password empity";

        //     return error;
        // },
        validationSchema: yup.object({
            name: yup.string().required("name required"),
            email: yup.string().required("email required").email("email not falid"),
            password: yup.string().required("passwrod empity!"),
            confirmPassword: yup.string().required("confirm password required").oneOf([yup.ref("password"), null], "password doesnt match"),
            gender: yup.string().required("gender required")
        }),
        validateOnMount: true,
        enableReinitialize: true
    });

    return (
        <form className="form">
            <div className="formControl">
                <label className="label">Name</label>
                <input className="input" type="text" {...formik.getFieldProps("name")} >
                </input>
                <p className='error'>{formik.errors.name && formik.touched.name ? formik.errors.name : ""}</p>
            </div>
            <div className="formControl">
                <label className="label">Email</label>
                <input className="input" type="text"  {...formik.getFieldProps("email")}>
                </input>
                <p className='error'>{formik.errors.email && formik.touched.email ? formik.errors.email : ""}</p>
            </div>
            <div className="formControl">
                <label className="label">password</label>
                <input className="input" type="password" {...formik.getFieldProps("password")}>
                </input>
                <p className='error'>{formik.errors.password && formik.touched.password ? formik.errors.password : ""}</p>
            </div>
            <div className="formControl">
                <label className="label">confirm password</label>
                <input className="input" type="password" {...formik.getFieldProps("confirmPassword")}>
                </input>
                <p className='error'>{formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : ""}</p>
            </div>
            <div className="formControl-radio">
                <input type="radio" id="male" name='gender' value='male' onChange={formik.handleChange} checked={formik.values.gender === "male"}></input>
                <label htmlFor='male'>Male</label>
                <input type="radio" id="Fimale" name='gender' value='fimale' onChange={formik.handleChange} checked={formik.values.gender === "fimale"}></input>
                <label htmlFor='Fimale'>Fimale</label>
                <p className='error'>{formik.errors.gender && formik.touched.gender ? formik.errors.gender : ""}</p>
            </div>
            <button className="submitBtn" disabled={!formik.isValid}>submit</button>
        </form>
    );
}

export default Formik;








// useState :      (initialState) => 1.state 2.setState
// useReducer =>    (reducer(state,action),intialState) => 1.state 2.dipatcher

