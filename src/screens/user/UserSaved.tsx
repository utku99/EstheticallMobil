import React, { useEffect, useState } from 'react'
import UserWrapper from './UserWrapper'
import SharingComp from '../../components/SharingComp'
import WebClient from '../../utility/WebClient';
import { useSelector } from 'react-redux';
import HandleData from '../../components/HandleData';
import { FlatList } from 'react-native';

const UserSaved = () => {
    const [userSaved, setUserSaved] = useState<any>([]);
    const { Post, loading } = WebClient()
    const { user } = useSelector((state: any) => state.user)
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        Post("/api/User/UserMySavedShareds", {
            "userID": user?.id
        }).then(res => {
            setUserSaved(res.data)
        })
        setClicked(false)
    }, [clicked])



    return (
        <UserWrapper title='Kaydedilenler'>

            <HandleData data={userSaved} loading={loading} title='Kaydedilen Paylaşım Bulunamadı'>

                <FlatList
                    contentContainerStyle={{ display: "flex", gap: 15, paddingBottom: 20 }}
                    data={userSaved}
                    renderItem={({ item }) => <SharingComp item={item} setClicked={setClicked} readOnly />}

                />
            </HandleData>

        </UserWrapper>
    )
}

export default UserSaved