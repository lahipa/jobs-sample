import { API_BACKEND } from "./http";
import { LoginDataType, RecruitementParams } from "./datatypes"

export const login = async (data: LoginDataType) => {
    const endpoint = "/users/login";
  
    const request = await API_BACKEND.post(endpoint, data);

    const response = request.data;
  
    return response;
};

export const getRecruitements = async (params?: RecruitementParams) => {
    const endpoint = "/recruitements";

    const request = await API_BACKEND.get(endpoint, { params });

    console.log(request)

    const response = request.data;
  
    return response;
}

export const getRecruitement = async (id: string) => {
    const endpoint = `/recruitements/${id}`;

    const request = await API_BACKEND.get(endpoint);

    const response = request.data;
  
    return response;
}
