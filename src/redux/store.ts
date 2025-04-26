import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
  Calculation,
  CalculationForm,
  Group,
  Publication,
  PublicationForm,
  PublicationGroup,
  PublicationGroupForm,
  PublicationWithPublicationGroups,
  Subgroup,
  User
} from "@/models";
import {
  UserSlice,
  RouterLinkSlice,
  GroupSlice,
  PublicationSlice,
  CalculationArraySlice,
  PublicationGroupSlice,
  SubgroupSlice,
  PublicationFormSlice,
  PublicationGroupFormSlice,
  CalculationFormArraySlice,
  PublicationWithPublicationGroupsArraySlice
} from "@/redux";

interface AppStore {
  UserSlice: User,
  RouterLinkSlice: string,

  GroupSlice: Group,
  SubgroupSlice: Subgroup,

  PublicationSlice: Publication,
  PublicationFormSlice: PublicationForm,
  PublicationWithPublicationGroupsArraySlice: PublicationWithPublicationGroups[],

  PublicationGroupSlice: PublicationGroup,
  PublicationGroupFormSlice: PublicationGroupForm,

  CalculationArraySlice: Calculation[],
  CalculationFormArraySlice: CalculationForm[],
}

export const Store = configureStore<AppStore>({
  reducer: {
    UserSlice: UserSlice.reducer,
    RouterLinkSlice: RouterLinkSlice.reducer,

    GroupSlice: GroupSlice.reducer,
    SubgroupSlice: SubgroupSlice.reducer,

    PublicationSlice: PublicationSlice.reducer,
    PublicationFormSlice: PublicationFormSlice.reducer,
    PublicationWithPublicationGroupsArraySlice: PublicationWithPublicationGroupsArraySlice.reducer,
    
    PublicationGroupSlice: PublicationGroupSlice.reducer,
    PublicationGroupFormSlice: PublicationGroupFormSlice.reducer,

    CalculationArraySlice: CalculationArraySlice.reducer,
    CalculationFormArraySlice: CalculationFormArraySlice.reducer,
  }
});

export const UserStore = () => useSelector((store: AppStore) => store.UserSlice);
export const RouterLinkStore = () => useSelector((store: AppStore) => store.RouterLinkSlice);

export const GroupStore = () => useSelector((store: AppStore) => store.GroupSlice);
export const SubgroupStore = () => useSelector((store: AppStore) => store.SubgroupSlice);

export const PublicationStore = () => useSelector((store: AppStore) => store.PublicationSlice);
export const PublicationFormStore = () => useSelector((store: AppStore) => store.PublicationFormSlice);
export const PublicationWithPublicationGroupsArrayStore = () => useSelector((store: AppStore) => store.PublicationWithPublicationGroupsArraySlice);

export const PublicationGroupStore = () => useSelector((store: AppStore) => store.PublicationGroupSlice);
export const PublicationGroupFormStore = () => useSelector((store: AppStore) => store.PublicationGroupFormSlice);

export const CalculationArrayStore = () => useSelector((store: AppStore) => store.CalculationArraySlice);
export const CalculationFormArrayStore = () => useSelector((store: AppStore) => store.CalculationFormArraySlice);
