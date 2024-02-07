import React from 'react'
import UserWrapper from './UserWrapper'
import DoctorComp from '../../components/DoctorComp'

const UserFavorite = () => {
    return (
        <UserWrapper title='Favoriler'>
            <DoctorComp />
            <DoctorComp />
        </UserWrapper>
    )
}

export default UserFavorite