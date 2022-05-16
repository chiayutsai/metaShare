import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setProfileEditInit } from 'actions/profile'
import ProfileEditContent from 'components/ProfileEdit/ProfileEditContent/ProfileEditContent'
import ProfileEditMenu from 'components/ProfileEdit/ProfileEditMenu/ProfileEditMenu'
import { profileEditLoadingSelector } from 'selectors/profile'

const ProfileEdit = ({ editPage, profileInfo, profileCoverImage }) => {
  const dispatch = useDispatch()
  useEffect(
    () => () => {
      dispatch(setProfileEditInit())
    },
    [dispatch],
  )
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
