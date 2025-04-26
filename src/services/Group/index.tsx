import { Group, GroupForm } from "@/models";
import { BASE_API, GlobalErrors } from "@/services";

export function GroupService() {

  const CONTROLLER = '/Group';

  return {
    index: () => GlobalErrors<Group[]>(() => BASE_API.get(`${CONTROLLER}`)),
    create: (data: GroupForm) => GlobalErrors<string>(() => BASE_API.post(`${CONTROLLER}`, data)),
    update: (data: Group) => GlobalErrors<string>(() => BASE_API.put(`${CONTROLLER}/${data.id}`, data)),
    eliminate: (id: Group['id']) => GlobalErrors<string>(() => BASE_API.delete(`${CONTROLLER}/${id}`))
  }
}
