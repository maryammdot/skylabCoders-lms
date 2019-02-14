import React, { Component } from 'react'
import User from 'services/admin/user'
import UserCard from 'components/Admin/Users/AllUsers/UserCard'

class AllUsers extends Component {

    state = { users: [], message: null, error: null }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = async () => {
        try {
            const users = await User.all()
            this.setState({ users })
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    deleteUser = async userId => {
        try {
            const message = await User.delete({userId})
            const users = this.state.users.filter(user => user.id !== userId)
            this.setState({ message, users })
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    togglePrivileges = async userId => {
        try {
            const {message, user} = await User.togglePrivileges({userId})
            const users = this.state.users.map(prevUser => prevUser.id === userId ? user : prevUser)
            this.setState({ message, users })
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    render() {

        const { state: {error, users, message}, deleteUser,togglePrivileges } = this

        return <section>
                <p>All Users</p>
                {message && <p>{message}</p>}
                <UserCard users={users} deleteUser={deleteUser} togglePrivileges={togglePrivileges} />
                {error && <p>{error}</p>}
        </section>
    }

}

export default AllUsers