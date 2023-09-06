import { forwardRef } from 'react';

const ArrayRefs = forwardRef<HTMLDivElement[]>((_props, refs) => {
  if (!(refs && 'current' in refs && refs.current)) return null;

  return (
    <section className="refs-array">
      <div className="refs-array__child" ref={el => refs.current![0] = el!}>
        <p>1er élément</p>
      </div>
      <div className="refs-array__child" ref={el => refs.current![1] = el!}>
        <p>2eme élément</p>
      </div>
      <div className="refs-array__child" ref={el => refs.current![2] = el!}>
        <p>3eme élément</p>
      </div>
    </section>
  );
});

export default ArrayRefs;