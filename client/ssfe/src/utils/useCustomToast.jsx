import { useToast } from '@chakra-ui/react';
const useCustomToast = () => {
  const toast = useToast();

  const showToast = ({ title, status, duration = 5000, isClosable = true }) => {
    return toast({
      title,
      status,
      duration,
      isClosable,
    });
  };

  const updateToast = (toastId, { title, status, duration = 5000, isClosable = true }) => {
    toast.update(toastId, {
      title,
      status,
      duration,
      isClosable,
    });
  };

  return { showToast, updateToast };
};

export default useCustomToast;
