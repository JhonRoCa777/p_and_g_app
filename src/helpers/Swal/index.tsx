import Swal from "sweetalert2";

export const SwalHelper = {
  success: (msg: string) => Swal.fire({
    allowOutsideClick: false,
    icon: "success",
    title: "¡Listo!",
    text: msg
  }),

  info: (msg: string) => Swal.fire({
    allowOutsideClick: false,
    icon: "info",
    text: msg
  }),

  warning: (msg: string) => Swal.fire({
    allowOutsideClick: false,
    icon: "warning",
    title: "Oops...",
    text: msg
  }),

  error: (msg: string) => Swal.fire({
    allowOutsideClick: false,
    icon: "error",
    title: "Oops...",
    text: msg
  }),

  confirm: (msg: string, type: 'delete' | 'accept') => Swal.fire({
    allowOutsideClick: false,
    title: "¿Estás seguro?",
    html: msg,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: (type === 'delete') ? "var(--danger-color)" : "var(--tertiary-color)",
    confirmButtonText: (type === 'delete') ? "Borrar" : "Aceptar",
    cancelButtonText: "Cancelar"
  }),

  loading: () => Swal.fire({
    allowOutsideClick: false,
    title: 'Cargando...',
    text: 'Por favor espera.',
    didOpen: () => {
      Swal.showLoading();
    }
  }),

  excel_error: (data: any) => {

    let table = `
      <div style="overflow: hidden scroll; max-height: 50vh;">
        <table style="font-size: small;" class="table">
          <thead style="position: sticky; top: 0; background-color: #f1f1f1; z-index: 1;">
            <tr>
              <th style="width: 35px;"> Fila </th>
              <th style="width: 75px;"> Columna </th>
              <th> Errores </th>
            </tr>
          </thead>
          <tbody>
    `;

    data.forEach((item: any) => {
      const fila = item.fila;
      Object.keys(item.columnas).forEach(columna => {
        const errores = item.columnas[columna].map((error: any) => `<li>${error}</li>`).join('');
        table += `
          <tr>
            <td>${fila}</td>
            <td>${columna}</td>
            <td><ul>${errores}</ul></td>
          </tr>
        `;
      });
    });

    table += '</tbody></table></div>';

    return Swal.fire({
      allowOutsideClick: false,
      icon: "error",
      title: "Oops...",
      html: table
    })
  }
}
