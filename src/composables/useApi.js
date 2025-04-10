import {api} from 'boot/axios';

export default function useApi(url) {

    const index = async (params = {}) => {
        const { data } = await api.get(url, {params});
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