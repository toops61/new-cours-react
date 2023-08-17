import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks"

export default function BoxResult() {
    const boxParamsState = useAppSelector(state => state.boxySlice);
    const [shadowsString, setShadowsString] = useState('none');

    useEffect(() => {
        
        let tempString = '';
        if (boxParamsState?.shadows?.length && boxParamsState?.shadows?.some(e => e.active)) {
            boxParamsState.shadows.map(shadow => {
                tempString += (shadow.active ? `${shadow.inset ? 'inset ' : ''}${shadow.horizontal_offset}px ${shadow.vertical_offset}px ${shadow.blur_radius}px ${shadow.spread_radius}px ${shadow.color},` : '');
                return shadow;
            })
        } else {
            tempString = 'none';
        }
        if (tempString.charAt(tempString.length-1) === ',') (tempString = tempString.slice(0,-1));
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