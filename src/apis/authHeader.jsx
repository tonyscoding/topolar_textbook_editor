import {useRecoilValue} from "recoil";
import {userState} from "@/utils/States";

const useAuthHeader = () => {
    const user = useRecoilValue(userState);
    if (user) {
        const token = user.token;
        if (!token) {
            return null;
        }
        return {headers: {'Authorization': `Token ${token}`}};
    }
}

export default useAuthHeader;