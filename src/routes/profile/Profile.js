import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProfile } from 'actions/api/webApi'
import { setProfileUserId } from 'actions/profile'
import PostsWall from 'components/PostsWall/PostsWall'
import ProfileCard from 'components/ProfileCard/ProfileCard'
import ProfileEdit from 'components/ProfileEdit/ProfileEdit'
import ProfileHeader from 'components/ProfileHeader/ProfileHeader'
import {
  profileInfoSelector,
  profileIsAdmin,
  profileEditSelector,
  profileEditPageSelector,
  profileCoverImageSelector,
} from 'selectors/profile'

const Profile = () => {
  const dispatch = useDispatch()
  const isAdmin = useSelector(profileIsAdmin)
  const isEdit = useSelector(profileEditSelector)
  const editPage = useSelector(profileEditPageSelector)
  useEffect(() => {
    ;(async () => {
      try {
        await dispatch(getProfile())
      } catch (error) {
        console.log(error)
      }
    })()

    return () => {
      dispatch(setProfileUserId(''))
    }
  }, [dispatch])
  const profileInfo = useSelector(profileInfoSelector)
  const profileCoverImage = useSelector(profileCoverImageSelector)
  return (
    <div className="mt-[56px] mb-16">
      <ProfileHeader
        isAdmin={isAdmin}
        isEdit={isEdit}
        profileCoverImage={profileCoverImage}
        avatorUrl={profileInfo.avator}
        name={profileInfo.name}
      />
      {!isEdit && (
        <div className="container  pt-6 px-9">
          <div className="flex">
            <div className="w-[345px] shrink-0 mr-9">
              <ProfileCard
                description={profileInfo.description}
                tags={profileInfo.tags}
              />
            </div>
            <div className=" flex-1 min-w-0">
              <PostsWall isAdmin={isAdmin} avatorUrl={profileInfo.avator} />
            </div>
          </div>
        </div>
      )}
      {isAdmin && isEdit && (
        <div className="container pt-12 px-9">
          <ProfileEdit
            editPage={editPage}
            profileInfo={profileInfo}
            profileCoverImage={profileCoverImage}
          />
        </div>
      )}
    </div>
  )
}
Profile.propTypes = {}

export default Profile
