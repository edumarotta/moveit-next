import { createContext, useState, ReactNode, useEffect } from 'react';

import challenges from '../../challenges.json';

interface Challenge{
    type:'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeContextData{
    level:number;
    CurrentExperience:number;
    experienceToNextLevel:number;
    ChallengesCompleted:number;
    activeChallenge:Challenge;
    levelUp:() => void;
    startNewChallenge:() => void;
    resetChallenge:() => void;
    completeChellenge:() => void;
}

interface ChallengesProviderProps{
    children:ReactNode;//propriedade de componentes react
}

//cria o context
export const ChallengesContext = createContext({} as ChallengeContextData)//o texto segue o formato do interface passado la em cima

export function ChallengesProvider({children}:ChallengesProviderProps){//props
    const [level, setlevel] = useState(1);
    const [CurrentExperience, setCurrentExperience] = useState(0);
    const [ChallengesCompleted, SetChallengesCompleted] = useState(0)
    const [activeChallenge, setActiveChallenge] = useState(null)


    const experienceToNextLevel = Math.pow((level + 1) * 4 ,2)//potencia para uppar de level

    useEffect(() => {
        Notification.requestPermission;
    }, [])

    function levelUp(){
        setlevel(level + 1)
    }
    
    function startNewChallenge(){
        const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengesIndex];
        setActiveChallenge(challenge)

        new Audio('./notification.mp3').play

        if (Notification.permission === 'granted') {
            new Notification ('Novo Desafio ', {
                body: `Valendo ${challenge.amount}XP`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }

    function completeChellenge () {
        if (!activeChallenge) {
            return;
        }

    const { amount } = activeChallenge;
    let finalExperience = CurrentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
        finalExperience = finalExperience - experienceToNextLevel;
        levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    SetChallengesCompleted(ChallengesCompleted + 1)

    }




    //quando o componente recebe outro dentro dele se chama children e precisa passar props
    return(
        <ChallengesContext.Provider 
        value={
            {
            level,
            CurrentExperience,
            ChallengesCompleted,
            experienceToNextLevel,
            activeChallenge,
            levelUp,
            startNewChallenge,
            resetChallenge,
            completeChellenge,
            }
              }>
            {children}
        </ChallengesContext.Provider>
    )
}