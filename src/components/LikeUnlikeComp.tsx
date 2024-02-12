import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import WebClient from '../utility/WebClient'
import { useSelector } from 'react-redux'
import LikeIcon from '../assets/svg/common/LikeIcon'
import UnLikeIcon from '../assets/svg/common/UnLikeIcon'
import { makeFavoriteType } from '../constants/enum'

const LikeUnlikeComp = ({ setClicked, readOnly = false, item, isFavorite }: { setClicked?: any, readOnly?: boolean, item: any, isFavorite: boolean }) => {

    const { Post } = WebClient()
    const { user } = useSelector((state: any) => state.user)

    const handleTableId = () => {
        if (item?.doctorId) {
            return item?.doctorId
        } else {
            if ((item?.companyOfficeId ?? item?.companyOfficeID) == 0) {
                return item?.companyId ?? item?.companyID
            } else {
                return item?.companyOfficeId ?? item?.companyOfficeID
            }
        }
    }

    const handleTypeId = () => {
        if (item?.doctorId) {
            return makeFavoriteType.doktor
        } else {
            if ((item?.companyOfficeId ?? item?.companyOfficeID) == 0) {
                return makeFavoriteType.company
            } else {
                return makeFavoriteType.office
            }
        }
    }


    return (
        <>
            {
                readOnly ?
                    <View>
                        {isFavorite ? <LikeIcon /> : <UnLikeIcon />}
                    </View>
                    :
                    <TouchableOpacity className="cursor-pointer" onPress={() => {
                        Post("/api/Common/MakeFavorite", {
                            "userId": user?.id,
                            "tableId": handleTableId(), // institution id
                            "typeId": handleTypeId(), // enum 
                            "isFavorite": !isFavorite
                        }).then(res => {
                            setClicked(true)
                        })
                    }}>
                        {isFavorite ? <LikeIcon width={23} height={23} /> : <UnLikeIcon />}
                    </TouchableOpacity>
            }
        </>
    )
}

export default LikeUnlikeComp