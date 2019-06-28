import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MaskedInput from 'react-text-mask'
import PropTypes from 'prop-types'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { isEmpty } from 'lodash'

import toast from '../../../services/toast'

import data from '../../../common/data.json'

const Container = styled.form`
    display: flex;
    flex-flow: column;
    align-items: center;
`

const Heading = styled.p`
    font-size: 60pt;
    font-family: 'Poppins', sans-serif;
    color: #222;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 40px;

    @media (max-width: 800px) {
        font-size: 40pt;
        text-align: center;
    }

    @media (max-width: 600px) {
        margin: 10px 0;
    }
`

const Image = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 8px;
    margin-bottom: 40px;

    @media (max-width: 800px) {
        margin-top: 20px;
        width: 400px;
        height: 350px;
    }

    @media (max-width: 600px) {
        width: 350px;
        height: 300px;
    }

    @media (max-width: 400px) {
        width: 250px;
        height: 250px;
    }

`

const Row = styled.div`
    display: flex;
    flex-flow: row nowrap;
    width: 25%;
    margin-top: 10px;

    @media (max-width: 1250px) {
        width: 35%;
    }

    @media (max-width: 1000px) {
        width: 65%;
    }

    @media (max-width: 800px) {
        flex-flow: column nowrap;
    }

    @media (max-width: 600px) {
        width: 98%;
    }
`

const Label = styled.label`
    flex: 1;
    font-family: 'Poppins', sans-serif;
    color: #222;
    font-size: 14pt;

    @media (max-width: 800px) {
        font-size: 18pt;
    }
`

const Input = styled(MaskedInput)`
    flex: 1;
    font-family: 'Poppins', sans-serif;
    color: #222;
    border-radius: 5px;
    border: 1px solid silver;
    padding: 0 6px;
    font-size: 10pt;

    @media (max-width: 800px) {
        font-size: 14pt;
        padding: 10px 16px;
    }
`

const ErrorMessage = styled.div`
    font-family: 'Poppins', sans-serif;
    color: #ff0000;
`

const SubmitButton = styled.button`
    border: 1px solid #222;
    border-radius: 5px;
    margin: 10px 0;
    padding: 10px 25px;
    font-size: 14pt;
    font-family: 'Poppins', sans-serif;
    color: #222;
    cursor: pointer;
    background: transparent;

    @media (max-width: 600px) {
        width: 98%;
    }
`

const mask = [
    '+',
    '7',
    ' ',
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/
]

const Refill = ({
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    history
}) => {
    const [carriers, setCarriers] = useState([])

    const carrier = history.location.state.carrier

    const fakeRequest = () => {
        const randomValue = Math.floor(Math.random() * Math.floor(2))

        return new Promise((resolve, reject) => {
            if (randomValue) resolve('Success!')

            reject('Failure')
        })
    }

    const getCoverRequest = () =>
        new Promise(resolve => {
            resolve(data)
        })

    const getCover = async () => {
        try {
            const res = await getCoverRequest()

            res && res.length && setCarriers(res)
        } catch (e) {
            toast.error(e)
        }
    }

    const getCarrier = () => {
        const cover = carriers.filter(item => item.name === carrier)

        return cover && cover.length && cover[0].cover
    }

    const onSubmit = async e => {
        e.preventDefault()

        handleSubmit && handleSubmit(e)

        if (isEmpty(errors) && !isEmpty(touched)) {
            try {
                const res = await fakeRequest()

                if (res) {
                    toast.success(res)
                    history.push('/')
                }
            } catch (e) {
                toast.error(e)
            }
        }
    }

    useEffect(() => {
        getCover()
    })

    return (
        <Container onSubmit={onSubmit}>
            <Heading>Refill</Heading>
            <Image alt={carrier} src={getCarrier()} />
            <Row>
                {' '}
                <Label>Phone Number:</Label>
                <Input
                    mask={mask}
                    id="phone"
                    type="tel"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                />
            </Row>
            <Row>
                {errors && errors.phone && touched && touched.phone && (
                    <ErrorMessage>{errors.phone}</ErrorMessage>
                )}
            </Row>
            <Row>
                {' '}
                <Label>Amount:</Label>
                <Input
                    id="amount"
                    type="tel"
                    mask={createNumberMask({ prefix: '', suffix: ' ₽' })}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount}
                />
            </Row>
            <Row>
                {errors && errors.amount && touched && touched.amount && (
                    <ErrorMessage>{errors.amount}</ErrorMessage>
                )}
            </Row>
            <SubmitButton type="submit">Submit</SubmitButton>
        </Container>
    )
}

Refill.propTypes = {
    history: PropTypes.object.isRequired,
    errors: PropTypes.object,
    touched: PropTypes.object,
    values: PropTypes.object,
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func
}

Refill.defaultProps = {
    errors: {},
    touched: {},
    values: {},
    handleBlur: () => {},
    handleChange: () => {},
    handleSubmit: () => {}
}

export default Refill
