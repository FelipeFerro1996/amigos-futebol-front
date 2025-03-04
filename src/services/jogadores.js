import useApi from "src/composables/useApi"

export default function jogadoresService() {

    const { index } = useApi('/jogadores');

    return {
        index
    }

}