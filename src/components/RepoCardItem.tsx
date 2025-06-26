import { Star } from "lucide-react";
import { memo } from "react"
import { Card, CardBody } from "react-bootstrap"

export interface RepoCardItemProps {
    name: string;
    stargazers_count: number;
    description?: string | undefined;
    html_url: string;
}

const RepoCardItem = ({
    name,
    stargazers_count,
    description,
    html_url
}: RepoCardItemProps) => {

    const handleOpenUrl = () => {
        window.open(html_url, '_blank')
    }

    return (
        <Card className="repo-card" onClick={handleOpenUrl}>
            <CardBody>
                <div className="d-flex justify-content-between">
                    <span><b>{name}</b></span>
                    <div className="d-flex align-items-center gap-2">
                        <span><b>{stargazers_count}</b></span>
                        <Star color="black" size={15} fill="black"/>
                    </div>
                </div>
                <p>{description ?? <i>No description</i>}</p>
            </CardBody>
        </Card>
    )
}

export default memo(RepoCardItem)