import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import toast from '../../../services/toast'

import data from '../../../common/data.json'

const Container = styled.div`
    display: flex;
    flex-flow: column wrap;
`

const Heading = styled.p`
    font-size: 60px;
    font-family: 'Poppins', sans-serif;
    color: #222;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 800px) {
        font-size: 40pt;
        text-align: center;
    }
`

const ImagesContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    justify-content: space-between;
    padding-bottom: 20px;
    border: 1px solid red;

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

const Image = styled.img`
    border-radius: 8px;
    width: 150px;
    height: 150px;
    cursor: pointer;

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

const Home = ({ history }) => {
    const [carriers, setCarriers] = useState([])

    const fakeRequest = () =>
        new Promise(resolve => {
            resolve(data)
        })

    const getData = async () => {
        try {
            const res = await fakeRequest()

            setCarriers(res)
        } catch (e) {
            toast.error(e)
        }
    }

    useEffect(() => {
        getData()
    })

    const renderCarriers = () =>
        carriers.length &&
        carriers.map((item, index) => (
            <Image
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
