function login({ email, password }) {
  if (!email || !email.includes("@") || !email.includes("."))
    return "Invalid email"

  if (
    !password ||
    password.split(" ").length > 1 ||
    typeof password !== "string"
  )
    return "Invalid password"
    
  return false
}

export {login}