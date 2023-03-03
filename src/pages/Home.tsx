import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react"
import NavBar from "../components/NavBar/NavBar"
import Heading from "../components/UI/Heading/Heading"
import MyButton from "../components/UI/MyButton/MyButton"
import Preloader from "../components/UI/Preloader/Preloader"
import UserCard from "../components/UI/UserCard/UserCard"
import UserForm, { FormConfig } from "../components/UserForm/UserForm"
import { useInput } from "../hooks/useInput"
import BodyText from "./../components/UI/BodyText/BodyText"
import { useFileInput } from "./../hooks/useFileInput"
import { userAPI } from "./../service/UserService"
import { Position, User } from "./../types/user"
import "./style.scss"

const Home = () => {
  const [usersPage, setUsersPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [usersList, setUsersList] = useState<User[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [selectedPosition, setSelectedPosition] = useState<Position>({ name: "", id: 0 })

  const [userPhoto, setUserPhoto] = useState<File | undefined>(undefined)
  const [isFormValid, setIsFormValid] = useState<boolean>(true)
  const [resetUserList, setResetUserList] = useState(false)
  const loadUsersButton = usersPage < totalPages && (
    <MyButton onClick={() => setUsersPage(usersPage + 1)}>Show more</MyButton>
  )
  const fileInputRef = useRef(null)

  const {
    data: usersData,
    error: userError,
    isLoading: userLoading,
    refetch: userRefetch,
  } = userAPI.useFetchAllUsersQuery([6, usersPage])

  const {
    data: positionsData,
    error: positionsError,
    isLoading: positionsLoading,
  } = userAPI.useGetPositionsQuery([])

  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenLoading,
    refetch: tokenRefetch,
  } = userAPI.useGetTokenQuery({})

  const [createUser, { isSuccess: successSentUserData }] = userAPI.useSendUserDataMutation()

  const validators = {
    name: {
      validator: {
        required: true,
        minLength: 2,
        maxLength: 60,
      },
    },
    email: {
      validator: {
        required: true,
        min: 2,
        max: 100,
        pattern:
          /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
      },
    },
    phone: {
      validator: {
        // required: true,
        minLength: 2,
        maxLength: 100,
        pattern: /^[\+]{0,1}380([0-9]{9})$/,
      },
    },
    file: {
      validator: {
        maxFileSize: 5 * 1024 * 1024,
        allowedTypes: ["image/jpeg", "image/jpg"],
      },
    },
  }

  const {
    value: nameValue,
    onChange: nameOnChange,
    onBlur: nameOnBlure,
    error: nameError,
  } = useInput(validators.name.validator)

  const {
    value: emailValue,
    onChange: emailOnChange,
    onBlur: emailOnBlure,
    error: emailError,
  } = useInput(validators.email.validator)

  const {
    value: phoneValue,
    onChange: phoneOnChange,
    onBlur: phoneOnBlure,
    error: phoneError,
  } = useInput(validators.phone.validator)

  const {
    value: fileValue,
    onChange: fileOnChange,
    error: fileError,
  } = useFileInput(validators.file.validator)

  const formConfig: FormConfig = {
    name: {
      name: "Your name",
      helper: "",
      value: nameValue,
      onChange: nameOnChange,
      onBlur: nameOnBlure,
      error: nameError,
    },
    email: {
      name: "Email",
      helper: "",
      value: emailValue,
      onChange: emailOnChange,
      onBlur: emailOnBlure,
      error: emailError,
    },
    phone: {
      name: "Phone",
      helper: "+38 (XXX) XXX - XX - XX",
      value: phoneValue,
      onChange: phoneOnChange,
      onBlur: phoneOnBlure,
      error: phoneError,
    },
    positions: {
      positionsList: positions,
      name: "positions",
      getSelected: getSelectedPosition,
    },
    file: {
      reference: fileInputRef,
      attach: setPhoto,
      onChange: fileOnChange,
      error: fileError,
    },
    isValid: isFormValid,
    submit: sendUserFormData,
    sendSuccess: successSentUserData,
  }

  const memoIsFormValid = useMemo(() => {
    const name = nameValue && !nameError
    const phone = phoneValue && !phoneError
    const email = emailValue && !emailError

    setIsFormValid(true)

    if (name && phone && email && userPhoto) {
      if (selectedPosition.id !== 0) {
        setIsFormValid(false)
      }
    }
  }, [nameValue, emailValue, phoneValue, selectedPosition, userPhoto])

  function getSelectedPosition(pos: Position) {
    setSelectedPosition(pos)
  }

  function userFormData() {
    const userData: any = new FormData()

    userData.append("name", nameValue)
    userData.append("email", emailValue)
    userData.append("phone", phoneValue)
    userData.append("position_id", selectedPosition.id)
    userData.append("photo", userPhoto)

    return userData
  }

  async function sendUserFormData() {
    const userData = userFormData()
    const token = tokenData?.token
    console.log(token)

    const requestHeaders: HeadersInit = new Headers()
    requestHeaders.set("Token", token as string)

    createUser([userData, requestHeaders])
    clearUserList()
    userRefetch()
  }

  function setPhoto(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setUserPhoto(e.target.files[0])
    }
  }

  function clearUserList() {
    setUsersList([])
  }

  useEffect(() => {
    if (usersData) {
      const users = [...usersList, ...usersData.users]
      const sortedUsers = users
        .sort((userOne, userTwo) => userOne.registration_timestamp - userTwo.registration_timestamp)
        .reverse()

      setUsersList(sortedUsers)
      setTotalPages(usersData.total_pages)
    }
  }, [usersData, resetUserList])

  useEffect(() => {
    if (positionsData) {
      const positionsList = positionsData.positions
      setPositions(positionsList)
    }
  }, [positionsData])

  return (
    <div className="home-gape">
      <div className="home-gape__header header">
        <div className="header__container">
          <NavBar />
        </div>
      </div>

      <section className="home-gape__main main-section">
        <div className="main-section__container">
          <div className="main-section__body">
            <Heading> Test assignment for front-end developer</Heading>
            <BodyText>
              What defines a good front-end developer is one that has skilled knowledge of HTML,
              CSS, JS with a vast understanding of User design thinking as they'll be building web
              interfaces with accessibility in mind. They should also be excited to learn, as the
              world of Front-End Development keeps evolving.
            </BodyText>
            <MyButton>Sign up</MyButton>
          </div>
        </div>
      </section>
      <section className="home-gape__users users-section">
        <div className="users-section__container">
          <div className="users-section__header">
            <Heading headerType="h2">Working with GET request</Heading>
          </div>
          {userLoading && (
            <div style={{ marginTop: 100 }}>
              {" "}
              <Preloader />
            </div>
          )}
          {userError && (
            <h2 style={{ textAlign: "center", marginTop: 100, color: "red" }}>
              Произошла ошибка загрузки пользователей:{" "}
            </h2>
          )}
          <div className="users-section__body">
            {usersList &&
              usersList.map(user => (
                <UserCard
                  user={user}
                  key={user.id}
                />
              ))}
            <div className="users-section__button">{loadUsersButton}</div>
          </div>
        </div>
      </section>
      <section className="home-gape__form form-section">
        <div className="form-section__container">
          <div className="form-section__header">
            <Heading headerType="h2">Working with POST request</Heading>
          </div>
          <div className="form-section__body">
            <UserForm formConfig={formConfig} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
