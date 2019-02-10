export default (() => {
  const login = ({ email, password }) => {
    if (!email || !email.includes("@") || !email.includes("."))
      throw TypeError("Invalid email")

    if (!password || password.split(" ").length > 1 || typeof password !== "string")
      throw TypeError("Invalid password")
  }

  return { login }
})()
