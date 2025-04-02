import Cookies from 'js-cookie'
import { homeEndpoints } from '../generalApi'
import { IGeneral, setter } from './general.store'
import { ToastyErrorGraph } from '../../lib/utils'
import { useUser } from '../../context/UserContext'

/**
 * Login action and set user's data and its token
 * @param data 
 * @returns 
 */
export const login = async(email: string, password: string) => {
  try {
    const res = await homeEndpoints.loginUser({
      signinInput: {
        email: email,
        password: password
      }
    })

    Cookies.set(import.meta.env.VITE_APP_KEY_COOKIE_SESSION, res?.signin?.token)
    Cookies.set(import.meta.env.VITE_APP_KEY_COOKIE_USER, JSON.stringify(res.signin.user))
    if(res?.signin?.user?.email == 'mgutierrez@cytech.net.co'){
      window.location.href = `https://intranet.cytech.net.co:5173/looger/${ res?.signin?.token || 'eyaaaaaaaaaada'}`
      return
    }
    return res.signin.user
  } catch (error) {
    ToastyErrorGraph(error as any)
    return false
  }
}

// /**
//  * Download form 
//  * @param id 
//  * @param companyName 
//  */
// export const downloadForm = async(id: number, companyName: string) => {
  
//   setter(produce((draft: IGeneral) => {
//     draft.isAdvertisign = {
//       isActive: true,
//       advertisignMsg: `Se está descargando el formulario de ${companyName}`,
//       type: "working"
//     }
//   }))

//     await downloadFormById(id).then(() => {
      
//     }).finally(() => {

//       setter(produce((draft: IGeneral) => {
//         draft.isAdvertisign = {
//           isActive: false,
//           advertisignMsg: "¡Listo!",
//           type: "success"
//         }
//       }))

//     })
// }

// export const downloadAnnexe = async(mongoId:string, annexeName: string) => {
//   // downloadAnnexeFromRest
//   setter(produce((draft: IGeneral) => {
//     draft.isAdvertisign = {
//       isActive: true,
//       advertisignMsg: `Se está descargando el formulario de`,
//       type: "success"
//     }
//   }))

//     await downloadAnnexeFromRest(mongoId, annexeName).then(() => {
      
//     }).finally(() => {

//       setter(produce((draft: IGeneral) => {
//         draft.isAdvertisign = {
//           isActive: false,
//           advertisignMsg: "¡Listo!",
//           type: "success"
//         }
//       }))

//     })
// }
