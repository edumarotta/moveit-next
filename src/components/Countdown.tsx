import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';


import styles from '../styles/components/Countdown.module.css';


let countdownTimeout: NodeJS.Timeout //variavel global, typagem global

export  function Countdown() {

    const { startNewChallenge } = useContext(ChallengesContext)

    //states
    const [time, setTime] = useState(0.1 * 60)//25min * 60s - 2*6//testes
    const [isActive, setIsActive] = useState(false)
    const [hasFinish, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        setIsActive(false);
        clearTimeout(countdownTimeout)//cancelando a execução do timeout sem delay
        setTime(25 * 60)//reinicia o SetTime
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
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>


            {hasFinish ? (
                <button
                    disabled
                    className={styles.countdownButton}>
                    Ciclo Encerrado 
                </button>
            ) : (
                    <>
                        {isActive ? (//if ternario, se tiver mais de uma linha usa parenteses
                            <button
                                type='button'
                                onClick={resetCountdown}
                                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                                Abandonar Ciclo
                            </button>
                        ) : (
                                <button
                                    type='button'
                                    onClick={startCountdown}
                                    className={styles.countdownButton}>
                                    Iniciar um Ciclo
                                </button>
                            )}
                    </>
                )}






        </div>
    );
}