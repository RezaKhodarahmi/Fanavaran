// ** Custom Components
import AvatarGroup from '../../../core/components/avatar-group'

// ** Avatar Imports
import avatar5 from '../../../assets/images/portrait/small/avatar-s-5.jpg'
import avatar7 from '../../../assets/images/portrait/small/avatar-s-7.jpg'
import avatar10 from '../../../assets/images/portrait/small/avatar-s-10.jpg'
import avatar11 from '../../../assets/images/portrait/small/avatar-s-11.jpg'
import avatar20 from '../../../assets/images/portrait/small/avatar-s-20.jpg'

const data = [
  {
    title: 'Vinnie Mostowy',
    img: avatar5
  },
  {
    title: 'Elicia Rieske',
    img: avatar7
  },
  {
    title: 'Julee Rossignol',
    img: avatar10
  },
  {
    title: 'Darcey Nooner',
    img: avatar11
  },
  {
    title: 'Jenny Looper',
    img: avatar20
  }
]

const AvatarGroupComponent = () => {
  return <AvatarGroup data={data} />
}

export default AvatarGroupComponent
