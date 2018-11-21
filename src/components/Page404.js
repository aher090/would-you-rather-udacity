import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Page404 = () => {
    return(
            <div className="page-404">
                <Link to='/home' className="link">Go to home</Link>
            </div>
    )
}

export default Page404

