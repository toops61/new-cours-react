import { pause, reset, startChrono } from "../redux/chronoSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { RootState } from "../redux/store";

export default function Chrono() {
    const dispatch = useAppDispatch();
    const chrono = useAppSelector((state : RootState) => state.chronoSlice);

  return (
    <>
        <p>Time left : <span>{chrono.value}</span></p>
        <div className="buttons-section">
            <button onClick={() => dispatch(!chrono.intervalID ? startChrono() : pause())}>{chrono.intervalID ? 'pause' : 'start'}</button>
            <button onClick={() => dispatch(reset())}>reset</button>
        </div>
    </>
  )
}