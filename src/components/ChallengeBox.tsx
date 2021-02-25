import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){
    const { activeChallenge, resetChallenge, completeChellenge } = useContext(ChallengesContext)
    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeSucceded () {
        completeChellenge();
        resetCountdown();
    }

    function handleChallengeFailed () {

        resetChallenge();
        resetCountdown();
    }



return(
    <div className={styles.ChallengeBoxContainer}>
        {activeChallenge?(
            <div className={styles.ChallegeActive}>
                <header>Ganhe {activeChallenge.amount} xp</header>

                <main>
                    <img src={`icons/${activeChallenge.type}.svg`} alt="Dumb Bells Hand"/>
                    <strong>Novo desafio</strong>
                    <p>{activeChallenge.description}</p>
                </main>
            <footer>
                <button 
                type='button'
                className={styles.ChallengeFailedButton}
                onClick={handleChallengeFailed}
                >
                    Falhei
                </button>


                <button
                 type='button'
                 className={styles.ChallengeSuccededButton}
                 onClick={handleChallengeSucceded}

                 >
                    Completei
                
                </button>

            </footer>
            </div>
        ):(
            <div className={styles.ChallegeNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
                <img src="icons/level-up.svg" alt="Level Up"/>
                Avance de level completando desafios
            </p>
        </div>
        )}

    </div>
)
}