import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Container, Image, Heading } from '../../../common/styles'

import { useData } from '../../hooks'

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
    const data = useData()

    return (
        <Container>
            <Heading>Choose your carrier</Heading>
            <ImagesContainer>
                {data.length &&
                    data.map((item, index) => (
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
                    ))}
            </ImagesContainer>
        </Container>
    )
}

Home.propTypes = {
    history: PropTypes.object.isRequired
}

export default Home
