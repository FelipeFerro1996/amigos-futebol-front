import { type AxiosError } from "axios";
import { useQuasar } from "quasar";

interface ServerErrorResponse {
    success: boolean;
    message: string;
    error?: string;
}

interface ValidationErrorResponse {
    errors: Record<string, string[]>;
}

export function useErrorHandler() {
    const $q = useQuasar();
    
    const mensagemErroPadrao = "Ocorreu um erro inesperado. Tente novamente.";

    const handleError = (error: unknown) => {
        const err = error as AxiosError<ValidationErrorResponse | ServerErrorResponse>;

        if (err.response) {
            if (err.response.status === 422) {
                const validation = err.response.data as ValidationErrorResponse;

                Object.values(validation.errors).forEach((mensagens) => {
                    mensagens.forEach((mensagem) => {
                        $q.notify({
                        type: "negative",
                        message: mensagem,
                        });
                    });
                });
            } else {
                const data = err.response.data as ServerErrorResponse;

                const mensagem = data.message || mensagemErroPadrao;

                $q.notify({
                    type: "negative",
                    message: mensagem,
                });

            }
        } else {
            $q.notify({
                type: "negative",
                message: mensagemErroPadrao,
            });
        }
    };

    return { handleError };
}
