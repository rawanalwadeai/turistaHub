import React, { useState } from 'react'
import { Container, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/payment.css'


import payment from '../assets/images/payment-icon.jpg'
import userIcon from '../assets/images/user.png'
import { useNavigate, useParams } from 'react-router-dom'

import { BASE_URL } from '../utils/configB'
import { toast } from 'react-toastify'



const Payment = () => {

const [cardDetails , setCardDetails] = useState({
    bankNum:undefined,
    bankName:undefined,
    expiredDate:undefined,
    cvv:undefined

})



const {type , id} = useParams()
const handleChange = e => {
    setCardDetails(prev => ({ ...prev , [e.target.id]: e.target.value }))

}


    const navigate =useNavigate()

    const handleClick = async e => {
        e.preventDefault(); 

        try{
const res = await fetch(`${BASE_URL}/payment/${type}/${id}/payment` , {

    method:'put',
    headers:{
    'content-type' : 'application/json'
  },

  
})


const result = await res.json()


if(!res.ok){toast.error(result.message)
  return; 
        }
    
                navigate('/thank-you')

    }
        
        catch(err){
toast.error(err.message);
        }







    } 


    return (
        <>

            <section>
                <Container>
                    <Col lg='8' className='m-auto'>
                        <div className='payment__container d-flex justify-content-between' >

                            <div className='payment__img'>
                                <img src={payment} alt='payment' />
                            </div>



                            <div className='pay__form'>
                                <div className='user'>
                                    <img src={userIcon} alt='' />
                                </div>



                                <h2>Payment</h2>
                                <Form onSubmit={handleClick}>
                                    <FormGroup>
                                        <input type='number' id='bankNum' required placeholder='Bank Card' onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup >
                                        <input type='text' id='bankName' required placeholder='Cart Name'  onChange={handleChange}/>
                                    </FormGroup>
                                    <FormGroup >
                                        <input type='date' id='expiredDate' required placeholder='Expired Date'  onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup >
                                        <input type='number' id='cvv' required placeholder='Cvv'  onChange={handleChange} />
                                    </FormGroup>

<Button className='btn secondary__btn auth__btn' type='submit'>Submit</Button>

                                </Form>
                            </div>



                        </div>
                    </Col>
                </Container>
            </section>



        </>
    )
}

export default Payment