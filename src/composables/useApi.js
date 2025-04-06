import {api} from 'boot/axios';

export default function useApi(url) {

    const index = async () => {
        const { data } = await api.get(url);
        return data;
    }

    const post = async (formData) => {
        const { data } = await api.post(url, formData);
        return data;
    }

    const update = async (formData) => {
        const { data } = await api.put(`${url}/${formData.id}`, formData);
        return data;
    }

    const remove = async (id) => {
        id = 1000
        const { data } = await api.delete(`${url}/${id}`);
        return data;
    }

    return {
        index,
        post,
        update,
        remove
    }

}