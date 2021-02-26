import { CompletedChallenges } from "../components/CompleteChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";
import { GetServerSideProps } from 'next';
import styles from '../styles/pages/Home.module.css'

import Head from 'next/head';
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface HomeProps {
  level: number;
  CurrentExperience: number;
  ChallengesCompleted: number;
}

export default function Home(props: HomeProps) {
console.log(props)
  return (
    <ChallengesProvider 
      level={props.level}
      CurrentExperience={props.CurrentExperience}
      ChallengesCompleted={props.ChallengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | Move.it</title>
        </Head>
        <ExperienceBar/>
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
              
            </div>
      

          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, CurrentExperience, ChallengesCompleted} = ctx.req.cookies;
  
  return{
    props: {
      level: Number(level),
      CurrentExperience: Number(CurrentExperience),
      ChallengesCompleted: Number(ChallengesCompleted)
    }

  }
}