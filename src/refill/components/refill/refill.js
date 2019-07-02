import React, { useMemo } from 'react'
import styled from 'styled-components'
import MaskedInput from 'react-text-mask'
import PropTypes from 'prop-types'

import { Container, Image, Heading } from '../../../common/styles'
import { phoneMask, priceMask } from '../../../common/inputMasks'

import { useData } from '../../hooks'

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

const Refill = ({
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    history
}) => {
    const carrier =
        history.location.state && history.location.state.carrier
            ? history.location.state.carrier
            : 'mts'
    const type = 'refill'
    const data = useData()

    const image = useMemo(() => {
        const cover = data.filter(item => item.name === carrier)

        return cover && cover.length && cover[0].cover
    }, [data, carrier])

    return (
        <Container type={type} onSubmit={handleSubmit}>
            <Heading type={type}>Refill</Heading>
            <Image type={type} alt={carrier} src={image} />
            <Row>
                {' '}
                <Label>Phone Number:</Label>
                <Input
                    mask={phoneMask}
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
                    mask={priceMask}
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
