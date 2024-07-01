import useAppContext from "../context/useAppContext"
import {Actions} from "../context/reducer"
import {IState} from "../context/state"

const Main = () => {
  const { state, dispatch } = useAppContext()
  const {count} = state as IState
  const setCount = (n: number) => {
    dispatch({type: Actions.SetCount, payload: n})
  }

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        count is {count}
      </button>
    </>
  )
}

export default Main
