import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import WebClient, {toast} from '../utility/WebClient';
import {useSelector} from 'react-redux';
import LikeIcon from '../assets/svg/common/LikeIcon';
import UnLikeIcon from '../assets/svg/common/UnLikeIcon';
import {makeFavoriteType} from '../constants/enum';
import {useIntl} from 'react-intl';

const LikeUnlikeComp = ({
  setClicked,
  tableId,
  typeId,
  isFavorite,
}: {
  tableId: number;
  typeId: number;
  isFavorite: boolean;
  setClicked: any;
}) => {
  const {Post} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const intl = useIntl();

  return (
    <>
      <TouchableOpacity
        className="cursor-pointer"
        onPress={() => {
          if (user) {
            Post('/api/Common/MakeFavorite', {
              userId: user?.id,
              tableId: tableId, // companyid
              typeId: typeId, // enum
              isFavorite: !isFavorite,
            }).then(res => {
              setClicked(true);
            });
          } else {
            toast(
              intl.formatMessage({
                id: 'login_required_warning',
                defaultMessage: 'login_required_warning',
              }),
            );
          }
        }}>
        {isFavorite ? <LikeIcon width={23} height={23} /> : <UnLikeIcon />}
      </TouchableOpacity>
    </>
  );
};

export default LikeUnlikeComp;
