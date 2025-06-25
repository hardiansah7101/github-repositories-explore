import { Container } from "react-bootstrap";
import { Outlet } from "react-router";

export default function AppLayout() {
    return (
        <Container fluid className="h-100">
            {/* this is layout component */}
            <Outlet />
        </Container>
    )
}