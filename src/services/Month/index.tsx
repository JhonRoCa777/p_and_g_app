import { DateHelper } from "@/helpers";
import { Month } from "@/models";

const months: Month[] = [
  {id: 1, name: 'ENERO'},
  {id: 2, name: 'FEBRERO'},
  {id: 3, name: 'MARZO'},
  {id: 4, name: 'ABRIL'},
  {id: 5, name: 'MAYO'},
  {id: 6, name: 'JUNIO'},
  {id: 7, name: 'JULIO'},
  {id: 8, name: 'AGOSTO'},
  {id: 9, name: 'SEPTIEMBRE'},
  {id: 10, name: 'OCTUBRE'},
  {id: 11, name: 'NOVIEMBRE'},
  {id: 12, name: 'DICIEMBRE'}
];

const get = (id: Month['id']) => months.find(month => month.id === id);

export const MonthService = {
  index: () => months,
  getCurrent: () => get(DateHelper.currentMonth()),
  getMonthView: (initial: Month['id'], final: Month['id']) => {
    initial = Number(initial); final = Number(final);
    return (initial === final) ? get(initial)?.name
    : `${get(initial)?.name.substring(0, 3)} - ${get(final)?.name.substring(0, 3)}`
  }
}
