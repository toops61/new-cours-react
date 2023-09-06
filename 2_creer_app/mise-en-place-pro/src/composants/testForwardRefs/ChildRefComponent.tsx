import { forwardRef } from 'react';

type keysType = 'project1Ref' | 'project2Ref' | 'project3Ref';

type refsType = Record<keysType, React.RefObject<HTMLDivElement>>;

const Projects = forwardRef<refsType>((_props, ref) => {
  if (!(ref && 'current' in ref && ref.current)) return null;
  const { project1Ref, project2Ref, project3Ref } = ref.current;

  return (
    <section className="refs-object">
      <div className="refs-object__child" ref={project1Ref}>
        <p>1er enfant</p>
      </div>
      <div className="refs-object__child" ref={project2Ref}>
        <p>2eme enfant</p>
      </div>
      <div className="refs-object__child" ref={project3Ref}>
        <p>3eme enfant</p>
      </div>
    </section>
  );
});

export default Projects;
