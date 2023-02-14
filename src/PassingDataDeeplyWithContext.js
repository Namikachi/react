// Context lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.
// Before you use context, try passing props or passing JSX as children.

import { createContext, useContext } from 'react';

// passing props can become verbose and inconvenient
// function Section({ children }) {
//   return (
//     <section className="section">
//       {children}
//     </section>
//   );
// }

// function Heading({ level, children }) {
//   switch (level) {
//     case 1:
//       return <h1>{children}</h1>;
//     case 2:
//       return <h2>{children}</h2>;
//     case 3:
//       return <h3>{children}</h3>;
//     case 4:
//       return <h4>{children}</h4>;
//     case 5:
//       return <h5>{children}</h5>;
//     case 6:
//       return <h6>{children}</h6>;
//     default:
//       throw Error('Unknown level: ' + level);
//   }
// }

// function Page() {
//   return (
//     <Section>
//       <Heading level={1}>Title</Heading>
//       <Section>
//         <Heading>Heading</Heading>
//         <Heading>Heading</Heading>
//         <Heading>Heading</Heading>
//         <Section>
//           <Heading>Sub-heading</Heading>
//           <Heading>Sub-heading</Heading>
//           <Heading>Sub-heading</Heading>
//           <Section>
//             <Heading level={4}>Sub-sub-heading</Heading>
//             <Heading level={4}>Sub-sub-heading</Heading>
//             <Heading level={4}>Sub-sub-heading</Heading>
//           </Section>
//         </Section>
//       </Section>
//     </Section>
//   );
// }

// Step 1: Create the context 
const LevelContext = createContext(0);

function Heading({ children }) {
  // Step 2: Use the context 
  const level = useContext(LevelContext);
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}

// Step 3: Provide the context 
function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}

function PassingDataDeeplyWithContext() {
  return (
    // <Section level={1}>
    //   <Heading>Title</Heading>
    //   <Section level={2}>
    //     <Heading>Heading</Heading>
    //     <Heading>Heading</Heading>
    //     <Heading>Heading</Heading>
    //     <Section level={3}>
    //       <Heading>Sub-heading</Heading>
    //       <Heading>Sub-heading</Heading>
    //       <Heading>Sub-heading</Heading>
    //       <Section level={4}>
    //         <Heading>Sub-sub-heading</Heading>
    //         <Heading>Sub-sub-heading</Heading>
    //         <Heading>Sub-sub-heading</Heading>
    //       </Section>
    //     </Section>
    //   </Section>
    // </Section>
    <Section>
    <Heading>Title</Heading>
    <Section>
      <Heading>Heading</Heading>
      <Heading>Heading</Heading>
      <Heading>Heading</Heading>
      <Section>
        <Heading>Sub-heading</Heading>
        <Heading>Sub-heading</Heading>
        <Heading>Sub-heading</Heading>
        <Section>
          <Heading>Sub-sub-heading</Heading>
          <Heading>Sub-sub-heading</Heading>
          <Heading>Sub-sub-heading</Heading>
        </Section>
      </Section>
    </Section>
  </Section>
  );
}

// 1.You pass a level prop to the <Section>.
// 2.Section wraps its children into <LevelContext.Provider value={level}>.
// 3.Heading asks the closest value of LevelContext above with useContext(LevelContext).


export default PassingDataDeeplyWithContext