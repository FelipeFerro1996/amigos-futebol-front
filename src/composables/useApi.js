import {api} from 'boot/axios';

export default function useApi(url) {

    const index = async () => {
        try{
            const { data } = await api.get(url);
            return data;
        }catch(erro){
            throw new Error(erro);
        }
    }

    const post = async (formData) => {
        try{
            const { data } = await api.post(url, formData);
            return data;
        }catch(erro){
            throw new Error(erro);
        }
    }

    const update = async (formData) => {
        try{
            const { data } = await api.put(`${url}/${formData.id}`, formData);
            return data;
        }catch(erro){
            throw new Error(erro);
        }
    }

    return {
        index,
        post,
        update
    }

}