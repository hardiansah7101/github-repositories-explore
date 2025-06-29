import { useRef, useState } from "react";
import { Accordion, Alert, Button, Form, Spinner, Stack } from "react-bootstrap";
import repoService from "../services/repoService";
import type IUser from "../types/IUser";
import UserAccordionItem from "../components/UserAccordionItem";

export default function Home() {
    const [data, setData] = useState<IUser[]>([])
    const searchRef = useRef<HTMLInputElement | null>(null)
    const [usernameSearch, setUsernameSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const getListUser = async (username: string) => {
        setMessage('')
        setLoading(true)
        try {
            const response = await repoService.getListUser(username)
            if (!response.success) {
                setMessage(response.message ?? '')
            } else {
                setData(response.data)
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setMessage('Unable to procceed')
        } finally {
            setLoading(false)
        }
    }

    const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        const searchValue = searchRef.current?.value ?? ''
        setUsernameSearch(searchValue)
        getListUser(searchValue)
    }

    return (
        <div className="d-flex flex-column gap-2 h-100">
            <Form onSubmit={handleSearch}>
                <Form.Group className="mb-3" controlId="search">
                    <Form.Control
                        ref={searchRef}
                        type="search"
                        placeholder="Enter username"
                        name="username"
                    />
                </Form.Group>
                <Form.Group>
                    <Button type="submit" variant="primary" className="w-100">
                        Search
                    </Button>
                </Form.Group>
            </Form>

            {usernameSearch !== "" && (
                <span>Showing users for "{usernameSearch}"</span>
            )}

            {message !== "" && (
                <Alert variant="danger">
                    {message}
                </Alert>
            )}

            <Stack className="overflow-y-scroll">
                {data.length > 0 && (
                    <Accordion>
                        {data.map(res => <UserAccordionItem key={`${res.id}_user`} user={res} />)}
                    </Accordion>
                )}
                {loading && (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" variant="primary" />
                    </div>
                )}
            </Stack>
        </div>
    )
}