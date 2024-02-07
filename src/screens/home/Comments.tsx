import { FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeWrapper from './HomeWrapper'
import CommentToCompanyComp from '../../components/CommentToCompanyComp'
import WebClient from '../../utility/WebClient'
import { useSelector } from 'react-redux'
import HandleData from '../../components/HandleData'





const Comments = () => {
    const { Post, loading } = WebClient()
    const { user } = useSelector((state: any) => state.user)
    const { country, city, town, institution, operation, suboperation, listFilters } = useSelector(state => state.filter)

    const [comments, setComments] = useState<any>([])

    useEffect(() => {
        Post("/api/Comment/GetCommentListAsync", {
            "countryId": country?.value ?? 0,
            "cityId": city?.value ?? 0,
            "townId": town?.value ?? 0,
            "companyType": institution?.value ?? 0,
            "serviceId": operation?.value ?? 0,
            "serviceSubId": suboperation?.value ?? 0,
            "languageID": 1,
            "userId": user?.id ?? 0
        }).then((res: any) => {
            setComments(res.data)
        })


    }, [listFilters])


    return (
        <HomeWrapper>

            <HandleData data={comments} loading={loading} title='Aranan Kategoride Yorum Bulunamadı'>

                <FlatList
                    contentContainerStyle={{ display: "flex", gap: 15, paddingBottom: 20 }}
                    data={comments}
                    renderItem={({ item }) => <CommentToCompanyComp item={item} />}

                />
            </HandleData>

        </HomeWrapper>
    )
}

export default Comments