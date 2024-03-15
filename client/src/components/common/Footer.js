import { useState } from 'react';
import './css/Footer.css'
import api from '../api/api';

const Footer = () => {
    const [email, setEmail] = useState('')
    const [submitError, setSubmitError] = useState(false);
    const [ isValidated, setIsValidated ] = useState('')

    const submitEmail = async (email) => {
        setIsValidated('was-validated')
        if (email.length > 0) {
            await api.post('http://localhost:3001/newsletter/subscribe', { email: email })
                .then(response => {
                    if (response.status===200) {
                        alert("Thank you for subscribing to our news letter\nYou will get important updates and latest bidding via email");
                        setEmail('');
                    }
                    else {
                        setSubmitError(true);
                    }
                })
                .catch(err => {
                    setSubmitError(true);
                })
        }
        else {
            setSubmitError(true);
        }
    }

    return (
        <div className="container-fluid align-items-center d-flex justify-content-center" style={{paddingTop:"30px", marginTop:'30px',backgroundColor:'rgb(240,240,240)'}}>
            <form className={`form-group w-25 text-start ${isValidated}`}>
                <h4 className='form-label' htmlFor='subscribe'>Subscribe to news letter</h4>
                <input placeholder="Email" id='subscribe' type="email" className={`form-control mb-2`} required onChange={(e) => { setEmail(e.target.value); setSubmitError(false); }}></input>
                <button className='btn btn-outline-success btn-sm' type='button' onClick={() => submitEmail(email)}>Submit</button>
                {
                    submitError ? (
                        <p style={{ color: 'red' }}>Error while submiting your email, check your email</p>
                    ) : (
                        <p></p>
                    )
                }
            </form>
        </div>
    )
}

export default Footer;