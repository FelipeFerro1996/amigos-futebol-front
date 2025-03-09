import {api} from 'boot/axios';
import { ref } from "vue";
import { useRouter } from "vue-router";

export function useAuth(){
    const token = ref(localStorage.getItem('token') || '');
    const user = ref(null);
    const router = useRouter();

    const login = async (credentials) => {
        try{
            const response = await api.post('login', credentials);
            token.value = response.data;
            localStorage.setItem('token', token.value);
            api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
            await getUser();
            router.push({name: 'Home'});
        }catch(error){
            throw new Error(error);
        }

    }

    const logout = () => {
        token.value = '';
        user.value = null;
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        router.push('login')
    }

    const getUser = async () => {

        if(!token.value) return;
        
        try{
            const response = await api.get('/user')
            user.value = response.data;
        }catch(error){
            console.log('Erro ao buscar usuário', error);
            logout();
        }
    }

    return { token, user, login, logout, getUser }
}