import { useQuasar } from 'quasar';

export function useConfirmation() {
  const $q = useQuasar();
  
  const confirm = async (message: string, title = 'Confirmar'): Promise<boolean> => {
    return new Promise((resolve) => {
      $q.dialog({
        title,
        message,
        cancel: true,
        persistent: true
      }).onOk(() => resolve(true))
        .onCancel(() => resolve(false))
        .onDismiss(() => resolve(false));
    });
  };
  
  return { confirm };
}