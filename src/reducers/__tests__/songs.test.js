import * as types from 'constants/types/ActionTypes'
import * as actions from 'actions/songs'
import reducer from 'reducers/songs'

describe('reducer::songs', () => {
  it('initialize state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot()
  })

  it('切换当前歌曲', () => {
    const state = reducer(undefined, actions.current({ sid: 1 }))
    expect(state).toMatchSnapshot()
    expect(state.id).toBe(1)
  })

  it('记录已播放的歌曲 ids', () => {
    const playedIds = [1, 2]
    const state = reducer(
      undefined,
      { type: types.SONG_PLAYED_SUCCESS, payload: playedIds },
    )
    expect(state).toMatchSnapshot()
    expect(state.playedIds).toEqual(playedIds)
  })
})
