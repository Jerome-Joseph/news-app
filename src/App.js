import React, { useState } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import { useEffect } from 'react'
import NewsCards from './components/newsCards/NewsCards'
import useStyles from './style'
import wordsToNumbers from 'words-to-numbers'
import alanBG from './assets/alanBG.jpg'

const alanKey = '0f5aca4930cf8b65e62710013eee51a62e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if(command === 'newHeadlines'){
          setNewsArticles(articles);
          setActiveArticle(-1);
        }
        else if(command === 'highlight'){
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        }
        else if(command === 'open'){
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;
          const article = articles[parseInt(parsedNumber) - 1];
          console.log(article.url, parsedNumber,"This is number")
          if(parsedNumber > 20){
            // alanBtn().playText('Please try that again')
          } else if(article){
            console.log("I am here")
            window.open(article.url, '_blank');
            // alanBtn().playText('Opening.....')
          }
        }
      }
    })
  }, [])
  

  return (
    <div>
      <div className={classes.logoContainer}>
        <img src={alanBG} className={classes.alanLogo} alt='alan logo' />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  )
}

export default App
