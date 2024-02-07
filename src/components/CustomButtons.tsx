import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LocationIcon from '../assets/svg/homepages/LocationIcon'
import SendIcon from '../assets/svg/firm/SendIcon'
import QuestionIcon from '../assets/svg/firm/QuestionIcon'



interface props {
    type: "solid" | "outlined" | "iconsolid" | "iconoutlined" | "brownsolid" | "brownoutlined",
    label: string,
    style?: any
    onPress?: any
    theme?: "big" | "middle" | "small"
    icon?: "location" | "send" | "question"
}



const CustomButtons: React.FC<props> = ({ type, label, onPress, theme = "middle", icon, style }) => {

    const handleIcon = () => {
        if (icon == "location") {
            if (type == "iconsolid") return <LocationIcon fill={"white"} />
            else if (type == "iconoutlined") return <LocationIcon fill={"#FF8170"} />
        }
        else if (icon == "send") {
            if (type == "iconsolid") return <SendIcon fill={"white"} />
            else if (type == "iconoutlined") return <SendIcon fill={"#FF8170"} />
        }
        else if (icon == "question") return <QuestionIcon />
    }

    const handleSize = () => {
        if (theme == "big") return "h-[46px]"
        else if (theme == "middle") return "h-[32px]"
        else if (theme == "small") return "h-[19px]"
    }

    const handleFontSize = () => {
        if (theme == "big") return "text-lg"
        else if (theme == "middle") return "text-xs"
        else if (theme == "small") return "text-xxs"
    }


    return (
        <>
            {type == "solid" && (
                <TouchableOpacity onPress={onPress} style={style} className={`bg-customOrange ${handleSize()}  rounded-lg items-center justify-center px-4 `}>
                    <Text className={`font-medium text-white ${handleFontSize()}   font-poppins`}>{label}</Text>
                </TouchableOpacity>
            )}
            {type == "outlined" && (
                <TouchableOpacity onPress={onPress} style={style} className={`bg-white border border-customOrange  ${handleSize()}   rounded-lg items-center justify-center  px-4 `}>
                    <Text className={`font-medium text-customGray  ${handleFontSize()}   font-poppins`}>{label}</Text>
                </TouchableOpacity>
            )}
            {type == "iconsolid" && (
                <TouchableOpacity onPress={onPress} style={style} className={`bg-customOrange  ${handleSize()}  rounded-lg items-center justify-center px-4  flex-row  space-x-2`}>
                    {handleIcon()}
                    <Text className={`font-medium text-white  ${handleFontSize()}    font-poppins`}>{label}</Text>
                </TouchableOpacity>
            )}
            {type == "iconoutlined" && (
                <TouchableOpacity onPress={onPress} style={style} className={`bg-white border border-customOrange  ${handleSize()}  rounded-lg justify-center  px-4  flex-row items-center space-x-2`}>
                    {handleIcon()}
                    <Text className={`font-medium text-customGray  ${handleFontSize()}    font-poppins`}>{label}</Text>
                </TouchableOpacity>
            )}
            {type == "brownsolid" && (
                <TouchableOpacity onPress={onPress} style={style} className={`bg-customBrown  ${handleSize()}   rounded-lg items-center justify-center px-4 `}>
                    <Text className={`font-semibold text-white  ${handleFontSize()}   font-poppins`}>{label}</Text>
                </TouchableOpacity>
            )}
            {type == "brownoutlined" && (
                <TouchableOpacity onPress={onPress} style={style} className={`bg-white border border-customBrown  ${handleSize()}   rounded-lg items-center justify-center  px-4 `}>
                    <Text className={`font-semibold text-customBrown  ${handleFontSize()}    font-poppins`}>{label}</Text>
                </TouchableOpacity>
            )}
        </>
    )
}

export default CustomButtons