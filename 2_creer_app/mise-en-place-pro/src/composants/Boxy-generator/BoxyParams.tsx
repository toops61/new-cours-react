import { ChangeEvent, useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { boxFields, shadowFields } from "../../utils/interfaces";
import { useAppSelector } from "../../redux/hooks";
import { updateBoxy } from "../../redux/boxySlice";
import { v4 as uuidv4 } from "uuid";
import { NewShadow } from "../../utils/classes";

export default function BoxyParams() {
    const objectParams = useAppSelector(state => state.boxySlice);

    const [showParams, setShowParams] = useState(false);
    const [shadowsArray, setShadowsArray] = useState<shadowFields[]>(objectParams.shadows.map((shadow:shadowFields) => ({...shadow})));
    const [selectedShadow, setSelectedShadow] = useState(0);
    const [tempObjectParams, setTempObjectParams] = useState<boxFields>({box_params:{...objectParams.box_params},shadows:shadowsArray.map((shadow:shadowFields) => ({...shadow}))});
    const dispatch = useDispatch();

    const changeParams = (e: ChangeEvent) => {
        const object = {box_params:{...objectParams.box_params},shadows:objectParams.shadows.map((shadow:shadowFields) => ({...shadow}))};
        const target = e.target as HTMLInputElement;
        object.box_params[target?.name] = target.value;
        setTempObjectParams(object);
    }
    const changeShadow = (e: ChangeEvent) => {
        const object = {...shadowsArray[selectedShadow]};
        const target = e.target as HTMLInputElement;
        object[target?.name] = target.type === 'checkbox' ? target.checked : target.value;
        const tempArray = shadowsArray.map(shadow => ({...shadow}));
        tempArray.splice(selectedShadow,1,object);
        setShadowsArray(tempArray);
        
    }

    const addShadow = () => {
        const newOne = {...new NewShadow(true,false,4,4,8,0,'#000000',uuidv4())};
        const tempArray = shadowsArray.map(shadow => ({...shadow}));
        tempArray.push(newOne);
        setShadowsArray(tempArray);
    }

    const removeShadow = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const foundId = shadowsArray.findIndex(shadow => shadow.id === shadowsArray[selectedShadow].id);
        if (foundId !== -1) {
            const tempArray = shadowsArray.map(shadow => ({...shadow}));
            tempArray.splice(foundId,1);
            setShadowsArray(tempArray);
        } 
    }

    const selectShadow = (e: ChangeEvent) => {
        const target = e.target as HTMLSelectElement;
        setSelectedShadow(target.selectedIndex);
    }

    const copyPath = () => {
        navigator.clipboard.writeText('truc');
    }

    useEffect(() => {
        dispatch(updateBoxy(tempObjectParams));
    }, [tempObjectParams])
    
    useEffect(() => {
        setTempObjectParams({...tempObjectParams,shadows:shadowsArray});
    }, [shadowsArray])
    

  return (
    <div className={"boxy-params" + (showParams ? " params" : "")}>
        <div className="btns-container">
            <div className="params-btn shadow" onClick={() => setShowParams(false)}>Shadow</div>
            <div className="params-btn" onClick={() => setShowParams(true)}>Box params</div>
        </div>
        <div className="inside-window">
            <div className="params-window shadow">
                <div className="buttons-top">
                    <div className="copy-path" onClick={copyPath}>
                        <div className="infos-hover"><p>copy path</p></div>
                    </div>
                    <button className="add-shadow" onClick={addShadow}>Add a shadow</button>
                </div>
                {shadowsArray.length ? <form>
                    <h2>Customized shadow</h2>
                    <select className="select-shadow" onChange={selectShadow}>
                        {shadowsArray.map((_shadow,index) => <option key={'shadow'+index}>Shadow {index+1}</option>)}
                    </select>
                    <div className="checkboxes">
                        <label htmlFor="active">Active</label>
                        <input type="checkbox" name="active" onChange={changeShadow} checked={shadowsArray[selectedShadow].active} />
                        <label htmlFor="inset">Inset</label>
                        <input type="checkbox" name="inset" onChange={changeShadow} checked={shadowsArray[selectedShadow].inset} />
                    </div>
                    <label htmlFor="horizontal_offset">Horizontal offset</label>
                    <div className="inputs-range">
                        <input 
                            type="range" 
                            name="horizontal_offset" 
                            min={-100} 
                            max={100} 
                            onChange={changeShadow} 
                            value={shadowsArray[selectedShadow].horizontal_offset} />
                        <input 
                            type="text" 
                            name="horizontal_offset" 
                            onChange={changeShadow} 
                            value={shadowsArray[selectedShadow].horizontal_offset} />
                        <p>px</p>
                    </div>
                    <label htmlFor="vertical_offset">Vertical offset</label>
                    <div className="inputs-range">
                        <input 
                            type="range" 
                            name="vertical_offset" 
                            onChange={changeShadow} 
                            min={-100} 
                            max={100} 
                            value={shadowsArray[selectedShadow].vertical_offset} />
                        <input 
                            type="text" 
                            name="vertical_offset" 
                            onChange={changeShadow} 
                            value={shadowsArray[selectedShadow].vertical_offset} />
                        <p>px</p>
                    </div>
                    <label htmlFor="blur_radius">Blur radius</label>
                    <div className="inputs-range">
                        <input 
                            type="range" 
                            name="blur_radius" 
                            onChange={changeShadow} 
                            min={0} 
                            max={50} 
                            value={shadowsArray[selectedShadow].blur_radius} />
                        <input 
                            type="text" 
                            name="blur_radius" 
                            onChange={changeShadow} 
                            value={shadowsArray[selectedShadow].blur_radius} />
                        <p>px</p>
                    </div>
                    <label htmlFor="spread_radius">Spread radius</label>
                    <div className="inputs-range">
                        <input 
                            type="range" 
                            name="spread_radius" 
                            onChange={changeShadow} 
                            min={0} 
                            max={50} 
                            value={shadowsArray[selectedShadow].spread_radius} />
                        <input 
                            type="text" 
                            name="spread_radius" 
                            onChange={changeShadow} 
                            value={shadowsArray[selectedShadow].spread_radius} />
                        <p>px</p>
                    </div>
                    <div className="shadow-color">
                        <label htmlFor="color">Color</label>
                        <input 
                            type="color" 
                            name="color" 
                            onChange={changeShadow} 
                            value={shadowsArray[selectedShadow].color} />
                    </div>
                    <button className="remove-shadow" onClick={removeShadow}>Remove shadow</button>
                </form> : <></>}
            </div>
            <div className="params-window params-box">
                <form>
                    <label htmlFor="border_radius">Border radius</label>
                    <div className="inputs-range">
                        <input 
                            type="range" 
                            name="border_radius" 
                            min={0} 
                            max={50}
                            onChange={changeParams} 
                            value={tempObjectParams.box_params.border_radius} />
                        <input 
                            type="text" 
                            name="border_radius" 
                            onChange={changeShadow} 
                            value={tempObjectParams.box_params.border_radius} />
                        <p>%</p>
                    </div>
                    <label htmlFor="height">Height</label>
                    <div className="inputs-range">
                        <input 
                            type="range" 
                            name="height" 
                            min={0} 
                            max={60} 
                            onChange={changeParams} 
                            value={tempObjectParams.box_params.height} />
                        <input 
                            type="text" 
                            name="height" 
                            onChange={changeParams} 
                            value={tempObjectParams.box_params.height} />
                        <p>em</p>
                    </div>
                    <label htmlFor="width">Width</label>
                    <div className="inputs-range">
                        <input 
                            type="range" 
                            name="width" 
                            min={0} 
                            max={60} 
                            onChange={changeParams} 
                            value={tempObjectParams.box_params.width} />
                        <input 
                            type="text" 
                            name="width" 
                            onChange={changeParams} 
                            value={tempObjectParams.box_params.width} />
                        <p>em</p>
                    </div>
                    <div className="background-color">
                        <label htmlFor="background_color">Color</label>
                        <input 
                            type="color" 
                            name="background_color" 
                            onChange={changeParams} 
                            value={tempObjectParams.box_params.background_color} />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}