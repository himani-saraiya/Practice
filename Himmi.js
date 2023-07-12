import React from "react";
// export default function(props)
// {
//   return(
//     <div>
//       <h1>{props.text.name}</h1>
//       <h1>{props.data}</h1>
//     </div>
//   )

// }

export default function App() {
	return <DummyComponent name="Tooba" a={5} b={2} />
}

function DummyComponent(props) {
	const sum = props.a + props.b
    
    return (
    	<>
        	<p>My name is {props.name}</p>
            <p>The sum of the numeric props I received is {sum}</p>
        </>
    )
}