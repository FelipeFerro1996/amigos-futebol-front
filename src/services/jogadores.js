import useApi from "src/composables/useApi"

export default function jogadoresService() {

    const { index, post, update } = useApi('/jogadores');

    return {
        index,
        post,
        update
    }

}