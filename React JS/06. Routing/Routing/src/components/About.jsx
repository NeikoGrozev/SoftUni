import { Link, Outlet } from "react-router-dom";

export default function About() {
    return (
        <>
            <h2>About page</h2>

            <nav>
                <Link to="us">About us</Link>
                <Link to="mission">Mission</Link>
                <Link to="ourvalues">Our Values</Link>
            </nav>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti adipisci illo nihil voluptatum quaerat molestiae voluptas sed!
                Rem voluptatum eveniet asperiores eius laudantium ut animi, modi, reprehenderit minus,
                tenetur reiciendis veritatis laborum consequuntur ipsa? Id, laudantium fugit magnam,
                dolorum ea autem ut et tempore tempora ipsam explicabo eaque, repellendus temporibus.
            </p>
            
            <Outlet />
        </>
    );
}