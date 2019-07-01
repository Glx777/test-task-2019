import styled from 'styled-components'

export const Container = styled.form`
    display: flex;
    flex-flow: column;
    align-items: ${props => (props.type === 'refill' ? 'center': 'stretch')};
`

export const Heading = styled.p`
    font-size: 60px;
    font-family: 'Poppins', sans-serif;
    color: #222;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: ${props => (props.type === 'refill' ? '40px': '0')};

    @media (max-width: 800px) {
        font-size: 40pt;
        text-align: center;
    }

    @media (max-width: 600px) {
        margin: ${props => (props.type === 'refill' ? '10px 0' : '0')};
    }
`

export const Image = styled.img`
    border-radius: 8px;
    width: 150px;
    height: 150px;
    cursor: ${props => (props.type === 'home' ? 'pointer' : 'default')};
    margin-bottom: ${props => (props.type === 'refill' ? '40px' : '0')};

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