
export const makeFavoriteType = {
    "doktor": 1,
    "company": 2,
    "office": 3
}

export const appointmentState = {
    "waiting": 1, //
    "feepaid": 2,
    "declined": 3,
    "aprroved": 4, //
    "completed": 5, //
    "failed": 6,
}

export const genderData = [
    { value: 0, label: "Erkek" },
    { value: 1, label: "Kadın" }
]

export const legalTextType = {
    "ABOUT": 1,
    "PRIVACYANDTERMSOFUSE": 2,
    "IndividualMembershipAgreement": 3,
    "CorporateMembershipAgreement": 4,
    "EXPRESSCONSENTTEXT": 5, //açık rıza
    "DISCLOSURETEXTANDCOOKIEPOLICY": 6, //aydınlatma metni ve çerez
    "DISTANCESERVICESALESAGREEMENT": 7, //mesafeli hizmet satış 
}

export const messageTypeEnum ={
    user:1,
    company:2,
    office:3,
}

export const messageEnum ={
    appointment:1,
    offer:2,
    package:3,
    general:4,
}

export const companyType = {
    hospital: 1,
    beauty_center: 2,
    clinic: 3,
    doctor: 4,
}
