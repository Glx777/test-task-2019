import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import toast from '../../../services/toast'

import { Container, Image, Heading } from '../../../common/styles'

import data from '../../../common/data.json'

const ImagesContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    justify-content: space-between;
    padding-bottom: 20px;

    @media (max-width: 1400px) {
        width: 60%;
    }

    @media (max-width: 800px) {
        width: 98%;
        margin-top: 0;
        flex-flow: column nowrap;
        align-items: center;
    }
`

const Home = ({ history }) => {
    const [carriers, setCarriers] = useState([])

    const fakeRequest = () =>
        new Promise(resolve => {
            resolve(data)
        })

    const getData = async () => {
        try {
            const res = await fakeRequest()

            res && setCarriers(res)
        } catch (e) {
            toast.error(e)
        }
    }

    useMemo(() => getData(), [carriers]) // eslint-disable-line

    const renderCarriers = () =>
        carriers.length &&
        carriers.map((item, index) => (
            <Image
                type={'home'}
                key={index}
                alt={item.name}
                src={item.cover}
                onClick={() =>
                    history.push({
                        pathname: '/refill',
                        state: { carrier: item.name }
                    })
                }
            />
        ))

    return (
        <Container>
            <Heading>Choose your carrier</Heading>
            <ImagesContainer>{renderCarriers()}</ImagesContainer>
        </Container>
    )
}

Home.propTypes = {
    history: PropTypes.object.isRequired
}

export default Home
