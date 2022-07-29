import {ShareSocial} from 'react-share-social' 

const style = {
 background: 'transparent',
  borderRadius: 3,
  border: 0,
  color: 'white',
  padding: '0 30px',
};
export default function ShareSection() {
  return <ShareSocial 
     style={style}
     url ="http://www.themilliondollarwebsite.com"
     socialTypes={['facebook','twitter','reddit']}
   />
}