import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LeveUpModal } from '../components/LevelUpModal';

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
    closeLevelUpModal:() => void;
}

interface ChallengesProviderProps{
    children:ReactNode;//propriedade de componentes react
    level: number;
    CurrentExperience: number;
    ChallengesCompleted: number;

}

//cria o context
export const ChallengesContext = createContext({} as ChallengeContextData)//o texto segue o formato do interface passado la em cima

export function ChallengesProvider({children,...rest}:ChallengesProviderProps){//props
    const [level, setlevel] = useState(rest.level ?? 1);
    const [CurrentExperience, setCurrentExperience] = useState(rest.CurrentExperience ?? 0);
    const [ChallengesCompleted, SetChallengesCompleted] = useState(rest.ChallengesCompleted ?? 0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)


    const experienceToNextLevel = Math.pow((level + 1) * 4 ,2)//para uppar de level

    useEffect(() => {
        Notification.requestPermission;
    }, [])


    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('CurrentExperience', String(CurrentExperience));
        Cookies.set('ChallengesCompleted', String(ChallengesCompleted));

    }, [level, CurrentExperience, ChallengesCompleted])
//Funcção para quando o user subir de nivel
    function levelUp(){
        setlevel(level + 1)
        setIsLevelUpModalOpen(true);
    }
   function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);

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
            closeLevelUpModal
            }
            }>
            {children}


            { isLevelUpModalOpen && <LeveUpModal/>}
        </ChallengesContext.Provider>
    )
}