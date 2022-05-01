import PropTypes from 'prop-types'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'

SwiperCore.use([Navigation, Pagination])

const PostSwiper = ({ imageUrls }) => (
  <Swiper
    className="mt-3 group max-h-[740px] rounded-lg bg-gray-600/50"
    slidesPerView={1}
    loop
    navigation
    pagination={{ clickable: true, dynamicBullets: true }}>
    {imageUrls.map((img, index) => (
      <SwiperSlide key={`swiper${index + 1}`}>
        <img
          className=" w-full h-full  max-h-[740px] object-contain rounded-lg"
          src={`${img}`}
          alt="post"
        />
      </SwiperSlide>
    ))}
  </Swiper>
)

PostSwiper.propTypes = {
  imageUrls: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

PostSwiper.defaultProps = {
  imageUrls: [],
}

export default PostSwiper
