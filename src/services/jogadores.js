import useApi from "src/composables/useApi"

export default function jogadoresService() {

    const { index, post } = useApi('/jogadores');

    return {
        index,
        post
    }

}