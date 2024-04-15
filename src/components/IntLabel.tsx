import {useIntl} from 'react-intl';

const IntLabel = (message: string) => {
  const intl = useIntl();
  return intl.formatMessage({id: message, defaultMessage: message});
};

export default IntLabel;
