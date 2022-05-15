import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import ProfileEditContent from 'components/ProfileEdit/ProfileEditContent/ProfileEditContent'
import ProfileEditMenu from 'components/ProfileEdit/ProfileEditMenu/ProfileEditMenu'
import { profileEditLoadingSelector } from 'selectors/profile'

const ProfileEdit = ({ editPage, profileInfo, profileCoverImage }) => {
  const isEditLoading = useSelector(profileEditLoadingSelector)
  return (
    <div className="flex">
      <ProfileEditMenu editPage={editPage} />
      <ProfileEditContent
        editPage={editPage}
        profileInfo={profileInfo}
        profileCoverImage={profileCoverImage}
        isEditLoading={isEditLoading}
      />
    </div>
  )
}
ProfileEdit.propTypes = {
  editPage: PropTypes.string,
  profileInfo: PropTypes.oneOfType([PropTypes.object]),
  profileCoverImage: PropTypes.oneOfType([PropTypes.object]),
}

ProfileEdit.defaultProps = {
  editPage: '',
  profileInfo: {},
  profileCoverImage: {},
}
export default ProfileEdit
