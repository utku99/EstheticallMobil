import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import CustomInputs from './CustomInputs'
import ModalWrapper from './ModalWrapper'

interface props {
    value: boolean,
    onChange: any,
    type: "auth" | "question",
    error?: any
}

const LegalTextComp = ({ value, onChange, type, error }: props) => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            {
                type == "auth" &&
                <View className='mb-3'>
                    <View className='flex-row space-x-2'>
                        <CustomInputs type='checkbox' value={value} onChange={onChange} />

                        <Text className='text-sm font-poppins text-customGray flex-shrink'>
                            <Text onPress={() => setVisible(true)} className='text-customOrange'>Gizlilik ve Kullanım Koşulları </Text>
                            ile
                            <Text onPress={() => setVisible(true)} className='text-customOrange'> Bireysel Üyelik Sözleşmesini </Text>
                            kabul ediyorum.
                        </Text>

                        <ModalWrapper visible={visible} setVisible={setVisible} title={"Gizlilik Ve Kullanım Koşulları"}>
                            <Text className='text-sm font-normal text-customGray font-poppins'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus vel tempore animi mollitia cum est velit, fugit earum expedita, excepturi reprehenderit sunt doloribus voluptates nemo? Facere, optio nobis ipsa voluptatibus labore aut. Repellat eaque cumque sed nemo nesciunt aliquid voluptate, odio assumenda totam atque possimus ipsam sapiente corporis eligendi neque hic voluptas ut blanditiis ipsa veniam maiores delectus! Error laborum voluptatum placeat et, ducimus ut veniam culpa? Veritatis rerum quibusdam laboriosam nobis tempora id perferendis explicabo odit unde vel fugiat odio, quas neque atque ducimus nam ullam velit, officia alias eaque aut sed officiis laborum. Libero recusandae tenetur eligendi voluptates non suscipit quibusdam hic perspiciatis fugit porro. Excepturi repellat soluta quod libero odio obcaecati saepe dolorum nam? Architecto impedit doloribus sapiente obcaecati eveniet, voluptatem cumque eos laudantium consequatur omnis itaque unde nesciunt. Fuga labore nulla deleniti ipsam. Deserunt doloremque esse quas deleniti atque repellendus officia rem non dolore temporibus. Exercitationem debitis libero architecto eius magnam facilis. Nihil maiores ut cum deleniti, culpa cupiditate vitae laborum blanditiis deserunt illum hic neque velit consectetur dolorem! Tempora nemo, quaerat magni, repudiandae sed, deleniti ducimus iure quo vero labore nam error excepturi fugiat veritatis quas? Nihil inventore, dolore, esse dicta tempora nesciunt odit magnam tempore, repudiandae voluptates nemo. Animi veritatis quis saepe ea amet molestiae qui nostrum! Natus, recusandae ipsum enim veritatis, fuga consectetur sequi, laboriosam fugiat mollitia dicta maxime rerum ex illo! Laudantium ullam corporis voluptatibus! Esse corrupti cum at magni fugit reprehenderit neque distinctio itaque. Architecto veniam necessitatibus temporibus ducimus laborum? Suscipit nisi iste totam ratione nostrum, vitae fugiat sequi voluptatum, cupiditate non itaque vero at cum deserunt illum officia rem quibusdam, accusantium minima veritatis tenetur. Veritatis dignissimos natus quasi. Nihil voluptatum pariatur possimus impedit amet ducimus quis distinctio cum in explicabo laboriosam optio quo ex maxime, sunt aspernatur nulla laudantium ullam.</Text>
                        </ModalWrapper>
                    </View>
                    {error && <Text className='text-red-400 text-xs '> {error?.message}</Text>}
                </View>

            }

            {
                type == "question" &&
                <View className='mb-3'>
                    <View className='flex-row space-x-2'>
                        <CustomInputs type='checkbox' value={value} onChange={onChange} />

                        <Text className='text-sm font-poppins text-customGray flex-shrink'>
                            Doktorlara sorumu sorarak
                            <Text onPress={() => setVisible(true)} className='text-customOrange'> özel nitelikli kişisel veri açık rıza metnini </Text>
                            okuyup onayladığımı kabul ederim.
                        </Text>

                        <ModalWrapper visible={visible} setVisible={setVisible} title={"Özel Nitelikli Kişisel Veri Açık Rıza Metni"}>
                            <Text className='text-sm font-normal text-customGray font-poppins'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus vel tempore animi mollitia cum est velit, fugit earum expedita, excepturi reprehenderit sunt doloribus voluptates nemo? Facere, optio nobis ipsa voluptatibus labore aut. Repellat eaque cumque sed nemo nesciunt aliquid voluptate, odio assumenda totam atque possimus ipsam sapiente corporis eligendi neque hic voluptas ut blanditiis ipsa veniam maiores delectus! Error laborum voluptatum placeat et, ducimus ut veniam culpa? Veritatis rerum quibusdam laboriosam nobis tempora id perferendis explicabo odit unde vel fugiat odio, quas neque atque ducimus nam ullam velit, officia alias eaque aut sed officiis laborum. Libero recusandae tenetur eligendi voluptates non suscipit quibusdam hic perspiciatis fugit porro. Excepturi repellat soluta quod libero odio obcaecati saepe dolorum nam? Architecto impedit doloribus sapiente obcaecati eveniet, voluptatem cumque eos laudantium consequatur omnis itaque unde nesciunt. Fuga labore nulla deleniti ipsam. Deserunt doloremque esse quas deleniti atque repellendus officia rem non dolore temporibus. Exercitationem debitis libero architecto eius magnam facilis. Nihil maiores ut cum deleniti, culpa cupiditate vitae laborum blanditiis deserunt illum hic neque velit consectetur dolorem! Tempora nemo, quaerat magni, repudiandae sed, deleniti ducimus iure quo vero labore nam error excepturi fugiat veritatis quas? Nihil inventore, dolore, esse dicta tempora nesciunt odit magnam tempore, repudiandae voluptates nemo. Animi veritatis quis saepe ea amet molestiae qui nostrum! Natus, recusandae ipsum enim veritatis, fuga consectetur sequi, laboriosam fugiat mollitia dicta maxime rerum ex illo! Laudantium ullam corporis voluptatibus! Esse corrupti cum at magni fugit reprehenderit neque distinctio itaque. Architecto veniam necessitatibus temporibus ducimus laborum? Suscipit nisi iste totam ratione nostrum, vitae fugiat sequi voluptatum, cupiditate non itaque vero at cum deserunt illum officia rem quibusdam, accusantium minima veritatis tenetur. Veritatis dignissimos natus quasi. Nihil voluptatum pariatur possimus impedit amet ducimus quis distinctio cum in explicabo laboriosam optio quo ex maxime, sunt aspernatur nulla laudantium ullam.</Text>
                        </ModalWrapper>
                    </View>
                    {error && <Text className='text-red-400 text-xs '> {error?.message}</Text>}
                </View>
            }
        </>



    )
}

export default LegalTextComp