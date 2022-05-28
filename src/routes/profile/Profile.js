import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleGetProfile, setProfileUserId } from 'actions/profile'
import PostsWall from 'components/PostsWall/PostsWall'
import ProfileCard from 'components/ProfileCard/ProfileCard'
import ProfileEdit from 'components/ProfileEdit/ProfileEdit'
import ProfileHeader from 'components/ProfileHeader/ProfileHeader'
import {
  profileUserIdSelector,
  profileInfoSelector,
  profileIsAdmin,
  profileEditSelector,
  profileEditPageSelector,
  profileCoverImageSelector,
  profileFollowSelector,
} from 'selectors/profile'

const Profile = () => {
  const dispatch = useDispatch()
  const isAdmin = useSelector(profileIsAdmin)
  const isEdit = useSelector(profileEditSelector)
  const editPage = useSelector(profileEditPageSelector)
  const profileUserId = useSelector(profileUserIdSelector)
  useEffect(() => {
    ;(async () => {
      try {
        await dispatch(handleGetProfile({ userId: profileUserId }))
      } catch (error) {
        console.log(error)
      }
    })()
  }, [dispatch, profileUserId])

  useEffect(
    () => () => {
      dispatch(setProfileUserId(''))
    },
    [dispatch],
  )

  const profileInfo = useSelector(profileInfoSelector)
  const profileCoverImage = useSelector(profileCoverImageSelector)
  const { following, follower } = useSelector(profileFollowSelector)
  return (
    <div className="mt-[56px] mb-16">
      <ProfileHeader
        isAdmin={isAdmin}
        isEdit={isEdit}
        profileUserId={profileUserId}
        profileCoverImage={profileCoverImage}
        avatorUrl={profileInfo.avator}
        name={profileInfo.name}
        following={following}
        follower={follower}
      />
      {!isEdit && (
        <div className="w-full md:container pb-24  md:py-6 px-4 mid:px-6 xl:px-9">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-[240px] mid:w-[280px] xl:w-[345px] shrink-0 mb-4 md:mb-0 md:mr-9">
              <ProfileCard
                description={profileInfo.description}
                tags={profileInfo.tags}
              />
            </div>
            <div className=" flex-1 min-w-0">
              <PostsWall
                key={profileUserId}
                isAdmin={isAdmin}
                avatorUrl={profileInfo.avator}
              />
            </div>
          </div>
        </div>
      )}
      {isAdmin && isEdit && (
        <div className="w-full md:container pb-24  md:pb-12 md:pt-12 px-4 xl:px-9">
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
