interface IPesosConvert {
  value: number,
  isForm: boolean,
}

export function PesosConvert({
  value, isForm
}: IPesosConvert) {
  return (
    <>
      { (value < 0) ? <div style={{color: "red"}}>-$</div> : <div>$</div> }
      {
        <div style={(value < 0) ? {color: "red"} : {}}>
          { (isForm) ? value.toFixed(3) : (value/1000).toFixed(3)}
        </div>
      }
    </>
  )
}
