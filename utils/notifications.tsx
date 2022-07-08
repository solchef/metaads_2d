import Swal from 'sweetalert2/dist/sweetalert2.js'

export const SuccessfulTransaction = ({ title, description }) => {
  Swal.fire({
    title: title,
    text: description,
    icon: 'success',
    confirmButtonColor: '#b401ab',
    // cancelButtonColor: '#d33',
    confirmButtonText: 'Close',
  }).then((result) => {
    // if (result.isConfirmed) {
    //   Swal.fire('Thank You!', 'Check your wallet.', 'success')
    // }
  })
}

export const InfoMessage = ({ title, description }) => {
  Swal.fire({
    title: title,
    text: description,
    icon: 'info',
    confirmButtonColor: '#b401ab',
    // cancelButtonColor: '#d33',
    confirmButtonText: 'Close',
  }).then((result) => {
    // if (result.isConfirmed) {
    //   Swal.fire('Thank You!', 'Please Try Again Later.', 'warning')
    // }
  })
}

export const ErrorTransaction = ({ title, description }) => {
  Swal.fire({
    title: title,
    text: description,
    icon: 'error',
    confirmButtonColor: '#b401ab',
    confirmButtonText: 'Close',
  }).then((result) => {
    // if (result.isConfirmed) {
    //   Swal.fire('Please check!', 'And then try again.', 'error')
    // }
  })
}

export const MiningTransaction = ({ title, description }) => {
  let timerInterval

  Swal.fire({
    title: title,
    timer: 2000,
    timerProgressBar: true,

    didOpen: () => {
      // `Swal` is a subclass of `Swal` with all the same instance & static methods
      Swal.showLoading()
      // const b = Swal.getHtmlContainer().querySelector('adcanvass')
      // timerInterval = setInterval(() => {
      //   // b.textContent = Swal.getTimerLeft()
      // }, 50000)
    },
    willClose: () => {
      clearInterval(timerInterval)
    },
  })
}

export const ConnectedWallet = (address) => {
  return `${Swal.fire({
    title: 'Connected',
    icon: 'info',
    showCloseButton: true,
    // showCancelButton: true,
    // focusConfirm: false,
    // confirmButtonText:  'Disconnect',
    confirmButtonAriaLabel: 'Thumbs up, great!',
    html: `You are connected to quadSpace as <br/> <br/>  ${address} `,
  })}`
}
