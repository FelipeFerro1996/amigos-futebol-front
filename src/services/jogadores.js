import useApi from "src/composables/useApi"

export default function jogadoresService() {

    const { index, post, update, remove } = useApi('/jogadores');

    return {
        index,
        post,
        update,
        remove
    }

}