import Swal from 'sweetalert2'
import { setMintStatus } from '../components/reducers/Settings'
import { store } from '../components/store'

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
    store.dispatch(
      setMintStatus('')
    )
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
    store.dispatch(
      setMintStatus('')
    )
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
    store.dispatch(
      setMintStatus('')
    )
  })
}

export const MiningTransaction = ({ title, description }) => {
  let timerInterval

  Swal.fire({
    title: title,
    timer: 2000,
    timerProgressBar: true,

    didOpen: () => {
      Swal.showLoading()
    },
    willClose: () => {
       
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
