import PropTypes from 'prop-types'

import DecorationLine from 'components/DecorationLine/DecorationLine'
import ProfileEditCoverImage from 'components/ProfileEdit/ProfileEditCoverImage/ProfileEditCoverImage'
import ProfileEditPersonInfo from 'components/ProfileEdit/ProfileEditPersonInfo/ProfileEditPersonInfo'
import ProfileResetPassword from 'components/ProfileEdit/ProfileResetPassword/ProfileResetPassword'
import {
  COVER_IMAGE,
  RESET_PASSWORD,
  PERSON_INFO,
  PROFILE_EDIT_PAGE_TITLE_MAP,
} from 'constants/editType'

import { ReactComponent as IconLoadingSvg } from './assets/loading.svg'

const ProfileEditContent = ({
  editPage,
  profileInfo,
  profileCoverImage,
  isEditLoading,
}) => (
  <div className="relative w-full bg-white rounded-tr rounded-br p-4 sm:py-6 sm:px-9 overflow-hidden">
    {isEditLoading && (
      <div className="absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-white/70">
        <IconLoadingSvg className=" animate-spin" />
      </div>
    )}
    <p className="font-bold text-primary-900 text-xl sm:text-[28px] mb-3 sm:mb-6">
      {PROFILE_EDIT_PAGE_TITLE_MAP[editPage]}
    </p>
    <div className="mb-6">
      <DecorationLine />
    </div>

    {editPage === COVER_IMAGE && (
      <ProfileEditCoverImage
        isEditLoading={isEditLoading}
        profileCoverImage={profileCoverImage}
      />
    )}
    {editPage === PERSON_INFO && (
      <ProfileEditPersonInfo
        profileInfo={profileInfo}
        isEditLoading={isEditLoading}
      />
    )}
    {editPage === RESET_PASSWORD && (
      <ProfileResetPassword isEditLoading={isEditLoading} />
    )}
  </div>
)
ProfileEditContent.propTypes = {
  editPage: PropTypes.string,
  profileInfo: PropTypes.oneOfType([PropTypes.object]),
  profileCoverImage: PropTypes.oneOfType([PropTypes.object]),
  isEditLoading: PropTypes.bool,
}

ProfileEditContent.defaultProps = {
  editPage: '',
  profileInfo: {},
  profileCoverImage: {},
  isEditLoading: false,
}
export default ProfileEditContent
