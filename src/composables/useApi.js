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

    return {
        index
    }

}