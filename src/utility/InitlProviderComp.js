import React, { useEffect, useState } from 'react'
import { IntlProvider } from "react-intl"
import { useDispatch, useSelector } from 'react-redux'
import WebClient from './WebClient'
import { setLanguage, setLanguages } from '../redux/slices/user'



const InitlProviderComp = ({ children }) => {
    const [appParameter, setAppParameter] = useState()
    const { language } = useSelector((state) => state.user);
    const { Post } = WebClient()
    const dispatch = useDispatch()

    useEffect(() => {
        const func = async () => {
            await Post("/api/Language/Languages", {}).then(res => {
                if (res.data.code === "100"  ) {
                    let temp1 = res.data.object.map(item=>(
                        {...item,
                        value:item.id,
                        label:item.language_code,
                        type: item.flag_code == "tr" ? 1 : 2,
                        }
                    ))
                    let temp2 = res.data.object.find(item => language?.id== item.id)
                    setAppParameter(JSON.parse(temp2.app_translates))
                    dispatch(setLanguages(temp1))
                }
                if(!language){
                    dispatch(setLanguage(temp2.find(item=>item.type==1)))
                }
            })
        }
        func()
    }, [language])



    return (
        <IntlProvider locale={language?.flag_code ?? "tr"} messages={appParameter} defaultLocale='tr' >
            {children}
        </IntlProvider>
    )
}

export default InitlProviderComp
