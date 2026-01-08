import React from 'react'
import { Helmet } from 'react-helmet-async'

const Title = ({ title, description = "This is a chat app call chattuuuuuuuu" }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    )
}

export default Title
