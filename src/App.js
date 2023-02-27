import React from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import { useEffect } from 'react'

const alanKey = '0f5aca4930cf8b65e62710013eee51a62e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }) => {
        if(command === 'newHeadlines'){
          console.log(articles);
        }
      }
    })
  }, [])
  

  return (
    <div>App</div>
  )
}

export default App
