import { useEffect, useRef } from "react";
import ChildRefComponent from "./ChildRefComponent";
import ChildRefsArray from "./ChildRefsArray";

export default function TestRefForward() {
    const projectRefs = useRef({
        project1Ref: useRef<HTMLDivElement>(null),
        project2Ref: useRef<HTMLDivElement>(null),
        project3Ref: useRef<HTMLDivElement>(null),
      });

      const refsArray = useRef<HTMLDivElement[]>([]);
    
      useEffect(() => {
        projectRefs.current && Object.values(projectRefs.current).forEach(div => console.log(div.current?.textContent));
        refsArray.current && refsArray.current.map(div => console.log(div.textContent));
      }, [projectRefs,refsArray]);

  return (
    <div className="testref-container">
      <h1>Test forwardRef</h1>
      <ChildRefComponent ref={projectRefs} />
      <ChildRefsArray ref={refsArray} />
    </div>
  )
}