
export interface IDropdown<T> {
  value: T,
  handleOnChange: (item: T) => any,
  disabled?: boolean
}
