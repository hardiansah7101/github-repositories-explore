import { memo, useState } from "react";
import { AccordionBody, AccordionHeader, AccordionItem, Alert, Spinner, Stack } from "react-bootstrap";
import type IUser from "../types/IUser";
import type IRepo from "../types/IRepo";
import repoService from "../services/repoService";
import RepoCardItem from "./RepoCardItem";

export interface UserAccordionItemProps {
    user: IUser
}

const UserAccordionItem = ({ user }: UserAccordionItemProps) => {
    const [repositories, setRepositories] = useState<IRepo[]>([])
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleShowDetail = async () => {
        setMessage('')

        if (repositories.length > 0) { return }

        setLoading(true)
        try {
            const response = await repoService.getListRepo(user.login)
            if (!response.success) {
                setMessage(response.message ?? '')
            } else {
                setRepositories(response.data)
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setMessage('Unable to procceed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AccordionItem eventKey={user.login}>
            <AccordionHeader>
                <div className="d-flex gap-2 align-items-center">
                    <img className="user-image" src={user.avatar_url ?? ''} />
                    <div>
                        <span>{user.login}</span>
                    </div>
                </div>
            </AccordionHeader>
            <AccordionBody onEnter={handleShowDetail}>
                {message !== "" && (
                    <Alert variant="danger">
                        {message}
                    </Alert>
                )}
                {loading && (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" variant="primary" />
                    </div>
                )}
                <Stack gap={3} className="repository-content">
                    {repositories.map(res => (
                        <RepoCardItem
                            key={`${res.id}_repository`}
                            name={res.name}
                            stargazers_count={res.stargazers_count}
                            description={res.description}
                            html_url={res.html_url}
                        />
                    ))}
                </Stack>
            </AccordionBody>
        </AccordionItem>
    )
}

export default memo(UserAccordionItem)