/* eslint-disable react/prop-types */
import { Button, Flex, Text } from '@chakra-ui/react';

const IconBtn = (
  {text,
  onClick,
  children,
  disabled,
  outline = false,
  customClasses,
  type}
) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center ${outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"} cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
      type={type}
    >
      {children ? (
        <Flex align="center">
          <Text className={`${outline && "text-yellow-50"}`}>{text}</Text>
          {children}
        </Flex>
      ) : (
        text
      )}
    </Button>
  );
};

export default IconBtn;
