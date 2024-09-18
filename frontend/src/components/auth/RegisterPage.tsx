import {Button, TextField} from "@mui/material";
import {FormEvent, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate()

    async function register() {
        try {
            await axios.post("/api/auth/register", {
                username: username,
                password: password
            })
            console.log("Registered successfully")
            setUsername("")
            setPassword("")
            navigate("/login")
        } catch (err) {
            setPassword("")
            setUsername("")
            console.log(err)
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        register();
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField required label="usename" value={username}
                       onChange={(event) => setUsername(event.target.value)}/>
            <TextField required type="password" label="password" value={password}
                       onChange={(event) => setPassword(event.target.value)}/>
            <Button type="submit">Register</Button>
        </form>
    )
}