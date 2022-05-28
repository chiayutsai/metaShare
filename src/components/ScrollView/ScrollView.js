import classnames from 'classnames'
import useStyles from 'isomorphic-style-loader/useStyles'
import PropTypes from 'prop-types'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

import styles from './ScrollView.scss'

const headTailMargin = '4px'
const boundaryMargin = '0px'
const zIndex = '10'

const defaultTrackStyle = {
  position: 'absolute',
  zIndex,
}

const defaultTrackVStyle = {
  ...defaultTrackStyle,
  top: headTailMargin,
  bottom: headTailMargin,
  right: boundaryMargin,
}

const defaultTrackHStyle = {
  ...defaultTrackStyle,
  left: headTailMargin,
  right: headTailMargin,
  bottom: boundaryMargin,
}

const hideStyle = { display: 'none' }

/**
 * Generate custom scrollbar
 *
 * Usage 1: Give certain width and height style object.
 *   <ScrollView style={{width: 300, height: 500}}><Component /></ScrollView>
 *
 * Usage 2: Wrapped by a tag which has certain width and height.
 *   <div className='scroll-wrapper'>
 *     <ScrollView><Component /></ScrollView>
 *   </div>
 *  --------css--------
 *   .scroll-wrapper {
 *     width: 300px
 *     height: 500px
 *   }
 *
 * Usage 3: Auto height setting. [ref.](https://github.com/malte-wessel/react-custom-scrollbars/blob/master/docs/usage.md#auto-height).
 *   <ScrollView auto minHeight={100} maxHeight={500}><Component /></ScrollView>
 */

/**
 * Props Description
 *
 * @prop auto - Auto height setting
 * @prop horizontal - Display horizontal scrollbar
 * @prop vertical - Display vertical scrollbar
 * @prop shouldRenderCustomContainer - Display children with no ScrollView, for tutorial usage
 * @prop horizontalHeight - Define horizontal scrollbar height
 * @prop verticalWidth - Define vertical scrollbar width
 * @prop minHeight - Auto height setting
 * @prop maxHeight - Auto height setting
 * @prop style - Define ScrollView width, height
 * @prop trackHStyle - Define horizontal scrollbar position. (e.g. right: '0px', position: 'absolute')
 * @prop trackVStyle - Define vertical scrollbar position. (e.g. right: '0px', position: 'absolute')
 * @prop thumbHClass - Define horizontal scrollbar thumb style. (e.g. bg-color, border-radius)
 * @prop thumbVClass - Define vertical scrollbar thumb style. (e.g. bg-color, border-radius)
 * @prop children - Scrollable content
 * @prop setRef - Get DOM Element, usually for the method usage. (i.e. scrollToTop(), scrollToBottom())
 *                [ref.](https://github.com/malte-wessel/react-custom-scrollbars/blob/master/docs/API.md#methods)
 * @prop onScroll - Scroll event handler
 * @prop renderCustomContainer - render children with custom wrapper, for tutorial usage
 */
const ScrollView = ({
  auto,
  horizontal,
  vertical,
  initialScrollHToEnd,
  initialScrollVToEnd,
  scrollSmooth,
  wheelScrollHorizontal,
  shouldRenderCustomContainer,
  thumbSizeChangeOnHover,
  horizontalHeight,
  horizontalHoverHeight,
  verticalWidth,
  verticalHoverWidth,
  minHeight,
  maxHeight,
  style,
  trackHStyle,
  trackVStyle,
  thumbHClass,
  thumbVClass,
  autoHide,
  children,
  onScroll,
  onScrollFrame,
  scrollViewClass,
  renderCustomContainer,
  setRef,
}) => {
  const rootRef = useRef()
  useStyles(styles)

  setRef(rootRef)

  const [isHoveredVTrack, setIsHoveredVTrack] = useState(false)
  const [isDraggingVTrack, setIsDraggingVTrack] = useState(false)
  const [isHighVTrack, setIsHighVTrack] = useState(false)

  const [isHoveredHTrack, setIsHoveredHTrack] = useState(false)
  const [isDraggingHTrack, setIsDraggingHTrack] = useState(false)
  const [isHighHTrack, setIsHighHTrack] = useState(false)
  const [isScrollingToEnd, setIsScrollingToEnd] = useState(
    initialScrollHToEnd || initialScrollVToEnd,
  )

  // -----
  // handlers

  const vMouseHandlers = useMemo(
    () => ({
      onMouseEnter: () => {
        setIsHoveredVTrack(true)
        setIsHighVTrack(true)
      },
      onPointerDown: () => setIsDraggingVTrack(true),
      // because react-custom-scrollbars-2 library block onMouseDown event,
      // use onPointerDown instead temporary
    }),
    [],
  )
  const vMouseHandlersWithDeps = useMemo(
    () => ({
      onMouseLeave: () => {
        setIsHoveredVTrack(false)
        if (!isDraggingVTrack) {
          setIsHighVTrack(false)
        }
      },
    }),
    [isDraggingVTrack],
  )

  const hMouseHandlers = useMemo(
    () => ({
      onMouseEnter() {
        setIsHoveredHTrack(true)
        setIsHighHTrack(true)
      },
      onPointerDown: () => setIsDraggingHTrack(true),
      // because react-custom-scrollbars-2 library block onMouseDown event,
      // use onPointerDown instead temporary
    }),
    [],
  )
  const hMouseHandlersWithDeps = useMemo(
    () => ({
      onMouseLeave: () => {
        setIsHoveredHTrack(false)
        if (!isDraggingHTrack) {
          setIsHighHTrack(false)
        }
      },
    }),
    [isDraggingHTrack],
  )

  // convert v scroll to h scroll
  const handleWheel = useCallback(
    event => {
      if (!wheelScrollHorizontal) {
        return
      }

      try {
        const { deltaY } = event

        const target = rootRef.current.container.children[0]
        const offsetX = target.scrollLeft + deltaY

        target.scroll({
          top: 0,
          left: offsetX,
          behavior: 'auto',
        })
      } catch (e) {
        // scroll fail
        console.warn('ScrollView: scroll fail', e)
      }
    },
    [wheelScrollHorizontal],
  )

  // show track when mouse move
  const handleMouseMove = useCallback(() => {
    try {
      rootRef.current.handleTrackMouseEnter()

      if (!isHighVTrack && !isHighHTrack) {
        rootRef.current.handleTrackMouseLeave()
      }
    } catch (e) {
      // handleMouseMove fail
      console.warn('ScrollView: handleMouseMove fail', e)
    }
  }, [isHighVTrack, isHighHTrack])

  // -----
  // effects

  // mouseup change h track size
  useEffect(() => {
    const onMouseUp = () => {
      if (isDraggingHTrack) {
        setIsDraggingHTrack(false)
      }
      if (isHighHTrack && !isHoveredHTrack) {
        setIsHighHTrack(false)
      }
    }

    window.addEventListener('mouseup', onMouseUp)
    return () => window.removeEventListener('mouseup', onMouseUp)
  }, [isDraggingHTrack, isHighHTrack, isHoveredHTrack])

  // mouseup change v track size
  useEffect(() => {
    const onMouseUp = () => {
      if (isDraggingVTrack) {
        setIsDraggingVTrack(false)
      }
      if (isHighVTrack && !isHoveredVTrack) {
        setIsHighVTrack(false)
      }
    }

    window.addEventListener('mouseup', onMouseUp)
    return () => window.removeEventListener('mouseup', onMouseUp)
  }, [isDraggingVTrack, isHighVTrack, isHoveredVTrack])

  // scroll to end
  const handleScrollToEnd = useCallback(
    target => {
      const offsetX = initialScrollHToEnd ? target.scrollWidth : 0
      const offsetY = initialScrollVToEnd ? target.scrollHeight : 0

      target.scroll({
        top: offsetY,
        left: offsetX,
        behavior: 'auto',
      })

      setTimeout(() => {
        setIsScrollingToEnd(false)
      }, 150)
    },
    [initialScrollHToEnd, initialScrollVToEnd],
  )

  useLayoutEffect(() => {
    try {
      const target = rootRef.current.container.children[0]

      if (
        target.clientWidth === target.scrollWidth &&
        target.clientHeight === target.scrollHeight
      ) {
        // 解決剛 mount 時, children 未撐開容器前就 scroll 導致沒有 scroll to end,
        // 若檢測到未撐開, 等下一個 tick 再 scroll
        setTimeout(() => {
          handleScrollToEnd(target)
          // TODO: figure out other way instead of 150ms
        }, 150)
      } else {
        handleScrollToEnd(target)
      }
    } catch (e) {
      // scroll fail
      console.warn('ScrollView: scroll fail', e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // wont need any deps

  const autoHeightProps = auto
    ? {
        autoHeight: true,
        autoHeightMin: minHeight,
        autoHeightMax: maxHeight,
      }
    : {}

  if (shouldRenderCustomContainer) {
    return renderCustomContainer({ children })
  }
  return (
    <Scrollbars
      {...autoHeightProps}
      ref={rootRef}
      autoHide={autoHide}
      onScroll={onScroll}
      onScrollFrame={onScrollFrame}
      style={style}
      className={styles.root}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      renderTrackHorizontal={props => (
        <div
          {...props}
          {...hMouseHandlers}
          {...hMouseHandlersWithDeps}
          style={
            horizontal
              ? {
                  ...trackHStyle,
                  height: `${
                    thumbSizeChangeOnHover && isHighHTrack
                      ? horizontalHoverHeight
                      : horizontalHeight
                  }px`,
                }
              : hideStyle
          }
          className={classnames(styles['hide-on-mobile'])}
        />
      )}
      renderTrackVertical={props => (
        <div
          {...props}
          {...vMouseHandlers}
          {...vMouseHandlersWithDeps}
          style={
            vertical
              ? {
                  ...trackVStyle,
                  width: `${
                    thumbSizeChangeOnHover && isHighVTrack
                      ? verticalHoverWidth
                      : verticalWidth
                  }px`,
                }
              : hideStyle
          }
          className={classnames(styles['hide-on-mobile'])}
        />
      )}
      renderThumbHorizontal={props => (
        <div
          role="presentation"
          {...props}
          className={classnames(styles['hide-on-mobile'], thumbHClass)}
        />
      )}
      renderThumbVertical={props => (
        <div
          {...props}
          className={classnames(styles['hide-on-mobile'], thumbVClass)}
        />
      )}
      renderView={props => (
        <div
          {...props}
          className={classnames(scrollViewClass, {
            [styles['scroll-smooth']]: scrollSmooth && !isScrollingToEnd,
            [styles['scrollbar-x-hide']]: !horizontal,
            [styles['scrollbar-y-hide']]: !vertical,
          })}
        />
      )}
      thumbMinSize={30}>
      {children}
    </Scrollbars>
  )
}

ScrollView.propTypes = {
  auto: PropTypes.bool,
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  initialScrollHToEnd: PropTypes.bool,
  initialScrollVToEnd: PropTypes.bool,
  scrollSmooth: PropTypes.bool,
  wheelScrollHorizontal: PropTypes.bool,
  shouldRenderCustomContainer: PropTypes.bool,
  thumbSizeChangeOnHover: PropTypes.bool,
  horizontalHeight: PropTypes.number,
  horizontalHoverHeight: PropTypes.number,
  verticalWidth: PropTypes.number,
  verticalHoverWidth: PropTypes.number,
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.objectOf(PropTypes.string),
  trackHStyle: PropTypes.objectOf(PropTypes.string),
  trackVStyle: PropTypes.objectOf(PropTypes.string),
  thumbHClass: PropTypes.string,
  thumbVClass: PropTypes.string,
  autoHide: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  setRef: PropTypes.func,
  onScroll: PropTypes.func,
  onScrollFrame: PropTypes.func,
  scrollViewClass: PropTypes.string,
  renderCustomContainer: PropTypes.func,
}

ScrollView.defaultProps = {
  auto: false,
  horizontal: false,
  vertical: false,
  initialScrollHToEnd: false,
  initialScrollVToEnd: false,
  scrollSmooth: false,
  wheelScrollHorizontal: false,
  shouldRenderCustomContainer: false,
  thumbSizeChangeOnHover: false,
  horizontalHeight: 10,
  horizontalHoverHeight: 10,
  verticalWidth: 10,
  verticalHoverWidth: 10,
  minHeight: '100%',
  maxHeight: '100%',
  style: {
    width: '100%',
    height: '100%',
  },
  scrollViewClass: null,
  trackHStyle: defaultTrackHStyle,
  trackVStyle: defaultTrackVStyle,
  thumbHClass: styles['thumb-horizontal'],
  thumbVClass: styles['thumb-vertical'],
  setRef: null,
  onScroll: null,
  onScrollFrame: null,
  renderCustomContainer: null,
  autoHide: true,
}

export default ScrollView
