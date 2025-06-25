import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Splash() {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate('/home')
        }, 2000)
    }, [])
    
    return (
        <div className="d-flex align-items-center justify-content-center h-100">
            <Spinner animation="border" variant="primary" />
        </div>
    )
}