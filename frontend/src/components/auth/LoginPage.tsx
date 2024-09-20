import {Button, TextField} from "@mui/material";
import {FormEvent, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate()

    async function login() {
        try {
            const response = await axios.post("/api/auth/login", {}, {
                auth: {
                    username: username,
                    password: password
                }
            })
            localStorage.setItem("loggedUserId", response.data.id)
            console.log("Logged in")
            setUsername("")
            setPassword("")
            navigate("/home")
        } catch (err) {
            console.log(err)
            setPassword("")
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        login();
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField required label="usename" value={username}
                       onChange={(event) => setUsername(event.target.value)}/>
            <TextField required type="password" label="password" value={password}
                       onChange={(event) => setPassword(event.target.value)}/>
            <Button type="submit">Login</Button>
        </form>
    )
}