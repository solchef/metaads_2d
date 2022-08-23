import Swal from 'sweetalert2'
import { setMintStatus } from '../components/reducers/Settings'
import { store } from '../components/store'

export const SuccessfulTransaction = ({ title, description }) => {
  Swal.fire({
    title: title,
    text: description,
    icon: 'success',
    confirmButtonColor: '#b401ab',
    confirmButtonText: 'Close',
  }).then((result) => {
    store.dispatch(setMintStatus(''))
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
    store.dispatch(setMintStatus(''))
  })
}

export const ErrorTransaction = ({ title, description }) => {
  Swal.fire({
    title: title,
    text: description.includes('MintCannot')
      ? description.replace('MintCannot', 'Cannot')
      : description,
    icon: 'error',
    confirmButtonColor: '#b401ab',
    confirmButtonText: 'Close',
  }).then((result) => {
    store.dispatch(setMintStatus(''))
  })
}

export const MiningTransaction = ({ title, description }) => {
  Swal.fire({
    title: title,
    text: description,
    icon: 'info',
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    },
    // willClose: () => {},
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
