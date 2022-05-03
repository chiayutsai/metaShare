import PropTypes from 'prop-types'
import Button from 'components/Button/Button'
import Button3D from 'components/Button/Button3D/Button3D'
import { NORMAL, ICON_PHOTO } from 'constants/buttonType'

const PostModalFooter = ({ isLoading, onClick }) => (
  <div className="flex justify-between items-center">
    <Button
      content="新增照片"
      type={NORMAL}
      iconType={ICON_PHOTO}
      isDisabled={isLoading}
    />
    <Button3D content="發布貼文" isDisabled={isLoading} onClick={onClick} />
  </div>
)

PostModalFooter.propTypes = {
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
}

PostModalFooter.defaultProps = {
  isLoading: false,
  onClick: () => {},
}
export default PostModalFooter
