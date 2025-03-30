import {  type AxiosError } from "axios";
import { useQuasar } from "quasar";

export function useErrorHandler() {
    const $q = useQuasar();

    const handleError = (error: unknown) => {
        const err = error as AxiosError<{ errors: Record<string, string[]> }>;
        if (err.response && err.response.status === 422) {
            const errors = err.response.data.errors;

            Object.values(errors).forEach((mensagens) => {
                mensagens.forEach((mensagem) => {
                    $q.notify({
                        type: "negative",
                        message: mensagem
                    });
                });
            });
        } else {
            // Tratar outros tipos de erro caso necessário
            $q.notify({
                type: "negative",
                message: "Ocorreu um erro inesperado. Tente novamente."
            });
        }
    };

    return { handleError };
}
