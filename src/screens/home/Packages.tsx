import { View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HandleData from '../../components/HandleData'
import WebClient from '../../utility/WebClient'
import { useSelector } from 'react-redux'
import PackageComp from '../../components/PackageComp'
import { Modal } from 'react-native-paper'
import FitlerIcon from '../../assets/svg/homepages/FitlerIcon'
import CustomInputs from '../../components/CustomInputs'
import CustomButtons from '../../components/CustomButtons'



const Packages = () => {

    const { Post, loading } = WebClient()
    const [packages, setPackages] = useState<any>([])
    const { user } = useSelector((state: any) => state.user)

    const [country, setCountry] = useState<any>(null)
    const [city, setCity] = useState<any>(null)
    const [town, setTown] = useState<any>(null)
    const [institution, setInstitution] = useState<any>(null)
    const [operation, setOperation] = useState<any>(null)
    const [suboperation, setSuboperation] = useState<any>(null)

    const [clickedLike, setClickedLike] = useState(false)

    const [clicked, setClicked] = useState(false)
    const [visible, setVisible] = useState(false)
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [towns, setTowns] = useState([]);

    const institutionData = [{ value: 1, label: "Hastane" }, { value: 4, label: "Doktor" }, { value: 2, label: "Güzellik Merkezi" }, { value: 3, label: "Klinik" }]
    const [services, setServices] = useState<any>([])
    const [serviceSubs, setServiceSubs] = useState<any>([])


    useEffect(() => {


        Post("/api/Common/GetCountriesAsync", {}).then(res => {
            const countries = res.data.map((item: any) => ({
                value: item.countryID,
                label: item.countryName
            }));
            setCountries(countries);
        }).finally(() => {
            getCities()
        })

        const getCities = () => {
            Post("/api/Common/GetCitiesAsync", {
                "countryID": country?.value
            }).then(res => {
                const cities = res.data.map((item: any) => ({
                    value: item.cityID,
                    label: item.name
                }));
                setCities(cities);
            }).finally(() => {
                getTown()
            })
        }

        const getTown = () => {
            Post("/api/Common/GetTownsAsync", {
                "cityID": city?.value
            }).then(res => {
                const towns = res.data.map((item: any) => ({
                    value: item.townID,
                    label: item.name
                }));
                setTowns(towns);
            })
        }


        Post("/api/Service/GetAllServices", {
        }).then((res: any) => {
            let temp = res.data
            temp.unshift({ value: 0, label: "Tümü" })
            setServices(temp);
        }).finally(() => {
            Post("/api/Service/GetSubServicesByService", {
                "serviceId": operation?.value
            }).then(res => {
                let temp = res.data
                temp.unshift({ value: 0, label: "Tümü" })
                setServiceSubs(temp);
            })
        })


    }, [])

    useEffect(() => {
        Post("/api/Package/GetPackagesListAsync", {
            "countryId": country?.value ?? 0,
            "cityId": city?.value ?? 0,
            "townId": town?.value ?? 0,
            "companyType": institution?.value ?? 0,
            "serviceId": operation?.value ?? 0,
            "serviceSubId": suboperation?.value ?? 0,
            "languageID": 1,
            "userID": user?.id ?? 0
        }).then((res: any) => {
            let temp = res.data.map((item: any) => ({ images: item.images.unshift(item.packageDisplayImage), ...item }));
            setPackages(temp)
        })

        setClicked(false)
        setClickedLike(false)
    }, [clicked, clickedLike])



    return (
        <View className='bg-[#FAFAFA] flex-1 relative'>

            <TouchableOpacity className='absolute left-2 top-2 z-50' onPress={() => setVisible(true)}>
                <FitlerIcon />
            </TouchableOpacity>

            <HandleData data={packages} loading={loading} title='Aranan Kategoride Paket Bulunamadı'>

                <FlatList
                    contentContainerStyle={{ display: "flex", gap: 15, paddingBottom: 20, paddingVertical: 15, alignItems: "center" }}
                    data={packages}
                    renderItem={({ item }) =>
                        <PackageComp key={item.packageID} item={item} onClickable setClicked={setClickedLike} />
                    }
                />

            </HandleData>


            <Modal
                visible={visible}
                onDismiss={() => setVisible(false)}
                style={{ justifyContent: "flex-start" }}
                contentContainerStyle={{ padding: 30, backgroundColor: "white", width: "70%", top: 50, borderRadius: 10, marginLeft: "3%", justifyContent: "space-evenly" }}>

                {!country && <CustomInputs type='dropdown' value={country} dropdownData={countries} placeholder='Ülke Seç' isSearchable onChange={(e: any) => setCountry(e)} />}
                {country && !city && <CustomInputs type='dropdown' value={city} dropdownData={cities} placeholder='Şehir Seç' isSearchable onChange={(e: any) => setCity(e)} />}
                {city && <CustomInputs type='dropdown' value={town} dropdownData={towns} placeholder='İl Seç' isSearchable onChange={(e: any) => setTown(e)} />}

                <CustomInputs type='dropdown' value={institution} dropdownData={institutionData} placeholder='Hizmet Veren Seç' onChange={(e: any) => setInstitution(e)} />

                {!operation && <CustomInputs type='dropdown' value={operation} dropdownData={services} placeholder='Operasyon Seç' isSearchable onChange={(e: any) => setOperation(e)} />}
                {operation && <CustomInputs type='dropdown' value={suboperation} dropdownData={serviceSubs} placeholder='Alt Operasyon Seç' isSearchable onChange={(e: any) => setSuboperation(e)} />}

                <View className='flex-row  justify-between'>
                    <CustomButtons type='solid' label='Listele' theme='middle' style={{ width: 90 }} onPress={() => { setClicked(true); setVisible(false) }} />
                    <CustomButtons type='outlined' label='Sıfırla' theme='middle' style={{ width: 90 }}
                        onPress={() => {
                            setClicked(true)
                            setCountry(null)
                            setCity(null)
                            setTown(null)
                            setInstitution(null)
                            setOperation(null)
                            setSuboperation(null)
                            setVisible(false)
                        }}
                    />
                </View>

            </Modal>

        </View>
    )
}

export default Packages