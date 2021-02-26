import { Children, createContext, ReactNode, useContext, useEffect, useState} from 'react';

import { ChallengesContext } from "./ChallengesContext"

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinish: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout //variavel global

export function CountdownProvider ( { children}: CountdownProviderProps) {

  const { startNewChallenge } = useContext(ChallengesContext)

  //states
  const [time, setTime] = useState(25* 60)//25min * 60s - 2*6//testes
  const [isActive, setIsActive] = useState(false)
  const [hasFinish, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;


  
  function startCountdown() {
    setIsActive(true);
}

function resetCountdown() {
    setIsActive(false);
    clearTimeout(countdownTimeout)//cancelando a execução do timeout sem delay
    setTime(25 * 60)//reinicia o SetTime
    setHasFinished(false);
}

useEffect(() => {//ele observa o valor, se os valores alterarem ele é ativado e causa efeitos colaterais
    if (isActive && time > 0) {
        countdownTimeout = setTimeout(() => {
            setTime(time - 1)
        }, 1000)
    } else if (isActive && time == 0) {
        setHasFinished(true);
        setIsActive(false)
        startNewChallenge()
    }
}, [isActive, time]);



  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinish,
      isActive,
      startCountdown,
      resetCountdown,



    }}>
      {children}
    </CountdownContext.Provider>
  )
}