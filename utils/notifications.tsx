import Swal from 'sweetalert2/dist/sweetalert2.js'


export const SuccessfulTransaction = ({ title, description }) => {
  Swal.fire({
    title: title,
    text: description,
    icon: 'success',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Close',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Thank You!', 'Check your wallet.', 'success')
    }
  })
}

export const WarningMessage = ({ title, description }) => {
  Swal.fire({
    title: title,
    text: description,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Close',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Thank You!', 'Please Check Back Later.', 'warning')
    }
  })
}

export const ErrorTransaction = ({ title, description }) => {
  Swal.fire({
    title: title,
    text: description,
    icon: 'error',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Close',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Please check!', 'Check your wallet.', 'error')
    }
  })
}

export   const MiningTransaction = ({ title, description }) => {
  let timerInterval

  Swal.fire({
    title: title,
    timer: 2000,
    timerProgressBar: true,

    didOpen: () => {
      // `Swal` is a subclass of `Swal` with all the same instance & static methods
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    },
  }).then(() => {
    return Swal.fire(<p>{description}</p>)
  })
}
