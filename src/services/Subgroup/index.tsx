import { Group, Subgroup, SubgroupForm } from "@/models";
import { BASE_API, GlobalErrors } from "@/services";

export function SubgroupService() {

  const CONTROLLER = '/Subgroup';

  return {
    indexByGroup: (id: Group['id']) => GlobalErrors<Subgroup[]>(() => BASE_API.get(`${CONTROLLER}/${id}`)),
    create: (data: SubgroupForm) => GlobalErrors<string>(() => BASE_API.post(`${CONTROLLER}`, data)),
    update: (data: Subgroup) => GlobalErrors<string>(() => BASE_API.put(`${CONTROLLER}/${data.id}`, data)),
    eliminate: (id: Subgroup['id']) => GlobalErrors<string>(() => BASE_API.delete(`${CONTROLLER}/${id}`)),
    uploadByGroup: (form: FormData, id: number) => GlobalErrors<string>(() => BASE_API.post(`${CONTROLLER}/${id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    }))
  }
}
