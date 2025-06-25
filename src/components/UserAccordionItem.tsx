import { memo, useState } from "react";
import { AccordionBody, AccordionHeader, AccordionItem, Alert, Card, CardBody, Spinner, Stack } from "react-bootstrap";
import type IUser from "../types/IUser";
import type IRepo from "../types/IRepo";
import repoService from "../services/repoService";

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
                throw { response }
            }
            console.log(response.data)
            setRepositories(response.data)
        } catch (error: any) {
            setMessage(error?.response?.message ?? 'Unable to procceed')
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
                        <span><small>{user.name}</small></span>
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
                    {repositories.map((res, index) => (
                        <Card key={`${index}_repository`}>
                            <CardBody>
                                <div className="d-flex justify-content-between">
                                    <span><b>{res.name}</b></span>
                                    <div className="d-flex align-items-center">
                                        <span><b>{res.stargazers_count}</b></span>
                                    </div>
                                </div>
                                <p>{res.description ?? <i>No description</i>}</p>
                            </CardBody>
                        </Card>
                    ))}
                </Stack>
            </AccordionBody>
        </AccordionItem>
    )
}

export default memo(UserAccordionItem)