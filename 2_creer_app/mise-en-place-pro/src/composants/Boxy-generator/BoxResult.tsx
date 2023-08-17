import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks"
import { shadowsToString } from "../../utils/utilsFuncs";

export default function BoxResult() {
    const boxParamsState = useAppSelector(state => state.boxySlice);
    const [shadowsString, setShadowsString] = useState('none');

    useEffect(() => {
        const tempString = shadowsToString(boxParamsState);
        setShadowsString(tempString);
    }, [boxParamsState.shadows])
    
  return (
    <div className="box-result"
        style={{ 
            backgroundColor: boxParamsState?.box_params.background_color,
            borderRadius: (boxParamsState?.box_params.border_radius+'%'),
            height: (boxParamsState?.box_params.height+'em'),
            width: (boxParamsState?.box_params.width+'em'),
            boxShadow: (shadowsString)
        }}>
    </div>
  )
}