import center from './assets/center.png'
import { ReactComponent as CircleSvg } from './assets/circle.svg'
import like from './assets/like.png'
import porson from './assets/person.png'
import person1 from './assets/person1.png'
import person2 from './assets/person2.png'
import person3 from './assets/person3.png'
import { ReactComponent as SmallCircleSvg } from './assets/smallCircle.svg'

const LoginCircle = () => (
  <div className="relative w-[456px] h-[456px] flex items-center justify-center">
    <CircleSvg className="absolute rotate-login-circle" />
    <div className="login-circle circle1">
      <img
        src={person1}
        alt="person1"
        className="login-circle-img w-[90px] h-[90px] rotate-[-90deg]"
      />
    </div>
    <div className="login-circle circle2">
      <img
        src={person2}
        alt="person2"
        className="login-circle-img w-[100px] h-[100px] rotate-[-270deg]"
      />
    </div>
    <div className="login-circle circle3">
      <img
        src={person3}
        alt="person3"
        className="login-circle-img w-[112px] h-[112px] rotate-180"
      />
    </div>
    <div className="relative w-full h-full max-w-[260px] max-h-[260px] flex items-center justify-center">
      <SmallCircleSvg className="absolute rotate-small-login-circle" />
      <div className="login-circle small-circle1">
        <img
          src={porson}
          alt="person"
          className="w-[54px] h-[54px] rounded-full shadow-login rotate-[-60deg]"
        />
      </div>
      <div className="login-circle small-circle2">
        <img
          src={like}
          alt="like"
          className="w-[60px] h-[60px] rounded-full shadow-login rotate-[300deg]"
        />
      </div>
    </div>
    <img src={center} alt="center" className="login-circle-img absolute " />
  </div>
)

export default LoginCircle
