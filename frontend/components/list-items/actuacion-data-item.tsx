import { Box, Text } from '@chakra-ui/react';
import { RichText } from '../text/rich-text';
import * as icons from '../icons/stakeholders';
interface ActuacionDataItemProps {
  icon?: string;
  title: string;
  excerpt: string;
}

interface Props {
  dataItem: ActuacionDataItemProps;
  theme?: string;
  i: number;
}

const DefaultIcon = () => <></>;

export const ActuacionDataItem: React.FC<Props> = ({ dataItem, theme }) => {
  const Icon = icons[dataItem.icon as keyof typeof icons] ?? DefaultIcon;

  return (
    <Box listStyleType="none">
      {dataItem?.icon && (
        <Icon
          boxSize={12}
          marginBottom="16px"
          color={`stakeholders.${theme}.dark`}
        />
      )}
      <Text
        color={`stakeholders.${theme}.dark`}
        fontSize={{ base: '40', lg: '60' }}
        lineHeight="60"
        fontWeight="regular"
        marginBottom={{ base: '16px' }}
      >
        <RichText txt={dataItem.title} />
      </Text>
      <Text
        color="meli.black"
        fontSize="18"
        lineHeight="20"
        fontWeight="regular"
        maxW="35ch"
      >
        {dataItem.excerpt}
      </Text>
    </Box>
  );
};
