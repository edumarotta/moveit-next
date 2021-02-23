import styles from '../styles/components/Profile.module.css'

export function Profile (){
  return (
    <div className={styles.profileContainer}>
      <img src="https://media-exp1.licdn.com/dms/image/C4E03AQEh5T3nwoZF6A/profile-displayphoto-shrink_200_200/0/1573565297100?e=1619654400&v=beta&t=KfrU6o-NO7yBDcbncT5JfKHHgHPICpX_AwdUXKbGBdI" alt="Eduardo M" />
      <div>
        <strong> Eduardo Marota </strong>
        <p>
            <img src="icons/level.svg" alt="level" />
            Level 1
        </p>
      </div>
    </div>
  )

}