import React, { useContext, useEffect, useState, createContext } from 'react';

const CatContext = createContext('')

const FetchCatFact = async () => {
  try {
    const response = await fetch('https://catfact.ninja/fact');
    const catData = await response.json()
    return catData.fact
  } catch (e) {
    console.log('failed to get data')
    return ''
  }
};

const CatFact = () => {
  const [catFact, setCatFact] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const fact = await FetchCatFact()
      setCatFact(fact)
    };

    fetchData()
  }, [])

  return (
    <CatContext.Provider value={catFact}>
      <App />
    </CatContext.Provider>
  );
};

const App = () => {
  const catFact = useContext(CatContext);

  return (
    <div>{catFact}</div>
  )
}

export default CatFact;
