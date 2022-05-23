import PropTypes from 'prop-types'
import { UpLoadButton } from 'components/Button/Button'
import Button3D from 'components/Button/Button3D/Button3D'
import { NORMAL, ICON_PHOTO } from 'constants/buttonType'

const PostModalFooter = ({ type, isError, isLoading, onClick, onChange }) => (
  <div className="flex justify-between items-center">
    <UpLoadButton
      content="新增照片"
      type={NORMAL}
      iconType={ICON_PHOTO}
      isDisabled={isLoading}
      onChange={onChange}
    />
    <Button3D
      content={type === 'update' ? '更新貼文' : '發布貼文'}
      isDisabled={isLoading || isError}
      onClick={onClick}
    />
  </div>
)

PostModalFooter.propTypes = {
  type: PropTypes.string,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
}

PostModalFooter.defaultProps = {
  type: '',
  isError: false,
  isLoading: false,
  onClick: () => {},
  onChange: () => {},
}
export default PostModalFooter
