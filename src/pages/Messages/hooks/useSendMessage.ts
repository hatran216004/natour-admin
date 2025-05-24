import { useMutation } from '@tanstack/react-query';
import { apiMessages } from '../../../services/message.api';

function useSendMessage() {
  const { mutate, isPending } = useMutation({
    mutationFn: apiMessages.sendMessage
  });
  return { sendMessage: mutate, isPending };
}

export default useSendMessage;
