interface IYearView {
  isoDate: string
}

export function YearView({
  isoDate
}: IYearView) {

  const date = (isoDate) ? new Date(isoDate) : '';
  const newDate = date.toLocaleString();

  return (
    <span> {newDate} </span>
  )
}
